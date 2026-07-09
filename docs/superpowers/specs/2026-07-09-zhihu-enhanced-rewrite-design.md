# 知乎增强 Remake — 重写设计

## 1. 目标

将 `src/enhanced/` 从 XIU2/UserScript 单文件 fork 的增量修改版本，重写为分层架构，解决性能衰退问题。

### 约束

- 保留全部 12 个功能模块
- 兼容 Tampermonkey / Violentmonkey
- 兼容 zhihu.com + zhuanlan.zhihu.com
- 美化脚本（beautification）本次不涉及

## 2. 架构总览

### 执行阶段

```
Phase 1: 初始化
  ├─ CSS 注入（head style，一次性）
  ├─ 事件委托注册（document 级，零 Observer）
  ├─ 一次性 DOM 操作（问题信息、展开描述等）
  └─ Observer 启动

Phase 2: 运行时
  └─ MutationObserver 回调
       ├─ Layer 1: 快速放行 —— addedNodes 中有无内容卡片？无则跳过
       └─ Layer 2: 一次 QSA + 按类型分发
```

### 调用关系

```
index.js
  ├─ menu.js              — 菜单注册 / 切换
  ├─ css.js               — 所有 CSS 注入
  ├─ events.js            — 事件委托绑定
  ├─ init.js              — 一次性页面初始化（含 URL 变化重跑）
  ├─ dispatcher.js        — Observer 分发器
  └─ modules/
       ├─ original-pic.js   — processor
       ├─ direct-link.js    — processor
       ├─ time-display.js   — processor
       ├─ collapse-answer.js— events
       ├─ clean-ui.js       — processor + CSS
       ├─ block-type.js     — processor + CSS
       ├─ block-low-count.js— processor
       ├─ block-users.js    — processor + events
       ├─ block-keywords.js — processor
       ├── block-hot.js     — processor + CSS
       ├─ question-ui.js    — init
       ├─ type-tips.js      — CSS
       └─ navigation.js     — init
```

每个模块的职责：导出 selector + processor 函数，不操作 Observer。
部分功能不走 Observer 分发器：
- **CSS** → 纯样式，放在 css.js
- **事件** → 委托监听，放在 events.js
- **初始化** → 页面加载后执行一次，放在 init.js

## 3. Observer 分发器（dispatcher.js）

### 接口

```js
class DomDispatcher {
  register(selector, processor)
  // selector: CSS selector string
  // processor(el: Element): void

  start(target = document.body)
  stop()
}
```

### 内部逻辑

```js
callback(mutations) {
  // 从所有已注册 module 收集合并 selector
  const COMBINED = Array.from(modules.keys()).join(',')

  for (const m of mutations) {
    for (const n of m.addedNodes) {
      if (n.nodeType !== 1) continue

      // Layer 1: 快速放行 —— 该子树里有没有我们关心的元素？
      if (!n.matches?.(COMBINED) && !n.querySelector(COMBINED)) continue

      // Layer 2: 一次 QSA，按类型分发
      const matches = n.matches(COMBINED)
        ? [n, ...n.querySelectorAll(COMBINED)]
        : n.querySelectorAll(COMBINED)

      for (const el of matches) {
        for (const [selector, processors] of modules) {
          if (el.matches(selector)) {
            for (const fn of processors) fn(el)
          }
        }
      }
    }
  }
}
```

### 性能特征

- Layer 1 用 `querySelector`（找到就停），大多数不相关的 mutation 在此短路
- 内容加载（无限滚动）每 5-10 秒触发一次，每次只扫新增的 1 条 item（<100 个元素），Layer 2 开销可忽略
- `el.matches()` 是浏览器原生 CSS 匹配，O(1)

## 4. 事件委托（events.js）

在 `document` 上注册 capture 阶段监听，不再通过 Observer 或逐元素 `onclick` 绑定。

| 事件 | 目标 | 功能 |
|------|------|------|
| `click` | 两侧空白区域 | 收起当前回答 + 评论 |
| `contextmenu` | 两侧空白区域 | 回到顶部 |
| `click` | 浮动评论 overlay | 关闭浮动评论 |
| `click` | `.QuestionInvitation-title span` | 展开/折叠邀请 |
| `click` | `.MemberButtonGroup` | 插入/检测屏蔽按钮（懒操作） |

