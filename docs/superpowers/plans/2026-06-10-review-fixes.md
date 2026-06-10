# Review Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修复代码审查发现的架构回归(scoped handler)、ReferenceError、FOUC 及一批正确性/性能问题。

**Architecture:** 核心决策是移除 GlobalObserver/UrlChangeManager 的 scoped 机制,恢复上游的 permanent handler 语义——所有注册只在脚本加载时发生一次,不存在累积;scoped 清理是上轮 "memory leak fix" 引入的伪需求,真实后果是首次 SPA 导航后功能全部失效。唯一真实的累积点(addSetInterval_ 的 pending handler、collapse-answer 的重复注册)用局部 guard 解决。

**Tech Stack:** Vanilla JS userscript + Rollup。无测试基础设施;验证方式为 `npm run build` + `node --check` dist 产物 + grep dist 检查已知坏模式(如 `registerMenuCommand$1` 与裸调用不一致)。不为本批修复引入 jsdom 测试框架(与项目规模不成比例,需用户另行决策)。

**注意:** `src/enhanced/modules/collapse-answer.js` 有用户未提交的 WIP(isClickOnSideBlank 坐标兜底),Task 3 在其基础上修改并一并提交。

---

### Task 1: shared 层——移除 scoped 机制,恢复 permanent 语义

**Files:**
- Modify: `src/shared/url-change.js`
- Modify: `src/shared/global-observer.js`
- Modify: `src/shared/debounce.js`
- Modify: `src/shared/theme.js`

- [ ] **Step 1: url-change.js 重写 manager 部分**

```js
// URL 变化事件管理器（避免重复注册 urlchange 监听器）
export const UrlChangeManager = (function () {
  const handlers = new Set();
  let initialized = false;

  function init() {
    if (initialized) return;
    initialized = true;
    window.addEventListener("urlchange", () => {
      for (const handler of handlers) {
        try {
          handler();
        } catch (e) {
          console.warn("UrlChange error:", e);
        }
      }
    });
  }

  return {
    add(handler) {
      if (!initialized) init();
      handlers.add(handler);
      return handler;
    },
    remove(handler) {
      handlers.delete(handler);
    },
  };
})();
```

并给 `addUrlChangeEvent` 加幂等 guard(模块级 `let patched = false`,二次调用直接 return)。

- [ ] **Step 2: global-observer.js 移除 scoped**

单一 `handlers` Set,保留 `add`/`remove`,删除 `addScoped`/`clearScoped` 及 scoped 遍历分支。

- [ ] **Step 3: debounce.js 支持参数转发 + cancel**

```js
// 防抖
export function debounce(fn, delay) {
  let timer;
  function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  }
  debounced.cancel = function () {
    clearTimeout(timer);
  };
  return debounced;
}
```

- [ ] **Step 4: theme.js 两处 `document.lastChild` → `document.documentElement`**

- [ ] **Step 5: 验证编译** — 此时 enhanced 引用 addScoped 会 build 失败,属预期,Task 2 修复后统一验证。先只跑 `npx rollup -c 2>&1 | head` 确认报错点都是 addScoped/onBeforeNavigate 引用。

### Task 2: enhanced——全部 addScoped 调用点改为 add,移除 onBeforeNavigate

**Files:**
- Modify: `src/enhanced/index.js`(移除 onBeforeNavigate 块;6 处 `GlobalObserver.addScoped` → `add`)
- Modify: `src/shared/content-filter.js`(2 处 addScoped → add)
- Modify: `src/enhanced/modules/block-users.js`(178 + 4 处 observer)
- Modify: `src/enhanced/modules/block-keywords.js`(41, 186 + 2 处 observer)
- Modify: `src/enhanced/modules/block-type.js`(83, 105, 270, 273, 335 + addSetInterval_)
- Modify: `src/enhanced/modules/type-tips.js`(44, 55 + addSetInterval_)
- Modify: `src/enhanced/modules/clean-ui.js`(20, 132)

