# 知乎增强 Remake 重写实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 重写 `src/enhanced/`，从单 Observer + 全量扫描改为分层架构（dispatcher + 事件委托 + CSS + 一次性初始化）

**Architecture:** 
- 单一 MutationObserver（DomDispatcher）负责所有动态内容处理，Layer 1 快速放行不相关 mutation，Layer 2 一次 QSA + 按类型分发
- 用户操作类功能（收起回答、回到顶部、关闭浮动评论等）改为 document 级事件委托
- CSS 功能全部集中到 css.js 一次性注入
- 页面初始化（问题信息、展开描述、搜索净化等）放在 init.js

**Tech Stack:** 原生 JS（userscript），no framework

## 全局约束

- 保留全部现有功能，不删不减
- 兼容 Tampermonkey / Violentmonkey
- 兼容 zhihu.com + zhuanlan.zhihu.com
- `src/shared/` 保持不动（GlobalObserver 不再使用，但保留文件）
- beautification/ 不涉及
- 每个 task 完成后 `npm run build` 必须通过

---

### 文件清单

**新建:**
- `src/enhanced/dispatcher.js`
- `src/enhanced/css.js`
- `src/enhanced/events.js`
- `src/enhanced/init.js`

**重写:**
- `src/enhanced/index.js`

**修改（加 SELECTOR + process + init 导出，改内部逻辑）:**
- `src/enhanced/modules/original-pic.js`
- `src/enhanced/modules/direct-link.js`
- `src/enhanced/modules/time-display.js`
- `src/enhanced/modules/clean-ui.js`
- `src/enhanced/modules/collapse-answer.js`
- `src/enhanced/modules/block-type.js`
- `src/enhanced/modules/block-low-count.js`
- `src/enhanced/modules/block-users.js`
- `src/enhanced/modules/block-keywords.js`

**不动（init.js 内联了这些功能，旧文件保留作占位）:**
- `src/enhanced/modules/question-author.js`
- `src/enhanced/modules/type-tips.js`
- `src/enhanced/modules/navigation.js`

---

### Task 1: dispatcher.js — Observer 分发器

**Files:**
- Create: `src/enhanced/dispatcher.js`

**Interfaces:**
- Produces: `DomDispatcher` class — `register(selector, processor)`、`start()`、`stop()`
- Register 接受 CSS selector 和 processor function，selector 用于匹配层，processor 处理匹配到的元素

- [ ] **Step 1: Create dispatcher.js**

```js
export class DomDispatcher {
  constructor() {
    this._processors = new Map()
    this._observer = null
    this._combined = ''
  }

  register(selector, processor) {
    if (!this._processors.has(selector)) {
      this._processors.set(selector, [])
    }
    this._processors.get(selector).push(processor)
    this._rebuildCombined()
  }

  unregister(selector, processor) {
    const list = this._processors.get(selector)
    if (!list) return
    const idx = list.indexOf(processor)
    if (idx !== -1) list.splice(idx, 1)
    if (list.length === 0) this._processors.delete(selector)
    this._rebuildCombined()
  }

  _rebuildCombined() {
    this._combined = Array.from(this._processors.keys()).join(',')
  }

  start(target) {
    if (this._observer) return
    this._observer = new MutationObserver((mutations) => {
      const combined = this._combined
      if (!combined) return
      for (const m of mutations) {
        for (const n of m.addedNodes) {
          if (n.nodeType !== Node.ELEMENT_NODE) continue
          // Layer 1: 快速放行
          if (!n.matches?.(combined) && !n.querySelector(combined)) continue
          // Layer 2: 一次 QSA + 分发
          const matches = n.matches(combined)
            ? [n, ...n.querySelectorAll(combined)]
            : n.querySelectorAll(combined)
          for (const el of matches) {
            for (const [sel, fns] of this._processors) {
              if (el.matches(sel)) {
                for (const fn of fns) fn(el)
              }
            }
          }
        }
      }
    })
    this._observer.observe(target || document.body, {
      childList: true,
      subtree: true,
    })
  }

  stop() {
    if (this._observer) {
      this._observer.disconnect()
      this._observer = null
    }
  }
}
```

- [ ] **Step 2: build 验证**

```bash
npm run build
```
确认无错误。

---

### Task 2: css.js — 集中 CSS 注入

**Files:**
- Create: `src/enhanced/css.js`

将所有分散在各模块中的 CSS 集中到这里:
- type-tips.js 的 `::before` 标签样式
- collapse-answer.js 的按钮位置样式
- block-type.js 的视频隐藏 CSS
- clean-ui.js 的登录弹窗/搜索净化 CSS
- index.js 的首页视频 tab 隐藏 CSS

- [ ] **Step 1: 创建 css.js**

```js
import { menu_value } from '../shared/menu-framework.js'
import { getTheme, setTheme } from '../shared/theme.js'
import { getWidescreenCSS } from '../beautification/widescreen.js'

export function injectCSS() {
  const parts = []

  // 类型标签
  const style = 'font-weight: bold;font-size: 13px;padding: 1px 4px 0;border-radius: 2px;display: inline-block;vertical-align: top;margin: 4px 4px 0 0;'
  parts.push(`