事件委托仅在用户操作时触发，零运行时开销。

## 5. CSS 注入（css.js）

所有能通过 CSS 完成的，不用 JS：

- `::before` 标签（问题/文章/想法/视频）
- `display: none` 屏蔽视频导航 tab、视频回答播放器
- 搜索 placeholder 和热门搜索隐藏
- 登录弹窗相关元素隐藏
- 直达问题按钮样式
- `::before` + attr 区分类型标签（现有 CSS）

在初始化时一次性注入 `<style>`，不跑 Observer。

## 6. 一次性初始化（init.js）

### 页面加载后立即执行

| 模块 | 操作 |
|------|------|
| question-ui | 从 `#js-initialData` 读取问题作者、创建时间，插入 DOM |
| question-ui | 点击 `button.QuestionRichText-more` 展开描述 |
| question-ui | 隐藏 `.QuestionInvitation-content`，绑定 toggle |
| navigation | 替换导航 `<nav>` 为静态 HTML |
| clean-ui | MutationObserver 保护 title（当前实现） |

### URL 变化时重新执行

通过现有的 `UrlChangeManager`：

- `addToQuestion` / `addTypeTips` 重新注入标签
- `cleanSearch` 重新设置 placeholder
- `blockHotOther` 重新过滤热榜
- 搜索页的 blockUsers / blockKeywords 重跑

## 7. 模块接口

每个模块约定导出：

```js
export const SELECTOR = 'css-selector-string'
export function process(el) { /* 处理单个匹配元素 */ }
export function init() { /* 处理已有元素，可选 */ }
```

### 模块清单

| 模块 | 处理方式 | 说明 |
|------|---------|------|
| original-pic | processor | 替换 img src 为 webp |
| direct-link | processor | 解码 link.zhihu.com 跳转 |
| time-display | processor | 置顶时间 + 完整显示 |
| block-type | CSS + processor | 按类别 hide 内容 |
| block-low-count | processor | 解析 data-za-extra-module |
| block-users | processor + events | 匹配黑名单隐藏 + 悬浮卡按钮 |
| block-keywords | processor | 匹配关键词隐藏标题/评论 |
| block-hot | CSS + processor | 热榜保留纯问题 |
| clean-highlight | processor | 替换高亮链接为纯文本 |
| removeLogin | CSS + processor | 隐藏登录弹窗 |
| collapse-answer | events + init | 点击空白收起、一键收起按钮 |
| question-ui | init | 显示问题作者/时间、展开描述、折叠邀请 |
| type-tips | CSS | ::before 标签 |
| navigation | init | 导航切换 |

### Menu 框架

保留现有 menu-framework 不变（已剥离为 shared）。菜单定义与当前一致，不需改动。

## 8. 页面路由

现有 index.js 的路由逻辑简化：

```
init() → 判断 location.pathname
  ├─ /question/... → 注册 question 专属 processors + 初始化
  ├─ /search       → 注册 search 专属 processors
  ├─ /topic/...    → 注册 topic 专属 processors
  ├─ /people/...   → 注册 people 专属 processors
  ├─ /collection/..→ 注册 collection 专属 processors
  ├─ /pin/...      → 注册 pin 专属 processors
  ├─ /, /hot, /follow → 注册首页 processors
  └─ zhuanlan.zhihu.com → 文章页处理
  └─ /column/...   → 专栏处理
```

每个分支只注册该页需要的 processor，减少无用匹配。

## 9. 不涉及的改动

- `src/shared/` — 保持现状（GlobalObserver 在新设计中不再使用，其余 shared 工具保留）
- `src/beautification/` — 本次不涉及
- `meta.txt` / 构建配置 — 不变

## 10. 验证

- `npm run build` 通过
- 在 zhihu.com 首页、问题页、搜索页、热榜/关注页逐一验证各功能
- 在 zhuanlan.zhihu.com 验证文章页功能
- 长时间滚动观察无明显卡顿（与现版对比）