- [ ] **Step 1: 机械替换所有 `addScoped(` → `add(`**(collapse-answer.js 除外,Task 3 处理)
- [ ] **Step 2: index.js 删除 `UrlChangeManager.onBeforeNavigate(...)` 块及注释**
- [ ] **Step 3: addSetInterval_ 防累积**(block-type.js 与 type-tips.js 各一份):闭包级 `let pendingHandler = null;`,进入函数先 remove 旧的;handler 自移除时同步置 null:

```js
  let pendingHandler = null;
  function addSetInterval_(A) {
    if (pendingHandler) {
      GlobalObserver.remove(pendingHandler);
      pendingHandler = null;
    }
    let aTag = document.querySelectorAll(A);
    if (aTag.length > 0) {
      aTag.forEach(function (item) {
        blockType_(item); // type-tips 版本为 addTypeTips_
      });
      return;
    }
    var _handler = function () {
      let aTag = document.querySelectorAll(A);
      if (aTag.length > 0) {
        GlobalObserver.remove(_handler);
        if (pendingHandler === _handler) pendingHandler = null;
        aTag.forEach(function (item) {
          blockType_(item);
        });
      }
    };
    pendingHandler = _handler;
    GlobalObserver.add(_handler);
  }
```

- [ ] **Step 4: `npm run build` 应成功(beautification 不引用这些 API);grep src 确认无 addScoped/clearScoped/onBeforeNavigate 残留**
- [ ] **Step 5: commit** `fix: restore SPA navigation behavior by removing broken scoped-handler machinery`

### Task 3: collapse-answer 整体修复

**Files:**
- Modify: `src/enhanced/modules/collapse-answer.js`

- [ ] **Step 1: collapsedAnswerHandler** — `return` → `continue`/`break`(命中一条不再丢弃整批);开头加 `mutation.target.nodeType !== 1 → continue`;长回答分支 parentElement null guard。
- [ ] **Step 2: observer 单例移到模块闭包**(去掉 `window._collapsedAnswerObserver`),URL handler 用 `UrlChangeManager.add` 注册一次,统一处理 menu 开关语义(menu 关闭时导航即 end,替代 _disconnectListener 机制):

```js
let collapsedObserver = null;

export function getCollapsedAnswerObserver() {
  if (!collapsedObserver) {
    collapsedObserver = {
      _active: false,
      _handler: collapsedAnswerHandler,
      start() {
        if (!this._active) {
          GlobalObserver.add(this._handler);
          this._active = true;
        }
      },
      end() {
        if (this._active) {
          GlobalObserver.remove(this._handler);
          this._active = false;
        }
      },
    };
    UrlChangeManager.add(function () {
      if (!menu_value("menu_defaultCollapsedAnswer")) {
        // [默认收起回答] 关闭时，手动开启的 observer 只对当前页生效
        collapsedObserver.end();
      } else {
        collapsedObserver[location.href.includes("/answer/") ? "end" : "start"]();
      }
    });
  }
  return collapsedObserver;
}
```

并删除 `collapsedAnswer()` 内的 `_disconnectListener` 注册块(语义已被上面的 URL handler 覆盖)。

- [ ] **Step 3: isClickOnSideBlank** — 坐标兜底改用 `.Topstory-container`(含 sidebar 的整体容器)做矩形判断,并先排除点击在交互元素上的情况:

```js
const SIDE_BLANK_CONTAINER = ".Topstory-container";

function isClickOnSideBlank(event, boundEl) {
  if (event.target === boundEl) return true;
  // 点到链接/按钮等具体内容时一定不是空白
  if (event.target.closest("a, button, input, textarea, img, video, [role='button']")) return false;
  const container = document.querySelector(SIDE_BLANK_CONTAINER);
  if (!container) return false;
  const rect = container.getBoundingClientRect();
  return event.clientX < rect.left || event.clientX > rect.right;
}
```