.AnswerItem .ContentItem-title a:not(.zhihu_e_toQuestion)::before {content:'问题';color: #f68b83;background-color: #f68b8333;${style}}
.PinItem .ContentItem-title a::before {content:'想法';color: #4CAF50;background-color: #4CAF5033;${style}}
.ArticleItem .ContentItem-title a::before {content:'文章';color: #2196F3;background-color: #2196F333;${style}}
.ZVideoItem .ContentItem-title a::before, .ZvideoItem .ContentItem-title a::before {content:'视频';color: #00BCD4;background-color: #00BCD433;${style}}
.TopstoryQuestionAskItem .ContentItem-title a:not(.zhihu_e_toQuestion)::before {content:'问题';color: #ff5a4e;background-color: #ff5a4e33;${style}}
.HotLanding-contentItem .ContentItem[data-za-detail-view-path-module=Content] .ContentItem-title a:not(.zhihu_e_toQuestion)::before {content:'问题';color: #f68b83;background-color: #f68b8333;${style}}
`)

  // 视频隐藏
  parts.push(`
.Card .ZVideoItem-video, nav.TopstoryTabs > a[aria-controls="Topstory-zvideo"] {display: none !important;}
.VideoAnswerPlayer, .VideoAnswerPlayer video, .VideoAnswerPlayer-video, .VideoAnswerPlayer-iframe {display: none !important;}
`)

  // 搜索净化
  parts.push(`
.AutoComplete-group > .SearchBar-label:not(.SearchBar-label--history), .AutoComplete-group > [id^="AutoComplete2-topSearch-"], .AutoComplete-group > [id^="AutoComplete3-topSearch-"] {display: none !important;}
`)

  // 登录弹窗
  if (location.hostname !== 'zhuanlan.zhihu.com') {
    parts.push(`
.Question-mainColumnLogin, button.AppHeader-login {display: none !important;}
`)
  }

  // 收起按钮位置调整
  parts.push(`
.CornerButton{margin-bottom:8px !important;}.CornerButtons{bottom:45px !important;}
`)

  // 直达问题按钮样式
  parts.push(`
a.zhihu_e_toQuestion {font-size: 13px !important;font-weight: normal !important;padding: 1px 6px 0 !important;border-radius: 2px !important;display: inline-block !important;vertical-align: top !important;margin-top: 4px !important;height: 20.67px !important;line-height: 20.67px !important;}
`)

  // 首页最小高度 + 视频 tab 隐藏
  if (location.pathname === '/') {
    parts.push(`
.Topstory-container {min-height: 1500px;}
`)
  }
  if (menu_value('menu_blockTypeVideo') && ['/', '/hot', '/follow'].includes(location.pathname)) {
    parts.push(`
.Card .ZVideoItem-video, nav.TopstoryTabs > a[aria-controls="Topstory-zvideo"] {display: none !important;}
`)
  }

  const el = document.createElement('style')
  el.textContent = parts.join('')
  ;(document.head || document.documentElement).appendChild(el)
}
```

- [ ] **Step 2: build 验证**

```bash
npm run build
```

---

### Task 3: events.js — 事件委托

**Files:**
- Create: `src/enhanced/events.js`

将所有事件委托集中到这里。

**Interfaces:**
- Exports: `function initEvents()` — 在启动时调用

事件清单：
1. 点击两侧空白 → 收起当前回答 + 评论（从 collapse-answer.js 的 `collapsedNowAnswer` 移过来）
2. 右键两侧空白 → 回到顶部（从 collapse-answer.js 的 `backToTop` 移过来）
3. 点击浮动评论 overlay → 关闭（从 clean-ui.js 的 `closeFloatingComments` 移过来）
4. 点击邀请折叠按钮 → 切换（从 question-author.js 的 `questionInvitation` 移过来）
5. 点击悬浮卡 → 按需插入屏蔽按钮（从 block-users.js 的 `blockUsers_button` 移过来，懒操作）

- [ ] **Step 1: 创建 events.js**

```js
import { menu_value } from '../shared/menu-framework.js'
import { isElementInViewport, isElementInViewport_, getXpath } from '../shared/dom-utils.js'
import { blockUsers_button_add, blockUsers_button_del, isUserBlocked } from './modules/block-users.js'

const BLANK_CONTAINER = '.Topstory-container'
const INVITE_TOGGLE_CLS = 'script-invite-toggle'

function isSideBlank(event) {
  const el = event.target
  // 点到链接/按钮/输入框等不是空白
  if (el.closest('a, button, input, textarea, img, video, [role="button"]')) return false
  // 在容器左右侧空白
  const container = document.querySelector(BLANK_CONTAINER)
  if (!container) return false
  const rect = container.getBoundingClientRect()
  return event.clientX < rect.left || event.clientX > rect.right
}

// 收起当前回答 + 评论
function onCollapseClick(e) {
  if (!menu_value('menu_collapsedNowAnswer')) return
  if (!isSideBlank(e)) return
  collapseCurrentAnswer()
}

// 回到顶部
function onBackToTop(e) {
  if (!menu_value('menu_backToTop')) return
  if (!isSideBlank(e)) return
  e.preventDefault()
  window.scrollTo(0, 0)
}

// 关闭浮动评论
function onCloseFloatingComment(e) {
  const button = document.querySelector('button[aria-label="关闭"]')
  if (!button) return
  const overlay = button.parentElement?.parentElement
  if (overlay && (e.target === overlay || e.target.parentElement === overlay)) {
    button.click()
  }
}

// 切换邀请折叠
function onInviteToggle(e) {
  if (!e.target.closest('.' + INVITE_TOGGLE_CLS)) return
  const q = document.querySelector('.QuestionInvitation-content')
  if (q) q.style.display = q.style.display === 'none' ? '' : 'none'
}

// 导入收起逻辑（从 collapse-answer.js）
import { collapseCurrentAnswer } from './modules/collapse-answer.js'

export function initEvents() {
  document.addEventListener('click', onCollapseClick, true)
  document.addEventListener('contextmenu', onBackToTop, true)
  document.addEventListener('click', onCloseFloatingComment, true)
  document.addEventListener('click', onInviteToggle, false)
}
```

- [ ] **Step 2: build 验证**

```bash
npm run build
```

---

### Task 4: init.js — 一次性初始化

**Files:**
- Create: `src/enhanced/init.js`

集中管理页面加载后的一次性 DOM 操作和 URL 变化时的重新初始化。

**Interfaces:**
- Exports: `function pageInit()` — 页面加载后调用
- Exports: `function pageReinit()` — URL 变化时调用（通过 UrlChangeManager）

- [ ] **Step 1: 创建 init.js**

```js
import { menu_value } from '../shared/menu-framework.js'
import { UrlChangeManager } from '../shared/url-change.js'
import { escapeHtml } from '../shared/escape-html.js'

// 展开问题描述
function expandDescription() {
  if (!menu_value('menu_questionRichTextMore')) return
  const btn = document.querySelector('button.QuestionRichText-more')
  if (btn) btn.click()
}

// 显示问题作者
function showAuthor() {
  if (document.querySelector('.BrandQuestionSymbol, .QuestionAuthor, .SpecialQuestionAuthor')) return
  try {
    const data = JSON.parse(document.querySelector('#js-initialData').textContent)
    const id = /\d+/.exec(location.pathname)?.[0]
    if (!id) return
    const q = data.initialState.entities.questions[id]
    if (!q?.author) return
    const a = q.author
    const html = `<div class="BrandQuestionSymbol"><a class="BrandQuestionSymbol-brandLink" href="/people/${escapeHtml(a.urlToken)}"><img role="presentation" src="${escapeHtml(a.avatarUrl)}" class="BrandQuestionSymbol-logo" alt=""><span class="BrandQuestionSymbol-name">${escapeHtml(a.name)}</span></a><div class="BrandQuestionSymbol-divider" style="margin-left: 5px;margin-right: 10px;"></div></div>`
    document.querySelector('.QuestionHeader-topics')?.insertAdjacentHTML('beforebegin', html)
  } catch (e) {
    console.warn('showAuthor error:', e)
  }
}

// 显示问题创建时间
function showQuestionTime() {
  if (document.querySelector('.QuestionTime-xiu')) return
  const sidebar = document.querySelector('.QuestionPage .QuestionHeader-side')
  if (!sidebar) return
  const dateCreated = document.querySelector('meta[itemprop=dateCreated]')?.content
  const dateModified = document.querySelector('meta[itemprop=dateModified]')?.content
  if (!dateCreated) return
  const fmt = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  })
  const utc8 = (d) => fmt.format(new Date(d)).replace(/\//g, '-')
  sidebar.insertAdjacentHTML('beforeend',
    `<div class="QuestionTime-xiu" style="color: #9098ac; margin-top: 5px; font-size: 13px; font-style: italic;">
      <p>创建时间：${utc8(dateCreated)}</p>
      ${dateModified ? `<p>最后编辑：${utc8(dateModified)}</p>` : ''}
    </div>`
  )
}

// 折叠邀请
function collapseInvitation() {
  const q = document.querySelector('.QuestionInvitation-content')
  if (!q) return
  q.style.display = 'none'
  const title = document.querySelector('.QuestionInvitation-title')
  if (!title) return
  const span = document.createElement('span')
  span.className = 'script-invite-toggle'
  span.style.cssText = 'cursor: pointer; font-size: 14px; color: #919aae;'
  span.textContent = ' 展开/折叠'
  title.appendChild(span)
}

// 保护标题（不被知乎私信/消息污染）
function protectTitle() {
  if (!menu_value('menu_cleanTitles')) return
  const el = document.head.querySelector('title')
  if (!el) return
  const original = el.textContent
  const obs = new MutationObserver(() => {
    if (el.textContent !== original) el.textContent = original
  })
  obs.observe(el, { childList: true })
}

// 净化搜索框
function cleanSearchBar() {
  if (!menu_value('menu_cleanSearch')) return
  const input = document.querySelector('.SearchBar-input > input')
  if (!input) return
  input.placeholder = ''
  const obs = new MutationObserver((ms) => {
    if (ms[0].attributeName === 'placeholder' && ms[0].target.placeholder !== '') {
      ms[0].target.placeholder = ''
    }
  })
  obs.observe(input, { attributes: true })
}

// 替换登录按钮为链接
function replaceLoginButton() {
  if (location.hostname === 'zhuanlan.zhihu.com') {
    if (document.querySelector('.ColumnPageHeader-profile>.AppHeader-menu')) return // 已登录
  } else {
    if (document.querySelector('.AppHeader-profile>.AppHeader-menu')) return // 已登录
  }
  const loginBtn = document.evaluate(
    '//button[text()="登录/注册"]',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue
  if (loginBtn) {
    loginBtn.outerHTML = '<a class="Button AppHeader-login Button--blue" href="https://www.zhihu.com/signin" target="_blank">登录/注册</a>'
  }
}

// 导航处理
function fixNavigation() {
  document.querySelectorAll('header.AppHeader nav').forEach(a => { a.outerHTML = a.outerHTML })
  if (['/', '/hot', '/follow'].includes(location.pathname)) {
    document.querySelectorAll(
      'header.AppHeader nav>a:not([target])[href="https://www.zhihu.com/"]'
    ).forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault()
        document.cookie = 'tst=r; expires=Thu, 18 Dec 2099 12:00:00 GMT; domain=.zhihu.com; path=/'
        location.href = a.href
      })
    })
  }
}

export function pageInit() {
  protectTitle()
  replaceLoginButton()
  fixNavigation()
  cleanSearchBar()

  // 问题页相关
  if (location.pathname.includes('question') && !location.href.includes('/log')) {
    if (!location.pathname.includes('waiting')) {
      expandDescription()
      showAuthor()
      showQuestionTime()
      collapseInvitation()
    }
  }
}

export function pageReinit() {
  // URL 变化时重新执行
  cleanSearchBar()
  collapseInvitation()
}
```

- [ ] **Step 2: build 验证**

```bash
npm run build
```

---

### Task 5: 修改 original-pic.js

**Files:**
- Modify: `src/enhanced/modules/original-pic.js`

加 `SELECTOR` 和 `init()` 导出：

- [ ] **Step 1: 改文件**

```js
export const SELECTOR = "img[data-original][data-original-token][data-lazy-status]:not([data-original-xiu]):not(.comment_sticker):not(.Avatar)"

export function process(img) {
  if (img.dataset.originalXiu) return
  img.src = "https://" + img.dataset.original.split("/")[2] + "/" + img.dataset.originalToken + ".webp"
  img.dataset.originalXiu = "true"
}

export function init() {
  document.querySelectorAll(SELECTOR).forEach(process)
}
```

删掉 `originalPic()` 和 `processAddedPics()`（已被 `process` + `init` 取代）。

- [ ] **Step 2: build 验证**

```bash
npm run build
```

---

### Task 6: 修改 direct-link.js

**Files:**
- Modify: `src/enhanced/modules/direct-link.js`

- [ ] **Step 1: 改文件**

```js
export const SELECTOR = 'a.external[href*="link.zhihu.com/?target="], a.LinkCard[href*="link.zhihu.com/?target="]:not(.MCNLinkCard):not(.ZVideoLinkCard):not(.ADLinkCardContainer)'

export function process(a) {
  a.href = decodeURIComponent(a.href.substring(a.href.indexOf('link.zhihu.com/?target=') + 23))
}

export function init() {
  document.querySelectorAll(SELECTOR).forEach(process)
}
```

删掉 `directLink()` 和 `processAddedLinks()`。

- [ ] **Step 2: build 验证**

```bash
npm run build
```

---

### Task 7: 修改 time-display.js

**Files:**
- Modify: `src/enhanced/modules/time-display.js`

添加 SELECTOR + process + init，保留现有 `topTime_processItem` 和格式化工具。

- [ ] **Step 1: 修改文件**

保留现在的 `topTime_processItem`、`topTime_allTime`、`topTime_publishTop`、`question_time`、`getUTC8`、`topTime_post`。新增：

```js
export const SELECTOR = '.ContentItem.AnswerItem, .ContentItem.ArticleItem, .TopstoryItem, .PinItem'

export function process(item) {
  topTime_processItem(item, 'ContentItem-meta')
}

export function init() {
  topTime_(SELECTOR, 'ContentItem-meta')
}
```

保留 `createIncrementalTopTimeHandler`（但不再使用——新 dispatcher 的 `process` 就是它的职责）。为了不破坏引用，保留导出但标记为 deprecated。实际上可以删掉，因为 index.js 不再引用它。但为了稳妥，留着也行。

删除 `topTime_` 的默认导出（不再需要，因为 `process` 和 `init` 代替了它）。保留 `topTime_processItem` 作为内部函数。

- [ ] **Step 2: build 验证**

```bash
npm run build
```

---

### Task 8: 修改 collapse-answer.js

**Files:**
- Modify: `src/enhanced/modules/collapse-answer.js`

剥离事件绑定逻辑到 events.js，只留下核心函数。

- [ ] **Step 1: 修改文件**

```js
import { GlobalObserver } from '../../shared/global-observer.js'
import { UrlChangeManager } from '../../shared/url-change.js'
import { menu_value } from '../../shared/menu-framework.js'
import { isElementInViewport, isElementInViewport_, getXpath } from '../../shared/dom-utils.js'

// ========== 核心函数，不绑定事件 ==========

// 收起当前回答 + 评论
export function collapseCurrentAnswer() {
  // 从原 collapsedNowAnswer 中提取核心逻辑，剔除 event 绑定部分
  let rightButton = document.querySelector(
    ".ContentItem-actions.Sticky.RichContent-actions.is-fixed.is-bottom"
  )
  if (rightButton) {
    let ccBtn = rightButton.querySelector(
      "button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type"
    )
    if (ccBtn && ccBtn.textContent.includes("收起评论")) ccBtn.click()
    rightButton = rightButton.querySelector(
      ".ContentItem-rightButton[data-zop-retract-question]"
    )
    if (rightButton) rightButton.click()
  } else {
    let found = false
    for (const el of document.querySelectorAll(
      ".ContentItem-rightButton[data-zop-retract-question]"
    )) {
      if (isElementInViewport(el)) {
        let ccBtn = el.parentNode.querySelector(
          "button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type"
        )
        if (ccBtn && ccBtn.textContent.includes("收起评论")) {
          ccBtn.click()
          if (!isElementInViewport(ccBtn)) scrollTo(0, el.offsetTop + 50)
        }
        el.click()
        found = true
        break
      }
    }
    if (!found) {
      for (const el of document.querySelectorAll(
        ".List-item, .Card.AnswerCard, .Card.TopstoryItem"
      )) {
        if (isElementInViewport_(el)) {
          let ccBtn = el.querySelector(
            "button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type"
          )
          if (ccBtn && ccBtn.textContent.includes("收起评论")) ccBtn.click()
          let acBtn = el.querySelector(
            ".ContentItem-rightButton[data-zop-retract-question]"
          )
          if (acBtn) acBtn.click()
          break
        }
      }
    }
  }
  // Comments section
  let cc = document.evaluate(
    '//button[text()="收起评论"]', document.querySelector(".Comments-container"),
    null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue
  if (cc) { cc.click(); return }
  // ... 评论折叠逻辑（从原 collapsedNowAnswer 复制 comment 部分）
  collapseComments()
}

function collapseComments() {
  // 折叠评论的逻辑从原函数提取
  const allCommentBtns = document.querySelectorAll(
    ".ContentItem-actions > button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type, .ContentItem-action > button.Button.Button--plain.Button--withIcon.Button--withLabel:first-of-type"
  )
  for (const el of allCommentBtns) {
    if (el.textContent.includes("收起评论") && isElementInViewport(el)) {
      el.click()
      return
    }
  }
  // Fallback: find any Comments-container in viewport
  for (const el of document.querySelectorAll(".Comments-container")) {
    if (isElementInViewport(el)) {
      const parent = el.closest(".List-item") || el.closest(".Card")
      if (!parent) continue
      const btn = parent.querySelector(
        ".ContentItem-actions > button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type"
      )
      if (btn && btn.textContent.includes("收起评论")) {
        btn.click()
        if (!isElementInViewport(btn)) scrollTo(0, parent.offsetTop + parent.offsetHeight - 50)
        return
      }
    }
  }
}

// ========== 一键收起全部回答 ==========

export function addCollapseAllButton() {
  if (!menu_value('menu_collapsedAnswer')) return
  const container = document.querySelector('.CornerAnimayedFlex')
  if (!container || document.getElementById('collapsed-button')) return
  const templateBtn = container.querySelector('button')
  if (!templateBtn) return
  container.insertAdjacentHTML('afterBegin',
    `<button id="collapsed-button" data-tooltip="收起全部回答/评论" data-tooltip-position="left" aria-label="收起全部回答/评论" type="button" class="${templateBtn.className}"><svg class="ContentItem-arrowIcon is-active" aria-label="收起全部回答/评论" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg></button>`
  )
  document.getElementById('collapsed-button').onclick = function () {
    // 收起所有评论
    document.querySelectorAll('.Comments-container').forEach(el => {
      const btn = document.evaluate('//button[text()="收起评论"]', el, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
      if (btn) btn.click()
    })
    document.querySelectorAll('.RichContent >.ContentItem-actions>button:first-of-type').forEach(el => {
      if (el.textContent.includes('收起评论')) el.click()
    })
    // 收起所有回答
    document.querySelectorAll('.ContentItem-rightButton[data-zop-retract-question]').forEach(el => el.click())
  }
}

// ========== 默认收起回答 ==========

let collapsedObserver = null
function collapsedAnswerHandler(mutations) {
  for (const mutation of mutations) {
    if (mutation.target.nodeType !== Node.ELEMENT_NODE) continue
    if (mutation.target.hasAttribute('script-collapsed')) continue
    if (mutation.target.classList.contains('RichContent')) {
      for (const n of mutation.addedNodes) {
        if (n.nodeType !== Node.ELEMENT_NODE) continue
        if (n.className !== 'RichContent-inner') continue
        if (n.offsetHeight < 400) break
        const btn = mutation.target.querySelector(
          '.ContentItem-actions.Sticky [data-zop-retract-question]'
        )
        if (btn) {
          mutation.target.setAttribute('script-collapsed', '')
          btn.click()
          break
        }
      }
    } else if (
      mutation.target.tagName === 'DIV' && !mutation.target.style.cssText && !mutation.target.className
    ) {
      const parent = mutation.target.parentElement
      if (!parent || parent.hasAttribute('script-collapsed')) continue
      const btn = mutation.target.querySelector(
        '.ContentItem-actions.Sticky [data-zop-retract-question]'
      )
      if (btn) {
        parent.setAttribute('script-collapsed', '')
        btn.click()
      }
    }
  }
}

export function enableDefaultCollapse() {
  if (!menu_value('menu_defaultCollapsedAnswer')) return
  if (location.href.includes('/answer/')) return
  if (!collapsedObserver) {
    collapsedObserver = new MutationObserver(collapsedAnswerHandler)
    UrlChangeManager.add(() => {
      if (menu_value('menu_defaultCollapsedAnswer') && !location.href.includes('/answer/')) {
        collapsedObserver.observe(document.body, { childList: true, subtree: true })
      } else {
        collapsedObserver.disconnect()
      }
    })
  }
  collapsedObserver.observe(document.body, { childList: true, subtree: true })
}
```

**注意：** `collapsedAnswerHandler` 不是通过 DomDispatcher 注册的，因为它监听的是内部 DOM 变化（嵌套在 `RichContent` 中的 `div`），而不是新增的外部容器。所以它用独立的 MutationObserver。

- [ ] **Step 2: build 验证**

```bash
npm run build
```

---

### Task 9: 修改 clean-ui.js

**Files:**
- Modify: `src/enhanced/modules/clean-ui.js`

剥离 `closeFloatingComments`（已在 events.js 中实现）。保留 `cleanHighlightLink` 改为 `process` + `SELECTOR`。保留 `removeLogin` 的 Observer 部分（已登录时不激活）。保留 `cleanTitles`、`cleanSearch`（已移至 init.js）。

- [ ] **Step 1: 修改文件**

```js
import { menu_value } from '../../shared/menu-framework.js'
import { getXpath } from '../../shared/dom-utils.js'

// 移除高亮链接
export const SELECTOR = 'a[data-za-not-track-link][href^="https://zhida.zhihu.com/search?"]'

export function process(a) {
  const span = a.parentElement
  if (span) span.replaceWith(a.textContent)
}

export function initHighlight() {
  document.querySelectorAll(SELECTOR).forEach(process)
}

// 移除登录弹窗
let _loginObserver = null

export function startLoginMonitor() {
  if (location.hostname === 'zhuanlan.zhihu.com') {
    if (document.querySelector('.ColumnPageHeader-profile>.AppHeader-menu')) return
  } else {
    if (document.querySelector('.AppHeader-profile>.AppHeader-menu')) return
  }
  if (_loginObserver) return
  _loginObserver = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const n of m.addedNodes) {
        if (n.nodeType !== 1 || n.tagName !== 'DIV') continue
        if (n.querySelector('.signFlowModal')) {
          const btn = n.querySelector('.Button.Modal-closeButton.Button--plain')
          if (btn) btn.click()
        } else if (document.evaluate(
          '//button[text()="立即登录/注册"]', n, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
        ).singleNodeValue) {
          n.remove()
        }
      }
    }
  })
  _loginObserver.observe(document.body, { childList: true, subtree: true })
}
```

- [ ] **Step 2: build 验证**

```bash
npm run build
```

---

### Task 10: 修改 block-type.js + block-low-count.js + block-keywords.js + block-users.js

这些模块的模式相同：从 `GlobalObserver.add(callback)` 改为导出 `SELECTOR` + `process`，让 dispatcher 处理。

由于篇幅，每个模块单独做。

#### 10a: block-type.js

- [ ] **Step 1: 修改**

```js
import { menu_value } from '../../shared/menu-framework.js'

export function process(item) {
  if (!item) return
  if (location.pathname === '/search') {
    if (location.search.includes('type=content') === false) return
    if (item.href?.includes('/zvideo/') || item.href?.includes('video.zhihu.com')) {
      if (menu_value('menu_blockTypeVideo')) item.closest('.Card')?.remove()
    } else if (item.href?.includes('zhuanlan.zhihu.com')) {
      if (menu_value('menu_blockTypeArticle')) item.closest('.Card.SearchResult-Card').hidden = true
    } else if (item.href?.includes('/topic/')) {
      if (menu_value('menu_blockTypeTopic')) item.closest('.Card.SearchResult-Card').hidden = true
    } else if (item.href?.includes('/market/')) {
      if (menu_value('menu_blockTypeSearch')) item.closest('.Card.SearchResult-Card').hidden = true
    }
  } else if (location.pathname.includes('/question/')) {
    if (menu_value('menu_blockTypeVideo')) item.closest('.List-item').hidden = true
  } else {
    // 首页
    if (item.className === 'ContentItem PinItem') {
      if (menu_value('menu_blockTypePin')) item.closest('.Card.TopstoryItem').hidden = true
    } else if (item.href?.includes('/zvideo/') || item.href?.includes('video.zhihu.com')) {
      if (menu_value('menu_blockTypeVideo')) item.closest('.Card.TopstoryItem').hidden = true
    } else if (item.href?.includes('zhuanlan.zhihu.com')) {
      if (menu_value('menu_blockTypeArticle')) item.closest('.Card.TopstoryItem').hidden = true
    }
  }
}
```

删除所有 `GlobalObserver.add`、`UrlChangeManager.add`、`addSetInterval_`。

- [ ] **Step 2: build 验证**

#### 10b: block-low-count.js

- [ ] **Step 1: 修改**

每个页面类型只能调用一次 init，所以用闭包绑定 type：

```js
import { menu_value } from '../../shared/menu-framework.js'

function getUpvoteMin(type) {
  const key = type === 'index' ? 'menu_blockLowUpvoteCount'
    : type === 'follow' ? 'menu_blockLowUpvoteCountFollow'
    : 'menu_blockLowUpvoteCountQuestion'
  return GM_getValue(key)
}
function getCommentMin(type) {
  const key = type === 'index' ? 'menu_blockLowCommentCount'
    : type === 'follow' ? 'menu_blockLowCommentCountFollow'
    : 'menu_blockLowCommentCountQuestion'
  return GM_getValue(key)
}

function shouldBlock(item, upvoteMin, commentMin) {
  const ci = item.querySelector('.ContentItem')
  if (!ci?.dataset.zaExtraModule) return false
  try {
    const card = JSON.parse(ci.dataset.zaExtraModule)?.card?.content
    if (!card) return false
    if (upvoteMin && Number(card.upvote_num) < Number(upvoteMin)) return true
    if (commentMin && Number(card.comment_num) < Number(commentMin)) return true
  } catch (e) {}
  return false
}

export function makeProcessor(type) {
  const upvoteMin = getUpvoteMin(type)
  const commentMin = getCommentMin(type)
  const sel = type === 'question' ? '.List-item' : '.Card.TopstoryItem'
  // 初始扫描已有元素
  document.querySelectorAll(sel).forEach(item => {
    if (shouldBlock(item, upvoteMin, commentMin)) {
      item.hidden = true; item.style.display = 'none'
    }
  })
  // 返回 processor 供 dispatcher 注册
  return function processLowCount(item) {
    if (shouldBlock(item, upvoteMin, commentMin)) {
      item.hidden = true; item.style.display = 'none'
    }
  }
}
```

- [ ] **Step 2: build 验证**

#### 10c: block-keywords.js

- [ ] **Step 1: 修改**

保留 `rememberSelectedBlockKeyword`、`addSelectedKeywordToBlocklist`、`customBlockKeywords`（与 Observer 无关的 UI 函数）。重写核心过滤逻辑：

```js
// 标题屏蔽
export const SELECTOR_TITLE = 'h2.ContentItem-title meta[itemprop="name"], meta[itemprop="headline"], a[data-za-detail-view-id]'

export function processTitle(item) {
  const keywords = getKeywords()
  if (!keywords.length) return
  const text = (item.content || item.textContent).toLowerCase()
  for (const kw of keywords) {
    if (text.includes(kw)) {
      const card = item.closest('.Card, .List-item, .HotItem')
      if (card) { card.hidden = true; card.style.display = 'none' }
      return
    }
  }
}

// 评论屏蔽
export const SELECTOR_COMMENT = '.CommentContent'

export function processComment(content) {
  const keywords = getKeywords()
  if (!keywords.length) return
  let text = content.textContent.toLowerCase()
  content.querySelectorAll('img.sticker[alt]').forEach(img => { text += img.alt.toLowerCase() })
  for (const kw of keywords) {
    if (text.includes(kw)) {
      const originalNodes = Array.from(content.childNodes).map(n => n.cloneNode(true))
      content.onclick = (e) => {
        if (e.target === content && content.textContent === '[该评论已屏蔽，可点击显示]') {
          content.textContent = ''
          originalNodes.forEach(n => content.appendChild(n))
          content.onclick = null
        }
      }
      content.textContent = '[该评论已屏蔽，可点击显示]'
      return
    }
  }
}

function getKeywords() {
  const keywords = menu_value('menu_customBlockKeywords')
  if (!keywords?.length) return []
  return keywords.filter(k => k).map(k => k.toLowerCase())
}
```

移除 `blockKeywords_comment` 中的 `GlobalObserver.add`。

- [ ] **Step 2: build 验证**

#### 10d: block-users.js

- [ ] **Step 1: 修改**

```js
import { menu_value, refreshMenu } from '../../shared/menu-framework.js'
import { escapeHtml } from '../../shared/escape-html.js'

function getUsers() {
  return menu_value('menu_customBlockUsers') || []
}

function isBlockedAuthor(contentItem) {
  const zop = contentItem.dataset.zop
  if (!zop) return false
  try {
    return getUsers().includes(JSON.parse(zop).authorName)
  } catch (e) { return false }
}

// 主 SELECTOR
export const SELECTOR = '.ContentItem.AnswerItem, .ContentItem.ArticleItem'

export function process(item) {
  if (isBlockedAuthor(item)) {
    const card = item.closest('.Card, .List-item, .TopicFeedItem')
    if (card) card.hidden = true
  }
}

// 评论 SELECTOR
export const SELECTOR_COMMENT = 'a[href^="https://www.zhihu.com/people/"]>img.Avatar[alt][loading]'

export function processComment(img) {
  const users = getUsers()
  if (!users.length) return
  if (users.includes(img.alt)) {
    img.closest('a')?.parentElement?.parentElement?.parentElement?.parentElement?.style?.display = 'none'
  }
}

export function init() {
  document.querySelectorAll(SELECTOR).forEach(process)
}

// 屏蔽按钮添加/删除（供 events.js 调用）
export function isUserBlocked(name) {
  return getUsers().includes(name)
}

export function blockUsers_button_add(name, userid, reload) {
  if (!name || !userid) return
  if (!/^[\w-]+$/.test(userid)) return
  const users = getUsers()
  const idx = users.indexOf(name)
  if (idx === -1) {
    users.push(name)
    GM_setValue('menu_customBlockUsers', users)
    GM_xmlhttpRequest({
      url: `https://www.zhihu.com/api/v4/members/${userid}/actions/block`,
      method: 'POST', timeout: 2000,
    })
    if (reload) setTimeout(() => location.reload(), 200)
    else GM_notification({ text: '该用户已被屏蔽~\\n刷新网页后生效~', timeout: 3000 })
  } else {
    GM_notification({ text: '该用户已经被屏蔽啦，无需重复屏蔽~', timeout: 3000 })
  }
}

export function blockUsers_button_del(name, userid, reload) {
  if (!name || !userid) return
  if (!/^[\w-]+$/.test(userid)) return
  const users = getUsers()
  const idx = users.indexOf(name)
  if (idx > -1) {
    users.splice(idx, 1)
    GM_setValue('menu_customBlockUsers', users)
    GM_xmlhttpRequest({
      url: `https://www.zhihu.com/api/v4/members/${userid}/actions/block`,
      method: 'DELETE', timeout: 2000,
    })
    if (reload) setTimeout(() => location.reload(), 200)
    else GM_notification({ text: '该用户已取消屏蔽啦~\\n刷新网页后生效~', timeout: 3000 })
  } else {
    GM_notification({ text: '没有在屏蔽列表中找到该用户...', timeout: 3000 })
  }
}

export function customBlockUsers() {
  let now = ''
  getUsers().forEach(item => { now += '|' + item })
  const input = prompt(
    '编辑 [自定义屏蔽用户]\\n（不同用户名之间使用 "|" 分隔，例如：用户A|用户B|用户C ）',
    now.slice(1)
  )
  if (input === '') {
    GM_setValue('menu_customBlockUsers', [])
    refreshMenu()
  } else if (input != null) {
    GM_setValue('menu_customBlockUsers', input.split('|'))
    refreshMenu()
  }
}
```

- [ ] **Step 2: build 验证**

---

### Task 11: 重写 index.js

**Files:**
- Modify: `src/enhanced/index.js`

核心入口：初始化菜单 → pageInit → 事件注册 → CSS 注入 → Dispatcher 注册各模块 processor → 页面路由 → 启动 Observer。

- [ ] **Step 1: 重写 index.js**

```js
import { initMenuValues, menu_value, menu_setting, setMenuRegistrar } from '../shared/menu-framework.js'
import { UrlChangeManager, addUrlChangeEvent } from '../shared/url-change.js'
import { DomDispatcher } from './dispatcher.js'
import { injectCSS } from './css.js'
import { initEvents } from './events.js'
import { pageInit, pageReinit } from './init.js'

// 模块
import * as originalPic from './modules/original-pic.js'
import * as directLink from './modules/direct-link.js'
import * as timeDisplay from './modules/time-display.js'
import { initHighlight, startLoginMonitor } from './modules/clean-ui.js'
import { enableDefaultCollapse, addCollapseAllButton } from './modules/collapse-answer.js'
import { process as blockType } from './modules/block-type.js'
import { makeProcessor as makeLowCountProcessor } from './modules/block-low-count.js'
import * as blockUsers from './modules/block-users.js'
import * as blockKeywords from './modules/block-keywords.js'
import { blockHotOther } from './modules/block-hot.js'
import { question_author } from './modules/question-author.js'
import { addTypeTips } from './modules/type-tips.js'
import { addToQuestion } from './modules/type-tips.js'
import { switchHome, switchHomeRecommend } from './modules/navigation.js'
import { collapsedAnswer } from './modules/collapse-answer.js'
import { question_time } from './modules/time-display.js'
import { questionRichTextMore } from './modules/question-author.js'

// 菜单定义（不变）
var menu_ALL = [ /* ... 与现有一致 ... */ ]
// ... 菜单注册代码（与现有一致）...

// ========== 主入口 ==========
(function () {
  if (window.onurlchange === undefined) addUrlChangeEvent()

  const dispatcher = new DomDispatcher()

  // Phase 1: 初始化
  injectCSS()
  initEvents()
  pageInit()
  startLoginMonitor()
  initHighlight()
  originalPic.init()
  directLink.init()
  addCollapseAllButton()
  enableDefaultCollapse()

  // Phase 2: 按页面注册 processor
  if (location.hostname !== 'zhuanlan.zhihu.com') {
    if (location.pathname.includes('/question/') && !location.href.includes('/log') && !location.pathname.includes('waiting')) {
      // 问题页
      dispatcher.register(originalPic.SELECTOR, originalPic.process)
      dispatcher.register(directLink.SELECTOR, directLink.process)
      dispatcher.register(timeDisplay.SELECTOR, timeDisplay.process)
      dispatcher.register(blockUsers.SELECTOR, blockUsers.process)
      dispatcher.register(blockUsers.SELECTOR_COMMENT, blockUsers.processComment)
      dispatcher.register(blockKeywords.SELECTOR_TITLE, blockKeywords.processTitle)
      dispatcher.register(blockKeywords.SELECTOR_COMMENT, blockKeywords.processComment)
      // block-type 需要自定义
      dispatcher.register('h2.ContentItem-title a:not(.zhihu_e_toQuestion)', blockType)
      // block-low-count 问题页
      dispatcher.register('.List-item', makeLowCountProcessor('question'))
    } else if (location.pathname === '/search') {
      dispatcher.register(originalPic.SELECTOR, originalPic.process)
      dispatcher.register(directLink.SELECTOR, directLink.process)
      dispatcher.register(timeDisplay.SELECTOR, timeDisplay.process)
      // search-specific
    } else {
      // 首页 / 热榜 / 关注
      dispatcher.register(originalPic.SELECTOR, originalPic.process)
      dispatcher.register(directLink.SELECTOR, directLink.process)
      dispatcher.register(timeDisplay.SELECTOR, timeDisplay.process)
      dispatcher.register(blockUsers.SELECTOR, blockUsers.process)
      dispatcher.register(blockUsers.SELECTOR_COMMENT, blockUsers.processComment)
      dispatcher.register(blockKeywords.SELECTOR_TITLE, blockKeywords.processTitle)
      dispatcher.register(blockKeywords.SELECTOR_COMMENT, blockKeywords.processComment)
      dispatcher.register('h2.ContentItem-title a:not(.zhihu_e_toQuestion), .ContentItem.PinItem', blockType)
    }
  }

  // 登录弹窗监控（仅在非 zhuanlan）
  if (location.hostname !== 'zhuanlan.zhihu.com') {
    switchHome()
    if (['/', '/hot', '/follow'].includes(location.pathname)) {
      switchHomeRecommend()
    }
  }

  // Phase 3: 启动
  dispatcher.start()

  // URL 变化时重跑
  UrlChangeManager.add(() => {
    pageReinit()
    // 重新注册部分 processor（搜索页等需要重新扫描的）
  })
})()
```

- [ ] **Step 2: build 验证**

```bash
npm run build
```

---

### Task 12: block-hot.js — 创建独立文件

**Files:**
- Create: `src/enhanced/modules/block-hot.js`

从 `block-type.js` 中把 `blockHotOther` 拆出来。

- [ ] **Step 1: 创建**

```js
import { menu_value } from '../../shared/menu-framework.js'
import { GlobalObserver } from '../../shared/global-observer.js'

export function blockHotOther() {
  if (!menu_value('menu_blockTypeLiveHot')) return
  const isQuestion = (hotItem) => {
    const link = hotItem.querySelector('.HotItem-content a')
    return link && /\/question\/\d+/.test(link.href)
  }
  const fixRank = () => {
    document.querySelectorAll('.HotList-list .HotItem:not([hidden])').forEach((item, i) => {
      const rank = item.querySelector('.HotItem-index .HotItem-rank')
      if (rank) rank.innerText = i + 1
    })
  }
  const block = () => {
    document.querySelectorAll('.HotList-list .HotItem').forEach(item => {
      if (!isQuestion(item)) item.remove()
    })
    fixRank()
  }
  block()
  GlobalObserver.add((mutations) => {
    for (const m of mutations) {
      for (const n of m.addedNodes) {
        if (n.nodeType === 1 && n.classList?.contains('HotItem')) block()
      }
    }
  })
}
```

**注意：** `blockHotOther` 用独立的 Observer（不通过 DomDispatcher），因为它需要监听 `.HotItem` 添加后重新遍历整个列表，不是单个 item 处理。这是合理的例外。

- [ ] **Step 2: build 验证**

```bash
npm run build
```

---

### Task 13: 清理和收尾

- [ ] **Step 1: 检查 import**

确保 index.js 不再导入 `GlobalObserver`、`debounce` 等不用的 shared 模块。

- [ ] **Step 2: 全面 build**

```bash
npm run build
```

确认 dist 生成正常。

- [ ] **Step 3: 提交**

```bash
git add src/enhanced/
git commit -m "refactor: rewrite zhihu-enhanced with layered architecture

- DomDispatcher: single MutationObserver with Layer 1 fast-filter + Layer 2 dispatch
- events.js: event delegation for user-triggered features
- css.js: centralized CSS injection
- init.js: one-time page initialization
- Each module exports SELECTOR + process() for dispatcher registration
- removed GlobalObserver dependency from all enhanced modules"
git push
```