- [ ] **Step 4: collapsedNowAnswer / backToTop 加 null guard**(`const el = document.querySelector(selectors); if (!el) return;`)
- [ ] **Step 5: build + commit** `fix(collapse-answer): batch handling, side-blank detection, null guards`

### Task 4: registerMenuCommand ReferenceError

**Files:**
- Modify: `src/shared/menu-framework.js`(新增 registrar 注入)
- Modify: `src/enhanced/index.js`(setMenuRegistrar)
- Modify: `src/enhanced/modules/block-users.js`、`block-keywords.js`(裸调用 → refreshMenu)

- [ ] **Step 1: menu-framework.js 末尾追加**

```js
// 菜单注册器注入：模块侧通过 refreshMenu() 触发入口脚本的 registerMenuCommand
let menuRegistrar = null;
export function setMenuRegistrar(fn) {
  menuRegistrar = fn;
}
export function refreshMenu() {
  if (menuRegistrar) menuRegistrar();
}
```

- [ ] **Step 2: enhanced/index.js** import setMenuRegistrar,在 `initMenuValues(menu_ALL);` 前调用 `setMenuRegistrar(registerMenuCommand);`
- [ ] **Step 3: block-users.js(2 处)、block-keywords.js(3 处)** import refreshMenu,替换裸 `registerMenuCommand()` 调用
- [ ] **Step 4: build 后验证** `grep -c 'registerMenuCommand\$1' dist/Zhihu-Enhanced.user.js` 与裸调用核对——dist 中不应再有未定义的裸 `registerMenuCommand(` 调用
- [ ] **Step 5: commit** `fix: resolve cross-module registerMenuCommand ReferenceError via registrar injection`

### Task 5: block-keywords 修复

**Files:**
- Modify: `src/enhanced/modules/block-keywords.js`

- [ ] **Step 1:** `blockKeywords()` 入口缓存关键词(过滤空串 + 预小写),`blockKeywords_1` 与 `filterComment` 改用缓存,不再每 item 读 GM_getValue
- [ ] **Step 2: filterComment** — `content` null guard;命中后 `break`(防二次命中把占位符当原文 clone)
- [ ] **Step 3: blockKeywords_search** — `blockKeywords_1(tt, ...)` 替代 `target.childNodes[0]`
- [ ] **Step 4: comment observer callback** — `typeof target.className === "string"` guard(SVG 防护)
- [ ] **Step 5: build + commit** `fix(block-keywords): comment restore corruption, search node, hot-path caching`

### Task 6: block-users 修复

**Files:**
- Modify: `src/enhanced/modules/block-users.js`

- [ ] **Step 1:** `blockUsers()` 入口缓存 `const users = menu_value("menu_customBlockUsers");`
- [ ] **Step 2:** 新增闭包 helper 替换 4 处重复的 zop 字符串拼接匹配:

```js
  // dataset.zop 是 JSON，直接解析取 authorName，避免字符串拼接对转义/键序的脆弱假设
  function isBlockedAuthor(contentItem) {
    const zop = contentItem.dataset.zop;
    if (!zop) return false;
    try {
      return users.includes(JSON.parse(zop).authorName);
    } catch (e) {
      return false;
    }
  }
```

- [ ] **Step 3:** 其余 menu_value 热路径读取(search/comment/button)改用 `users` 缓存;button_add/del 内保留实时读写(用户操作路径,需要最新值)
- [ ] **Step 4:** comment/button observer 的 `target.className.indexOf` 前加 `typeof target.className === "string"` guard
- [ ] **Step 5: build + commit** `fix(block-users): zop JSON parsing, SVG className guard, cache user list`

### Task 7: block-type / type-tips / block-low-count / clean-ui

**Files:**
- Modify: `src/enhanced/modules/block-type.js`(blockHotOther nodeType guard)
- Modify: `src/enhanced/modules/block-low-count.js`(阈值读一次)
- Modify: `src/enhanced/modules/clean-ui.js`(closeFloatingComments 每批一次查询;removeLogin 加 DIV 粗筛)

- [ ] **Step 1: blockHotOther blockLive_content** — `if (target.nodeType != 1) continue;`
- [ ] **Step 2: block-low-count** — `blockLowCount_` 创建时读一次 `GM_getValue(menuUpvote/menuComment)`,`blockLowCount_1` 接收值而非 key
- [ ] **Step 3: closeFloatingComments** — querySelector 提到 mutationsList 循环外,每批只查一次
- [ ] **Step 4: removeLogin** — addedNodes 循环加 `if (target.tagName !== "DIV") continue;` 粗筛(登录弹窗容器都是 DIV),避免每节点 XPath
- [ ] **Step 5: build + commit** `perf: reduce per-node document queries and repeated GM reads in observer hot paths`

### Task 8: menu-framework 弹窗 + tips 换行

**Files:**
- Modify: `src/shared/menu-framework.js`
- Modify: `src/enhanced/index.js`(menu_blockLowCount 的 tips `<br/>` → `\n`)

- [ ] **Step 1:** 样式表加 `.zhihuE_SettingMain p {white-space: pre-line;}`;tips 数据中 `<br/>` 改为 `\n`
- [ ] **Step 2:** `menu_setting` 打开前先移除已存在的 `.zhihuE_SettingBackdrop_1` 和 `.zhihuE_SettingStyle`(防重复弹窗残留遮罩)
- [ ] **Step 3:** 移除 `setTimeout(..., 100)`,insertAdjacentHTML 后同步绑定事件
- [ ] **Step 4: build + commit** `fix(menu): render multiline tips, dedupe popup, bind events synchronously`

### Task 9: beautification FOUC + meta

**Files:**
- Modify: `src/beautification/index.js`
- Modify: `src/beautification/meta.txt`
- Modify: `src/enhanced/meta.txt`(仅 @match 收紧)

- [ ] **Step 1: index.js 样式注入** — 替换 if/else + 50ms 轮询为:

```js
    // document-start 时 head 可能尚不存在，挂到 <html> 下同样生效且零延迟（避免暗黑模式 FOUC）
    (document.head || document.documentElement).appendChild(style_Add).textContent = style;
```

- [ ] **Step 2: beautification meta.txt** — `@namespace https://github.com/wangkezun/zhihu-js`、`@version 2.0.0`(与上游 XIU2 原版区分身份,避免脚本管理器冲突);`@match *://` → `https://`
- [ ] **Step 3: enhanced meta.txt** — `@match *://` → `https://`(namespace 已与上游不同,不动)
- [ ] **Step 4: build + commit** `fix(beautification): eliminate dark-mode FOUC, fork script identity`

### Task 10: 构建配置

**Files:**
- Modify: `rollup.config.js`
- Modify: `package.json`

- [ ] **Step 1:** 删除 `treeshake: false`;删除 `strict: false` 及误导注释;`banner` 改为函数形式(watch 模式下 meta.txt 改动能生效)
- [ ] **Step 2:** package.json scripts 加 `"dev": "rollup -c -w"`
- [ ] **Step 3: build,对比 dist 产物**确认 treeshake 开启后无功能代码被错误摇掉(检查两个 dist 文件行数量级、关键函数仍在)
- [ ] **Step 4: commit** `build: enable treeshaking, add watch mode, function-form banner`

### Task 11: 最终验证

- [ ] `npm run build` 成功
- [ ] `node --check` 两个 dist 文件(语法验证)
- [ ] grep dist:无 `addScoped`、无裸 `registerMenuCommand(` 与重命名定义不一致、`urlchange` 监听器内不再有 clear-before-run
- [ ] grep src:无 scoped 残留引用
