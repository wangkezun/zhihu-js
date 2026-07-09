// ==UserScript==
// @name         Zhihu enhancement Remake
// @name:zh-CN   知乎增强 Remake
// @name:zh-TW   知乎增強 Remake
// @name:ru      Улучшение Zhihu Remake
// @version      2.3.28
// @author       wangkezun
// @description  A more personalized Zhihu experience~
// @description:zh-CN  移除登录弹窗、屏蔽指定类别（视频、盐选、文章、想法、关注[赞同/关注了XX]等）、屏蔽低赞/低评回答、屏蔽用户、屏蔽关键词、默认收起回答、快捷收起回答/评论（左键两侧）、快捷回到顶部（右键两侧）、区分问题文章、移除高亮链接、净化搜索热门、净化标题消息、展开问题描述、显示问题作者、默认高清原图（无水印）、置顶显示时间、完整问题时间、直达问题按钮、默认站外直链...
// @description:zh-TW  移除登錄彈窗、屏蔽指定類別（視頻、鹽選、文章、想法、關注[贊同/關注了XX]等）、屏蔽低贊/低評回答、屏蔽用戶、屏蔽關鍵詞、默認收起回答、快捷收起回答/評論、快捷回到頂部、區分問題文章、移除高亮鏈接、默認高清原圖（無水印）、默認站外直鏈...
// @description:ru  Более персонализированный опыт пользования сайтом Zhihu~
// @match        https://www.zhihu.com/*
// @match        https://zhuanlan.zhihu.com/*
// @exclude      https://www.zhihu.com/signin*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFo0lEQVR4nJWXT4hlVxHGf9/tJyYuzJtxIziQN8RBFDEtIWB0MW+Mi4CIk4UuAtqvAxPcqAkJRNxMshDUTc8s3TjdO3c9QbIKod+o4CIuZtRFDEi3EIgEM/02jpPIPZ+LqnPv6TeB4IHLPfeeP1X11VdV54i2vewtOhaITcQDdEgdthAdINAGNkgd0IEVbwR17rAmx1TniSVil6e0V0UKgJc8pWdfG5yvwqRhs1FQIyQ3trvcpxsVGd4xf/gelO24yV0usK1VB6APOMDMKSADBShIBWNwj1WwjClAzLEL0CMc86jj9cl/LgRs8ZjCJvexH5r/xAuJa260TatG6DosIee4lHO0ZnWDXH5bgYQ8uql122Iis2Xnj4JtRH675AIHMAQKuAsdrLV3dYXTwQ7Bir1jrzJ+Wyw698yVkLmgxgVg+PGjcPw8zD6JKcgFUcD94AoNa0eXkO600lVqXOPqPrPZNT6tjylYBRZfgp0n4GgFR7dDkEieeNys6ZPCBq4MCicXdFLWdIKBHtMFfC4JY8Hf/nxEyY0jmD+IM7Cgy77gxtto+jF4+NMj8+tY84YOLd8JnZJPpiDxI7shUigimJ2Gwxf5yLb9aryvffOj5+pXKbzJDxOVoIw7REkLhedno7+6CzffgdkpmE3z+5/Nrq7JJMfejc3bNj+TnT4tTyRtmLiAlARKliK09Uis2fsTPPcqvvwNdPlxuP4mbO+P4aQObz0cG958F77+mxMJh9kDcPh0IpCcUIerqycYuc8FGX7zczB/CI6O4cofAA9GjuRjUFhN2I0hmISlNFCUzCGMSkxqfFJw3XD6cXjuOt57A1YfpM/KSSEqY9zLo4w0psLsVnknyhkVYgNPMlRQh+qE63+GSsaBoK2VJcdTKTcKDLmhA/o1BDKFKzKl3aOJcoNBu3SHAAe4ahwwKgBkFRhdMMIc6Chzf+VphruT6urwZBh1aEQXjL/2fZidHoVP74/3xS8GP1IBLQ/hxuGonCLFxpZKjtTpDpRrSjYwYa2p4GcvoPm59ZFU5L54apvP4MZhY2XJMh1u+DB0Qk7ybaIR2EGHl34LV1/HGU5CsP8MbH4Gnvw1vPJX7G48pGw/OiLgyoEKf4PAYH0f6VtdIOAmlwCwugOrO0mDOHRodjrG/vGv9HvyQEprRwQjPB3rWg5oXBNR0A+Vf2wtJwDZaP5ZPL0fVv+B4zto5yJjKK6R0CUPMI7K6jUEsgpKGYqTwXpneGiExKnR4iuZ6d6Ggx/C7FNwdBuu/C6ROBmiUU/6PDuWhh9tEssQHxFQVlmP3wKfPY23Hotfe3+Eq8tYf/kJmE2jdK8pIPWJTDmJAFmq1We57iNnDQol9HWFDbr8rfg8eg+Wb8KV19DyrQjLa08hNal4/hD4l3D+LNr/HvhncPhC49+Ev5475DHfeUjjGrPt4jHY+upgvZOAPL0XRJ2fgwdPNS7IdvADuPgF7m15UDEDOhaXXKQT6RyAzTNw8DxMPxHWn/1p6ObMjc8+DjvfhVMvwOr9EcLjnwc6V38PL78Gq7vYG8PBxAqTzUbInJwoGtlbfA3tfCeEL/8G23sZEaAMIV99HW2egdW/m9Is/Mpf0O4bsPw7tY4os+OAbuUXHZKe8W3gVDLeEjr/uTgRHb0Hy7fyf0PUQd2YH4eZesrRmMBqDhF5gRFiIxSRQoGJxS0Kc8XNRSasHlqStOZ3Nf1aKVQzIKkMzeHTGZaRoEzWmyxIyw6zW6FRQ6c2NapC5pCjuAl5+Od7Tru41vxagEpTOeN0LAq7oe0lH0DeC6uVH0Lito03kbVUnmSrp+yE/967Y8dNfqEvdwD+L09a3BrgbqA/IZS4H4osLE3mHlDzYB30iUJ7XwwklrzPhXWk4ZIXdGxROM//g0ZbQrKXVza0EQcQiWNvcIuOXXbG6/n/AAwhLDO9HaqBAAAAAElFTkSuQmCC
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        GM_info
// @grant        window.onurlchange
// @sandbox      JavaScript
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://github.com/wangkezun/zhihu-js
// @supportURL   https://github.com/wangkezun/zhihu-js
// @homepageURL  https://github.com/wangkezun/zhihu-js
// ==/UserScript==

// HTML 转义
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// 初始化菜单默认值到 GM 存储
// 支持新的对象格式: { key, default, children?: [...] }
function initMenuValues(menu_ALL) {
  for (const item of menu_ALL) {
    if (GM_getValue(item.key) == null) {
      GM_setValue(item.key, item.default);
    }
    if (item.children) {
      for (const child of item.children) {
        if (GM_getValue(child.key) == null) {
          GM_setValue(child.key, child.default);
        }
      }
    }
  }
}

// 返回菜单值（直接读取 GM 存储）
function menu_value(key) {
  return GM_getValue(key);
}

// 菜单注册器注入：入口脚本注册实现，功能模块通过 refreshMenu() 触发重新注册
let menuRegistrar = null;
function setMenuRegistrar(fn) {
  menuRegistrar = fn;
}
function refreshMenu() {
  if (menuRegistrar) menuRegistrar();
}

// 脚本设置弹窗
// children: [{ key, label, tips?, inputType?: 'text' }]
function menu_setting(title, tips, children) {
  // 防止重复打开叠加多个弹窗/遮罩
  document
    .querySelectorAll(".zhihuE_SettingBackdrop_1, .zhihuE_SettingStyle")
    .forEach(function (el) {
      el.remove();
    });
  let _html = `<style class="zhihuE_SettingStyle">.zhihuE_SettingRoot {position: absolute;top: 50%;left: 50%;-webkit-transform: translate(-50%, -50%);-moz-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);-o-transform: translate(-50%, -50%);transform: translate(-50%, -50%);width: auto;min-width: 400px;max-width: 600px;height: auto;min-height: 150px;max-height: 400px;color: #535353;background-color: #fff;border-radius: 3px;}
.zhihuE_SettingBackdrop_1 {position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 203;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;flex-direction: column;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;overflow-x: hidden;overflow-y: auto;-webkit-transition: opacity .3s ease-out;transition: opacity .3s ease-out;}
.zhihuE_SettingBackdrop_2 {position: absolute;top: 0;right: 0;bottom: 0;left: 0;z-index: 0;background-color: rgba(18,18,18,.65);-webkit-transition: background-color .3s ease-out;transition: background-color .3s ease-out;}
.zhihuE_SettingRoot .zhihuE_SettingHeader {padding: 10px 20px;color: #fff;font-weight: bold;background-color: #3994ff;border-radius: 3px 3px 0 0;}
.zhihuE_SettingRoot .zhihuE_SettingMain {padding: 10px 20px;border-radius: 0 0 3px 3px;}
.zhihuE_SettingHeader span {float: right;cursor: pointer;}
.zhihuE_SettingMain input {margin: 10px 6px 10px 0;vertical-align:middle;}
.zhihuE_SettingMain input[type=text] {margin: 5px 6px 5px 0;padding-block: 0;}
.zhihuE_SettingMain input[name=zhihuE_Setting_Checkbox] {cursor: pointer;}
.zhihuE_SettingMain label {margin-right: 20px;user-select: none;cursor: pointer;vertical-align:middle;}
.zhihuE_SettingMain hr {border: 0.5px solid #f4f4f4;}
.zhihuE_SettingMain p {white-space: pre-line;}
[data-theme="dark"] .zhihuE_SettingRoot {color: #adbac7;background-color: #343A44;}
[data-theme="dark"] .zhihuE_SettingHeader {color: #d0d0d0;background-color: #2D333B;}
[data-theme="dark"] .zhihuE_SettingMain hr {border: 0.5px solid #2d333b;}</style>
        <div class="zhihuE_SettingBackdrop_1"><div class="zhihuE_SettingBackdrop_2"></div><div class="zhihuE_SettingRoot">
            <div class="zhihuE_SettingHeader">${escapeHtml(title)}<span class="zhihuE_SettingClose" title="点击关闭"><svg class="Zi Zi--Close Modal-closeIcon" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M13.486 12l5.208-5.207a1.048 1.048 0 0 0-.006-1.483 1.046 1.046 0 0 0-1.482-.005L12 10.514 6.793 5.305a1.048 1.048 0 0 0-1.483.005 1.046 1.046 0 0 0-.005 1.483L10.514 12l-5.208 5.207a1.048 1.048 0 0 0 .006 1.483 1.046 1.046 0 0 0 1.482.005L12 13.486l5.207 5.208a1.048 1.048 0 0 0 1.483-.006 1.046 1.046 0 0 0 .005-1.482L13.486 12z" fill-rule="evenodd"></path></svg></span></div>
            <div class="zhihuE_SettingMain"><p>${escapeHtml(tips)}</p><hr>`;
  for (const child of children) {
    if (child.inputType === "text") {
      _html += `<label>${child.tips || child.label}：<input name="${child.key}" type="text" oninput="value=value.replace(/[^\\d]/g,'')" value="${escapeHtml(GM_getValue(child.key))}" style="width: 50px;"></label><br>`;
    } else if (GM_getValue(child.key)) {
      _html += `<label><input name="zhihuE_Setting_Checkbox" type="checkbox" value="${child.key}" checked="checked">${child.label}</label><br>`;
    } else {
      _html += `<label><input name="zhihuE_Setting_Checkbox" type="checkbox" value="${child.key}">${child.label}</label><br>`;
    }
  }
  _html += `</div></div></div>`;
  document.body.insertAdjacentHTML("beforeend", _html);
  // insertAdjacentHTML 是同步的，插入后立即绑定事件
  const doc = document.querySelector(".zhihuE_SettingBackdrop_1");
  doc.querySelector(".zhihuE_SettingClose").onclick = function () {
    this.parentElement.parentElement.parentElement.remove();
    document.querySelector(".zhihuE_SettingStyle").remove();
  };
  doc.querySelector(".zhihuE_SettingBackdrop_2").onclick = function (event) {
    if (event.target == this) {
      document.querySelector(".zhihuE_SettingClose").click();
    }
  };
  doc
    .querySelectorAll("input[name=zhihuE_Setting_Checkbox]")
    .forEach(function (checkBox) {
      checkBox.addEventListener("click", function () {
        GM_setValue(this.value, this.checked);
      });
    });
  doc.querySelectorAll("input[type=text]").forEach(function (textInput) {
    textInput.onchange = function () {
      GM_setValue(this.name, this.value);
    };
  });
}

// 全局统一 MutationObserver 管理器（合并所有 document 级 childList+subtree 观察器）
const GlobalObserver = (function () {
  const handlers = new Set();
  let observer = null;

  function init() {
    if (observer) return;
    observer = new MutationObserver((mutations) => {
      for (const handler of handlers) {
        try {
          handler(mutations);
        } catch (e) {
          console.warn("GlobalObserver error:", e);
        }
      }
    });
    observer.observe(document, { childList: true, subtree: true });
  }

  return {
    add(handler) {
      handlers.add(handler);
      if (!observer) init();
      return handler;
    },
    remove(handler) {
      handlers.delete(handler);
    },
  };
})();

// URL 变化事件管理器（避免重复注册 urlchange 监听器）
const UrlChangeManager = (function () {
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

// 自定义 urlchange 事件（用来监听 URL 变化）
let urlChangeEventPatched = false;
function addUrlChangeEvent() {
  if (urlChangeEventPatched) return;
  urlChangeEventPatched = true;

  history.pushState = ((f) =>
    function pushState() {
      var ret = f.apply(this, arguments);
      window.dispatchEvent(new Event("pushstate"));
      window.dispatchEvent(new Event("urlchange"));
      return ret;
    })(history.pushState);

  history.replaceState = ((f) =>
    function replaceState() {
      var ret = f.apply(this, arguments);
      window.dispatchEvent(new Event("replacestate"));
      window.dispatchEvent(new Event("urlchange"));
      return ret;
    })(history.replaceState);

  window.addEventListener("popstate", () => {
    window.dispatchEvent(new Event("urlchange"));
  });
}

// 获取元素是否在可视区域（完全可见）
function isElementInViewport(el) {
  let rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// 获取元素是否在可视区域（部分可见）
function isElementInViewport_(el) {
  let rect = el.getBoundingClientRect();
  return (
    rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom > 0
  );
}

function getXpath(xpath, contextNode, doc = document) {
  contextNode = contextNode || doc;
  try {
    const result = doc.evaluate(
      xpath,
      contextNode,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return (
      result.singleNodeValue &&
      result.singleNodeValue.nodeType === 1 &&
      result.singleNodeValue
    );
  } catch (err) {
    return null;
  }
}

// 已知会出现 "外层 wrapper 覆盖两侧空白" 的页面，容器 selector 用于坐标兜底判断。
// 知乎首页改版后两侧空白被新的 .Topstory wrapper 接管，event.target != bound element，
// 仅靠 event.target == this 命中不到。
// 用包含右侧 sidebar 的整体容器做矩形判断，避免点击 sidebar 被误判为空白。
const SIDE_BLANK_CONTAINER = ".Topstory-container";

function isClickOnSideBlank(event, boundEl) {
  if (event.target === boundEl) return true;
  // 点到链接/按钮等具体内容时一定不是空白
  if (
    event.target.closest(
      "a, button, input, textarea, img, video, [role='button']",
    )
  )
    return false;
  const container = document.querySelector(SIDE_BLANK_CONTAINER);
  if (!container) return false;
  const rect = container.getBoundingClientRect();
  return event.clientX < rect.left || event.clientX > rect.right;
}

// 默认收起回答的 handler（复用 GlobalObserver，避免创建第二个全局 subtree observer）
function collapsedAnswerHandler(mutations) {
  // 注意只能跳过当前 mutation（continue），不能 return：
  // 同一批 mutations 里还有其他待收起的回答
  for (const mutation of mutations) {
    if (mutation.target.nodeType !== Node.ELEMENT_NODE) continue;
    if (mutation.target.hasAttribute("script-collapsed")) continue;
    // 短的回答
    if (mutation.target.classList.contains("RichContent")) {
      for (const addedNode of mutation.addedNodes) {
        if (addedNode.nodeType != Node.ELEMENT_NODE) continue;
        if (addedNode.className != "RichContent-inner") continue;
        if (addedNode.offsetHeight < 400) break;
        const button = mutation.target.querySelector(
          ".ContentItem-actions.Sticky [data-zop-retract-question]",
        );
        if (button) {
          mutation.target.setAttribute("script-collapsed", "");
          button.click();
          break;
        }
      }
      // 长的回答
    } else if (
      mutation.target.tagName === "DIV" &&
      !mutation.target.style.cssText &&
      !mutation.target.className
    ) {
      const parent = mutation.target.parentElement;
      if (!parent || parent.hasAttribute("script-collapsed")) continue;
      const button = mutation.target.querySelector(
        ".ContentItem-actions.Sticky [data-zop-retract-question]",
      );
      if (button) {
        parent.setAttribute("script-collapsed", "");
        button.click();
      }
    }
  }
}

let collapsedObserver = null;

function getCollapsedAnswerObserver() {
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
        collapsedObserver[
          location.href.includes("/answer/") ? "end" : "start"
        ]();
      }
    });
  }
  return collapsedObserver;
}

// 默认收起回答
function defaultCollapsedAnswer() {
  if (!menu_value("menu_defaultCollapsedAnswer")) return;
  const observer = getCollapsedAnswerObserver();
  if (location.href.includes("/answer/") === false) {
    observer.start();
  }
}

// 一键收起回答+评论（全部）
function collapsedAnswer() {
  if (!menu_value("menu_collapsedAnswer")) return;
  if (
    document.querySelector(".CornerAnimayedFlex") &&
    !document.getElementById("collapsed-button")
  ) {
    // 向网页中插入收起全部回答按钮+样式+绑定点击事件
    document.head.appendChild(document.createElement("style")).textContent =
      ".CornerButton{margin-bottom:8px !important;}.CornerButtons{bottom:45px !important;}";
    document
      .querySelector(".CornerAnimayedFlex")
      .insertAdjacentHTML(
        "afterBegin",
        '<button id="collapsed-button" data-tooltip="收起全部回答/评论" data-tooltip-position="left" data-tooltip-will-hide-on-click="false" aria-label="收起全部回答/评论" type="button" class="' +
          document.querySelector(".CornerAnimayedFlex>button").className +
          '"><svg class="ContentItem-arrowIcon is-active" aria-label="收起全部回答/评论" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg></button>',
      );
    document.getElementById("collapsed-button").onclick = function () {
      // 收起所有评论（悬浮的 [收起评论]）
      document.querySelectorAll(".Comments-container").forEach(function (el) {
        let commentCollapseButton = getXpath('//button[text()="收起评论"]', el);
        if (commentCollapseButton) commentCollapseButton.click();
      });
      // 收起所有评论（固定的 [收起评论]）
      document
        .querySelectorAll(
          ".RichContent >.ContentItem-actions>button:first-of-type",
        )
        .forEach(function (el) {
          if (el.textContent.includes("收起评论")) el.click();
        });

      if (
        location.pathname === "/" ||
        location.pathname === "/hot" ||
        location.pathname === "/follow"
      ) {
        // 对于首页的关注、推荐、热榜
        document
          .querySelectorAll(".ContentItem-rightButton")
          .forEach(function (el) {
            if (el.hasAttribute("data-zop-retract-question")) {
              el.click();
            }
          });
      } else {
        // 被 getCollapsedAnswerObserver 函数收起过的，固定 [收起] 按钮
        document
          .querySelectorAll("[script-collapsed]")
          .forEach(function (scriptCollapsed) {
            scriptCollapsed
              .querySelectorAll(
                ".ContentItem-actions [data-zop-retract-question], .ContentItem-actions.Sticky [data-zop-retract-question]",
              )
              .forEach(function (button) {
                button.click();
              });
          });
        // 被 getCollapsedAnswerObserver 函数收起过的，悬浮 [收起] 按钮（悬浮底部的横栏）
        document
          .querySelectorAll(
            ".RichContent:not([script-collapsed]) .ContentItem-actions.Sticky [data-zop-retract-question]",
          )
          .forEach(function (button) {
            let el = button.parentElement;
            while (!el.classList.contains("RichContent")) {
              el = el.parentElement;
            }
            if (el) el.setAttribute("script-collapsed", "");
            button.click();
          });

        // [默认收起回答] 关闭时，getCollapsedAnswerObserver 内注册的
        // URL handler 会在下次导航时自动 end()
        getCollapsedAnswerObserver().start();
      }
    };
  }
}

// 收起当前回答、评论（监听点击事件，点击网页两侧空白处）
function collapsedNowAnswer(selectors) {
  backToTop(selectors); // 快捷回到顶部
  if (!menu_value("menu_collapsedNowAnswer")) return;
  const el = document.querySelector(selectors);
  if (!el) return;
  el.onclick = function (event) {
    if (isClickOnSideBlank(event, this)) {
      // 下面这段主要是 [收起回答]，顺便 [收起评论]（如果展开了的话）
      let rightButton = document.querySelector(
        ".ContentItem-actions.Sticky.RichContent-actions.is-fixed.is-bottom",
      );
      if (rightButton) {
        // 悬浮在底部的 [收起回答]（此时正在浏览回答内容 [中间区域]）
        // 固定的 [收起评论]（先看看是否展开评论）
        let commentCollapseButton = rightButton.querySelector(
          "button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type",
        );
        if (
          commentCollapseButton &&
          commentCollapseButton.textContent.includes("收起评论")
        )
          commentCollapseButton.click();
        // 再去收起回答
        rightButton = rightButton.querySelector(
          ".ContentItem-rightButton[data-zop-retract-question]",
        );
        if (rightButton) rightButton.click();
      } else {
        // 固定在回答底部的 [收起回答]（此时正在浏览回答内容 [尾部区域]）

        let answerCollapseButton_ = false;
        for (let el of document.querySelectorAll(
          ".ContentItem-rightButton[data-zop-retract-question]",
        )) {
          // 遍历所有回答底部的 [收起] 按钮
          if (isElementInViewport(el)) {
            // 判断该 [收起] 按钮是否在可视区域内
            // 固定的 [收起评论]（先看看是否展开评论，即存在 [收起评论] 按钮）
            let commentCollapseButton = el.parentNode.querySelector(
              "button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type",
            );
            // 如果展开了评论，就收起评论
            //if (commentCollapseButton && commentCollapseButton.textContent.includes('收起评论')) commentCollapseButton.click();
            if (
              commentCollapseButton &&
              commentCollapseButton.textContent.includes("收起评论")
            ) {
              commentCollapseButton.click();
              if (!isElementInViewport(commentCollapseButton))
                scrollTo(0, el.offsetTop + 50);
            }
            el.click(); // 再去收起回答
            answerCollapseButton_ = true; // 如果找到并点击收起了，就没必要执行下面的代码了（可视区域中没有 [收起回答] 时）
            break;
          }
        }
        // 针对完全看不到 [收起回答] 按钮时（如 [头部区域]，以及部分明明很长却不显示悬浮横条的回答）
        if (!answerCollapseButton_) {
          for (let el of document.querySelectorAll(
            ".List-item, .Card.AnswerCard, .Card.TopstoryItem",
          )) {
            // 遍历所有回答主体元素
            if (isElementInViewport_(el)) {
              // 判断该回答是否在可视区域内
              // 固定的 [收起评论]（先看看是否展开评论，即存在 [收起评论] 按钮）
              let commentCollapseButton = el.querySelector(
                "button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type",
              );
              // 如果展开了评论，就收起评论
              if (
                commentCollapseButton &&
                commentCollapseButton.textContent.includes("收起评论")
              ) {
                commentCollapseButton.click();
                if (!isElementInViewport(commentCollapseButton))
                  scrollTo(0, el.offsetTop + 50);
              }
              let answerCollapseButton__ = el.querySelector(
                ".ContentItem-rightButton[data-zop-retract-question]",
              );
              if (answerCollapseButton__) answerCollapseButton__.click(); // 再去收起回答
              break;
            }
          }
        }
      }

      // 下面这段只针对 [收起评论]（如果展开了的话）
      let commentCollapseButton_ = false,
        commentCollapseButton__ = false;
      // 悬浮的 [收起评论]（此时正在浏览评论内容 [中间区域]）
      let commentCollapseButton = getXpath(
        '//button[text()="收起评论"]',
        document.querySelector(".Comments-container"),
      );
      if (commentCollapseButton) {
        commentCollapseButton.click();
      } else {
        // 固定的 [收起评论]（此时正在浏览评论内容 [头部区域]）
        let commentCollapseButton_1 = document.querySelectorAll(
          ".ContentItem-actions > button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type, .ContentItem-action > button.Button.Button--plain.Button--withIcon.Button--withLabel:first-of-type",
        );
        if (commentCollapseButton_1.length > 0) {
          for (let el of commentCollapseButton_1) {
            if (el.textContent.includes("收起评论")) {
              if (isElementInViewport(el)) {
                el.click();
                commentCollapseButton_ = true; // 如果找到并点击了，就没必要执行下面的代码了（可视区域中没有 [收起评论] 时）
                break;
              }
            }
          }
        }
        if (commentCollapseButton_ == false) {
          // 可视区域中没有 [收起评论] 时（此时正在浏览评论内容 [头部区域] + [尾部区域](不上不下的，既看不到固定的 [收起评论] 又看不到悬浮的 [收起评论])），需要判断可视区域中是否存在评论元素
          let commentCollapseButton_1 = document.querySelectorAll(
            ".Comments-container",
          );
          if (commentCollapseButton_1.length > 0) {
            for (let el of commentCollapseButton_1) {
              if (isElementInViewport(el)) {
                let parentElement =
                  el.closest(".List-item") ||
                  el.closest(".Card");
                if (!parentElement) continue;
                let commentCollapseButton = parentElement.querySelector(
                  ".ContentItem-actions > button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type",
                );
                if (
                  commentCollapseButton &&
                  commentCollapseButton.textContent.includes("收起评论")
                ) {
                  commentCollapseButton.click();
                  if (!isElementInViewport(commentCollapseButton)) {
                    scrollTo(
                      0,
                      parentElement.offsetTop + parentElement.offsetHeight - 50,
                    );
                  }
                  commentCollapseButton__ = true; // 如果找到并点击了，就没必要执行下面的代码了（可视区域中没有 评论元素 时）
                  break;
                }
              }
            }
          }
          if (commentCollapseButton__ == false) {
            // 如果上面的都没找到，那么就尝试寻找评论末尾的 [评论回复框]
            let commentCollapseButton_2 =
              document.querySelectorAll(".Editable-content");
            if (commentCollapseButton_2.length > 0) {
              for (let el of commentCollapseButton_2) {
                if (isElementInViewport(el)) {
                  let parentElement =
                    el.closest(".List-item") ||
                    el.closest(".Card");
                  if (!parentElement) continue;
                  let commentCollapseButton = parentElement.querySelector(
                    ".ContentItem-actions > button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type",
                  );
                  if (
                    commentCollapseButton &&
                    commentCollapseButton.textContent.includes("收起评论")
                  ) {
                    commentCollapseButton.click();
                    if (!isElementInViewport(commentCollapseButton)) {
                      scrollTo(
                        0,
                        parentElement.offsetTop +
                          parentElement.offsetHeight -
                          50,
                      );
                    }
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }
  };
}

// 回到顶部（监听点击事件，鼠标右键点击网页两侧空白处）
function backToTop(selectors) {
  if (!menu_value("menu_backToTop")) return;
  const el = document.querySelector(selectors);
  if (!el) return;
  el.oncontextmenu = function (event) {
    if (isClickOnSideBlank(event, this)) {
      event.preventDefault();
      window.scrollTo(0, 0);
    }
  };
}

/**
 * 创建内容过滤器 — 统一处理 初始扫描 + URL变化重扫 + MutationObserver 监听新节点
 *
 * @param {Object} opts
 * @param {string} opts.selector    - 目标元素 CSS 选择器 (querySelectorAll 用)
 * @param {string} opts.className   - MutationObserver 中匹配新增节点的 className (精确匹配)
 * @param {Function} opts.processItem - (element) => void，对每个匹配元素执行的处理函数
 * @param {Function} [opts.initialScan] - 可选：自定义初始扫描逻辑，替代默认的 querySelectorAll
 */
function createContentFilter({ selector, className, processItem, initialScan }) {
  // 初始扫描
  function scanNow() {
    if (initialScan) {
      initialScan();
    } else {
      document.querySelectorAll(selector).forEach(processItem);
    }
  }

  scanNow();

  // URL 变化后重新扫描
  UrlChangeManager.add(function () {
    setTimeout(scanNow, 1000);
  });

  // 监听动态插入的新节点
  GlobalObserver.add(function (mutationsList) {
    for (const mutation of mutationsList) {
      for (const target of mutation.addedNodes) {
        if (target.nodeType != 1) continue;
        if (target.className === className) {
          processItem(target);
        }
      }
    }
  });
}

function blockLowCount(type) {
  switch (type) {
    case "index":
      blockLowCount_(
        ".Card.TopstoryItem.TopstoryItem-isRecommend",
        "Card TopstoryItem TopstoryItem-isRecommend",
        "menu_blockLowUpvoteCount",
        "menu_blockLowCommentCount",
      );
      break;
    case "follow":
      blockLowCount_(
        ".Card.TopstoryItem.TopstoryItem-isFollow",
        "Card TopstoryItem TopstoryItem-isFollow",
        "menu_blockLowUpvoteCountFollow",
        "menu_blockLowCommentCountFollow",
      );
      break;
    case "question":
      blockLowCount_(
        ".List-item",
        "List-item",
        "menu_blockLowUpvoteCountQuestion",
        "menu_blockLowCommentCountQuestion",
      );
      break;
  }

  function blockLowCount_(selector, className, menuUpvote, menuComment) {
    // 阈值读一次，避免 observer 热路径里每个 item 重复读 GM 存储
    const upvoteMin = GM_getValue(menuUpvote),
      commentMin = GM_getValue(menuComment);
    createContentFilter({
      selector,
      className,
      processItem: function (item) {
        blockLowCount_1(item, upvoteMin, "upvote_num");
        blockLowCount_1(item, commentMin, "comment_num");
      },
    });
  }

  function blockLowCount_1(item, min, type) {
    if (min) {
      let item_ContentItem = item.querySelector(".ContentItem");
      if (item_ContentItem && item_ContentItem.dataset.zaExtraModule) {
        let item2;
        try {
          item2 = JSON.parse(item_ContentItem.dataset.zaExtraModule);
        } catch (e) {
          return;
        }
        if (
          item2 &&
          item2.card.content &&
          Number(item2.card.content[type]) < Number(min)
        ) {
          item.hidden = true;
          item.style.display = "none";
        }
      }
    }
  }
}

function customBlockUsers() {
  let nowBlockUsers = "";
  menu_value("menu_customBlockUsers").forEach(function (item) {
    nowBlockUsers += "|" + item;
  });
  let newBlockUsers = prompt(
    '编辑 [自定义屏蔽用户]\n（不同用户名之间使用 "|" 分隔，例如：用户A|用户B|用户C ）',
    nowBlockUsers.slice(1),
  );
  if (newBlockUsers === "") {
    GM_setValue("menu_customBlockUsers", []);
    refreshMenu(); // 重新注册脚本菜单
  } else if (newBlockUsers != null) {
    GM_setValue("menu_customBlockUsers", newBlockUsers.split("|"));
    refreshMenu(); // 重新注册脚本菜单
  }
}

// 屏蔽指定用户
function blockUsers(type) {
  if (!menu_value("menu_blockUsers")) return;
  if (
    !menu_value("menu_customBlockUsers") ||
    menu_value("menu_customBlockUsers").length < 1
  )
    return;
  // 屏蔽列表读一次，避免 observer 热路径里每个 item 重复读 GM 存储
  // （修改列表后本来就需要刷新页面生效，缓存不会过期）
  const users = menu_value("menu_customBlockUsers");

  // dataset.zop 是 JSON，直接解析取 authorName，
  // 避免字符串拼接匹配对键序/转义的脆弱假设
  function isBlockedAuthor(contentItem) {
    const zop = contentItem.dataset.zop;
    if (!zop) return false;
    try {
      return users.includes(JSON.parse(zop).authorName);
    } catch (e) {
      return false;
    }
  }

  switch (type) {
    case "index":
      blockUsers_(
        ".Card.TopstoryItem.TopstoryItem-isRecommend",
        "Card TopstoryItem TopstoryItem-isRecommend",
      );
      break;
    case "follow":
      blockUsers_(
        ".Card.TopstoryItem.TopstoryItem-isFollow",
        "Card TopstoryItem TopstoryItem-isFollow",
      );
      break;
    case "question":
      blockUsers_question();
      break;
    case "search":
      blockUsers_search();
      break;
    case "topic":
      blockUsers_(".List-item.TopicFeedItem", "List-item TopicFeedItem");
      break;
    case "people":
      blockUsers_button_people(); // 添加屏蔽用户按钮（用户主页）
      break;
  }
  blockUsers_comment(); //       评论区
  blockUsers_button(); //        加入黑名单按钮（用户信息悬浮框中）

  function blockUsers_(selector, className) {
    createContentFilter({
      selector,
      className,
      processItem: function (container) {
        let item = container.querySelector(
          ".ContentItem.AnswerItem, .ContentItem.ArticleItem",
        );
        if (item && isBlockedAuthor(item)) {
          container.hidden = true;
        }
      },
    });
  }

  function blockUsers_question() {
    const blockUsers_question_ = (mutationsList) => {
      for (const mutation of mutationsList) {
        for (const target of mutation.addedNodes) {
          if (target.nodeType != 1) continue;
          if (
            target.className === "List-item" ||
            target.className === "Card AnswerCard"
          ) {
            let item1 = target.querySelector(".ContentItem.AnswerItem");
            if (item1 && isBlockedAuthor(item1)) {
              target.hidden = true;
            }
          }
        }
      }
    };

    const blockUsers_question_answer_ = (mutationsList) => {
      for (const mutation of mutationsList) {
        for (const target of mutation.addedNodes) {
          if (target.nodeType != 1) continue;
          target
            .querySelectorAll(".List-item, .Card.AnswerCard")
            .forEach(function (item) {
              let item1 = item.querySelector(".ContentItem.AnswerItem");
              if (item1 && isBlockedAuthor(item1)) {
                item.hidden = true;
              }
            });
        }
      }
    };

    if (location.pathname.includes("/answer/")) {
      // 回答页（就是只有三个回答的页面）
      GlobalObserver.add(blockUsers_question_answer_);
    } else {
      // 问题页（可以显示所有回答的页面）
      GlobalObserver.add(blockUsers_question_);
    }

    // 针对的是打开网页后直接加载的前面几个回答（上面哪些是针对动态加载的回答）
    document
      .querySelectorAll(".List-item, .Card.AnswerCard")
      .forEach(function (item) {
        let item1 = item.querySelector(".ContentItem.AnswerItem");
        if (item1 && isBlockedAuthor(item1)) {
          item.hidden = true;
        }
      });
  }

  function blockUsers_search() {
    function blockUsers_now() {
      if (location.search.includes("type=content") === false) return; // 目前只支持搜索页的 [综合]
      document
        .querySelectorAll(
          '.Card.SearchResult-Card[data-za-detail-view-path-module="AnswerItem"], .Card.SearchResult-Card[data-za-detail-view-path-module="PostItem"]',
        )
        .forEach(function (item1) {
          let item = item1.querySelector(
            ".RichText.ztext.CopyrightRichText-richText b",
          ); // 用户名所在元素
          if (item && item.textContent !== "" && users.includes(item.textContent)) {
            // 找到就删除该信息流
            item1.hidden = true;
          }
        });
    }

    setTimeout(blockUsers_now, 2000);
    UrlChangeManager.add(function () {
      setTimeout(blockUsers_now, 1000); // 网页 URL 变化后再次执行
    });

    const callback = (mutationsList) => {
      if (location.search.includes("type=content") === false) return; // 目前只支持搜索页的 [综合]
      for (const mutation of mutationsList) {
        for (const target of mutation.addedNodes) {
          if (target.nodeType != 1) continue;
          let item = target.querySelector(
            '.Card.SearchResult-Card[data-za-detail-view-path-module="AnswerItem"] .RichText.ztext.CopyrightRichText-richText b, .Card.SearchResult-Card[data-za-detail-view-path-module="PostItem"] .RichText.ztext.CopyrightRichText-richText b',
          );
          if (item && item.textContent !== "" && users.includes(item.textContent)) {
            // 找到就删除该信息流
            target.hidden = true;
          }
        }
      }
    };
    GlobalObserver.add(callback);
  }

  function blockUsers_comment() {
    const callback = (mutationsList) => {
      for (const mutation of mutationsList) {
        for (const target of mutation.addedNodes) {
          if (target.nodeType != 1) continue;
          if (
            target.tagName == "DIV" &&
            target.className.indexOf("css-") == 0 &&
            target.dataset.id == undefined
          ) {
            let item = target.querySelector(
              'a[href^="https://www.zhihu.com/people/"]>img.Avatar[alt][loading]',
            );
            if (item && users.includes(item.alt)) {
              // 找到就删除该评论
              item.parentElement.parentElement.parentElement.parentElement.style.display =
                "none";
            }
          }
        }
      }
    };
    GlobalObserver.add(callback);
  }

  // 添加屏蔽用户按钮（用户信息悬浮框中）
  function blockUsers_button() {
    const callback = (mutationsList) => {
      for (const mutation of mutationsList) {
        for (const target of mutation.addedNodes) {
          if (target.nodeType != 1) continue;
          if (
            target.tagName == "DIV" &&
            target.className &&
            (target.className.indexOf("css-") == 0 ||
              target.style.cssText === "opacity: 1;")
          ) {
            const item = target.querySelector(
                ".MemberButtonGroup.ProfileButtonGroup.HoverCard-buttons",
              ),
              item1 = target.querySelector(
                "img.Avatar+div span.UserLink>a.UserLink-link[data-za-detail-view-element_name=User]",
              );
            if (item1) {
              const name = item1.textContent,
                userid = item1.href.split("/")[4];
              for (let num = 0; num < users.length; num++) {
                // 判断是否已存在
                if (users[num] === name) {
                  // 已存在
                  target
                    .querySelectorAll(".Button.Button--primary.Button--red")
                    .forEach(function (item) {
                      item.style.display = "none";
                    }); // 隐藏知乎自带的已屏蔽按钮
                  item.insertAdjacentHTML(
                    "afterbegin",
                    `<button type="button" data-name="${escapeHtml(name)}" data-userid="${escapeHtml(userid)}" class="Button FollowButton Button--primary Button--red"><span style="display: inline-flex; align-items: center;">​<svg width="1.2em" height="1.2em" viewBox="0 0 24 24" class="Zi Zi--Ban" fill="currentColor"><path fill-rule="evenodd" d="M16.346 18.113a7.5 7.5 0 0 1-10.46-10.46l10.46 10.46Zm1.767-1.767L7.654 5.886a7.5 7.5 0 0 1 10.46 10.46ZM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z" clip-rule="evenodd"></path></svg></span> 已屏蔽</button>`,
                  );
                  item.firstElementChild.onclick = function () {
                    this.disabled = true;
                    blockUsers_button_del(
                      this.dataset.name,
                      this.dataset.userid,
                      false,
                    );
                  };
                  return;
                }
              }
              if (
                item &&
                !target.querySelector("button[data-name][data-userid]")
              ) {
                item.insertAdjacentHTML(
                  "beforeend",
                  `<button type="button" data-name="${escapeHtml(name)}" data-userid="${escapeHtml(userid)}" class="Button FollowButton Button--primary Button--red" style="width: 100%;margin: 7px 0 0 0;"><span style="display: inline-flex; align-items: center;">​<svg width="1.2em" height="1.2em" viewBox="0 0 24 24" class="Zi Zi--Ban" fill="currentColor"><path fill-rule="evenodd" d="M16.346 18.113a7.5 7.5 0 0 1-10.46-10.46l10.46 10.46Zm1.767-1.767L7.654 5.886a7.5 7.5 0 0 1 10.46 10.46ZM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z" clip-rule="evenodd"></path></svg></span> 屏蔽用户</button>`,
                );
                item.lastElementChild.onclick = function () {
                  this.disabled = true;
                  blockUsers_button_add(
                    this.dataset.name,
                    this.dataset.userid,
                    false,
                  );
                };
              }
            }
          }
        }
      }
    };
    GlobalObserver.add(callback);
  }

  // 添加屏蔽用户按钮（用户主页）
  function blockUsers_button_people() {
    let item = document.querySelector(
        ".MemberButtonGroup.ProfileButtonGroup.ProfileHeader-buttons",
      ), // 获取按钮元素位置
      name = document.querySelector(".ProfileHeader-name").firstChild
        .textContent, // 获取用户名
      users = menu_value("menu_customBlockUsers"), // 读取屏蔽列表
      userid = location.href.split("/")[4];
    for (let num = 0; num < users.length; num++) {
      // 判断是否已存在
      if (users[num] === name) {
        // 已存在
        document
          .querySelectorAll(".Button.Button--primary.Button--red")
          .forEach(function (item) {
            item.style.display = "none";
          }); // 隐藏知乎自带的已屏蔽按钮
        item.insertAdjacentHTML(
          "afterbegin",
          `<button type="button" data-name="${escapeHtml(name)}" data-userid="${escapeHtml(userid)}" class="Button FollowButton Button--primary Button--red" style="margin: 0 0 0 12px;"><span style="display: inline-flex; align-items: center;">​<svg width="1.2em" height="1.2em" viewBox="0 0 24 24" class="Zi Zi--Ban" fill="currentColor"><path fill-rule="evenodd" d="M16.346 18.113a7.5 7.5 0 0 1-10.46-10.46l10.46 10.46Zm1.767-1.767L7.654 5.886a7.5 7.5 0 0 1 10.46 10.46ZM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z" clip-rule="evenodd"></path></svg></span> 已屏蔽</button>`,
        );
        item.firstElementChild.onclick = function () {
          this.disabled = true;
          blockUsers_button_del(this.dataset.name, this.dataset.userid, true);
        };
        return;
      }
    }
    if (item) {
      item.insertAdjacentHTML(
        "beforeend",
        `<button type="button" data-name="${escapeHtml(name)}" data-userid="${escapeHtml(userid)}" class="Button FollowButton Button--primary Button--red" style="margin: 0 0 0 12px;"><span style="display: inline-flex; align-items: center;">​<svg width="1.2em" height="1.2em" viewBox="0 0 24 24" class="Zi Zi--Ban" fill="currentColor"><path fill-rule="evenodd" d="M16.346 18.113a7.5 7.5 0 0 1-10.46-10.46l10.46 10.46Zm1.767-1.767L7.654 5.886a7.5 7.5 0 0 1 10.46 10.46ZM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z" clip-rule="evenodd"></path></svg></span> 屏蔽用户</button>`,
      );
      item.lastElementChild.onclick = function () {
        this.disabled = true;
        blockUsers_button_add(this.dataset.name, this.dataset.userid, true);
      };
    }
  }

  // 屏蔽用户按钮绑定事件（添加）
  function blockUsers_button_add(name, userid, reload) {
    if (!name || !userid) return;
    if (!/^[\w-]+$/.test(userid)) return;
    let users = menu_value("menu_customBlockUsers"), // 读取屏蔽列表
      index = users.indexOf(name);
    if (index === -1) {
      users.push(name); // 追加用户名
      GM_setValue("menu_customBlockUsers", users); // 写入屏蔽列表
      // 加入知乎自带的黑名单（和本脚本互补~
      GM_xmlhttpRequest({
        url: `https://www.zhihu.com/api/v4/members/${userid}/actions/block`,
        method: "POST",
        timeout: 2000,
      });
      // 是否刷新本页
      if (reload) {
        setTimeout(function () {
          location.reload();
        }, 200); // 刷新网页，延迟 200 毫秒，避免知乎反应慢~
      } else {
        GM_notification({
          text: `该用户已被屏蔽~\n刷新网页后生效~`,
          timeout: 3000,
        });
      }
    } else {
      GM_notification({
        text: `该用户已经被屏蔽啦，无需重复屏蔽~`,
        timeout: 3000,
      });
    }
  }

  // 屏蔽用户按钮绑定事件（删除）
  function blockUsers_button_del(name, userid, reload) {
    if (!name || !userid) return;
    if (!/^[\w-]+$/.test(userid)) return;
    let users = menu_value("menu_customBlockUsers"), // 读取屏蔽列表
      index = users.indexOf(name);
    if (index > -1) {
      users.splice(index, 1); // 移除用户名
      GM_setValue("menu_customBlockUsers", users); // 写入屏蔽列表
      // 移除知乎自带的黑名单
      GM_xmlhttpRequest({
        url: `https://www.zhihu.com/api/v4/members/${userid}/actions/block`,
        method: "DELETE",
        timeout: 2000,
      });
      // 是否刷新本页
      if (reload) {
        setTimeout(function () {
          location.reload();
        }, 200); // 刷新网页，延迟 200 毫秒，避免知乎反应慢~
      } else {
        GM_notification({
          text: `该用户已取消屏蔽啦~\n刷新网页后生效~`,
          timeout: 3000,
        });
      }
    } else {
      GM_notification({ text: `没有在屏蔽列表中找到该用户...`, timeout: 3000 });
    }
  }
}

// 缓存最近一次选中的文字，避免从右键脚本菜单回调中取不到当前选区

var selectedTextForBlockKeywords = "";
// 规范化屏蔽词文本：压缩多余空白并去掉首尾空格
function normalizeBlockKeywordText(text) {
  return (text || "").replace(/\s+/g, " ").trim();
}

// 读取当前选中的文字，兼容输入框和普通页面选区
function getSelectedBlockKeywordText() {
  let text = "";
  const activeElement = document.activeElement;
  if (
    activeElement &&
    (activeElement.tagName === "TEXTAREA" ||
      (activeElement.tagName === "INPUT" &&
        /^(?:text|search|url|tel|password)$/i.test(activeElement.type))) &&
    typeof activeElement.selectionStart === "number"
  ) {
    text = activeElement.value.slice(
      activeElement.selectionStart,
      activeElement.selectionEnd,
    );
  }
  if (!text && window.getSelection) {
    text = window.getSelection().toString();
  }
  return normalizeBlockKeywordText(text);
}

// 记录最近一次选中的文字，供右键脚本菜单 [添加选中文字到屏蔽词] 使用
function rememberSelectedBlockKeyword() {
  const updateSelectedBlockKeyword = function () {
    selectedTextForBlockKeywords = getSelectedBlockKeywordText();
  };
  document.addEventListener("selectionchange", updateSelectedBlockKeyword);
  document.addEventListener("contextmenu", updateSelectedBlockKeyword, true);
  UrlChangeManager.add(function () {
    selectedTextForBlockKeywords = "";
  });
}

// 将当前选中的文字直接加入 [自定义屏蔽关键词] 列表
function addSelectedKeywordToBlocklist() {
  if (!menu_value("menu_blockKeywords")) {
    GM_notification({ text: "请先开启 [屏蔽指定关键词] 功能~", timeout: 3000 });
    return;
  }

  const keyword = getSelectedBlockKeywordText() || selectedTextForBlockKeywords;
  if (!keyword) {
    GM_notification({
      text: "未检测到选中的文字，请先选中内容后再使用该菜单~",
      timeout: 3000,
    });
    return;
  }

  let keywords = (GM_getValue("menu_customBlockKeywords") || [])
    .map(function (item) {
      return normalizeBlockKeywordText(item);
    })
    .filter(function (item) {
      return item !== "";
    });
  if (
    keywords.some(function (item) {
      return item.toLowerCase() === keyword.toLowerCase();
    })
  ) {
    GM_notification({
      text: `屏蔽词 [${keyword}] 已存在，无需重复添加~`,
      timeout: 3000,
    });
    return;
  }

  keywords.push(keyword);
  GM_setValue("menu_customBlockKeywords", keywords);
  refreshMenu(); // 同步刷新缓存的菜单值
  GM_notification({
    text: `已添加屏蔽词 [${keyword}]\n后续加载的标题/评论会按该关键词过滤~`,
    timeout: 4000,
  });
}

// 自定义屏蔽关键词（标题）
function customBlockKeywords() {
  let nowBlockKeywords = "";
  menu_value("menu_customBlockKeywords").forEach(function (item) {
    nowBlockKeywords += "|" + item;
  });
  let newBlockKeywords = prompt(
    '编辑 [自定义屏蔽关键词]\n（不同关键词之间使用 "|" 分隔，例如：关键词A|关键词B|关键词C \n（关键词不区分大小写，支持表情如：[捂脸]|[飙泪笑]',
    nowBlockKeywords.slice(1),
  );
  if (newBlockKeywords === "") {
    GM_setValue("menu_customBlockKeywords", []);
    refreshMenu(); // 重新注册脚本菜单
  } else if (newBlockKeywords != null) {
    GM_setValue("menu_customBlockKeywords", newBlockKeywords.split("|"));
    refreshMenu(); // 重新注册脚本菜单
  }
}

// 屏蔽指定关键词
function blockKeywords(type) {
  if (!menu_value("menu_blockKeywords")) return;
  if (
    !menu_value("menu_customBlockKeywords") ||
    menu_value("menu_customBlockKeywords").length < 1
  )
    return;
  // 关键词读一次并预小写，避免 observer 热路径里每个 item 重复读 GM 存储
  // （修改关键词后本来就需要刷新页面生效，缓存不会过期）
  const keywordsLower = menu_value("menu_customBlockKeywords")
    .filter(function (k) {
      return k !== "";
    })
    .map(function (k) {
      return k.toLowerCase();
    });
  switch (type) {
    case "index":
      blockKeywords_(
        ".Card.TopstoryItem.TopstoryItem-isRecommend",
        "Card TopstoryItem TopstoryItem-isRecommend",
      );
      break;
    case "follow":
      blockKeywords_(
        ".Card.TopstoryItem.TopstoryItem-isFollow",
        "Card TopstoryItem TopstoryItem-isFollow",
      );
      break;
    case "topic":
      blockKeywords_(".List-item.TopicFeedItem", "List-item TopicFeedItem");
      break;
    case "people":
      blockKeywords_(".List-item", "List-item");
      break;
    case "collection":
      blockKeywords_(
        ".Card.CollectionDetailPageItem",
        "Card CollectionDetailPageItem",
      );
      break;
    case "search":
      blockKeywords_search();
      break;
    case "comment":
      if (!menu_value("menu_blockKeywordsComment")) return; // 如果 [屏蔽关键词 - 评论区] 未启用则跳过
      blockKeywords_comment();
      break;
  }

  function blockKeywords_(selector, className) {
    var titleCSS = 'h2.ContentItem-title meta[itemprop="name"], meta[itemprop="headline"]';
    createContentFilter({
      selector,
      className,
      processItem: function (item) {
        blockKeywords_1(item, titleCSS);
      },
      initialScan: function () {
        if (location.pathname === "/hot") {
          document.querySelectorAll(".HotItem").forEach(function (item1) {
            blockKeywords_1(item1, "h2.HotItem-title");
          });
        } else {
          document.querySelectorAll(selector).forEach(function (item1) {
            blockKeywords_1(item1, titleCSS);
          });
        }
      },
    });
  }

  function blockKeywords_search() {
    function blockKeywords_now() {
      if (location.search.includes("type=content") === false) return; // 目前只支持搜索页的 [综合]
      document
        .querySelectorAll(
          '.HotLanding-contentItem, .Card.SearchResult-Card[data-za-detail-view-path-module="AnswerItem"], .Card.SearchResult-Card[data-za-detail-view-path-module="PostItem"]',
        )
        .forEach(function (item1) {
          blockKeywords_1(item1, "a[data-za-detail-view-id]");
        });
    }

    setTimeout(blockKeywords_now, 2000);
    UrlChangeManager.add(function () {
      setTimeout(blockKeywords_now, 1000); // 网页 URL 变化后再次执行
    });

    const callback = (mutationsList) => {
      if (location.search.includes("type=content") === false) return; // 目前只支持搜索页的 [综合]
      for (const mutation of mutationsList) {
        for (const target of mutation.addedNodes) {
          if (target.nodeType != 1) continue;
          if (target.tagName === "DIV" && target.className === "") {
            let tt = target.querySelector(
              'div[class="Card SearchResult-Card"][data-za-detail-view-path-module="AnswerItem"], div[class="Card SearchResult-Card"][data-za-detail-view-path-module="PostItem"]',
            );
            if (tt) {
              blockKeywords_1(tt, "a[data-za-detail-view-id]");
            }
          }
        }
      }
    };
    GlobalObserver.add(callback);
  }

  function blockKeywords_comment() {
    function filterComment(comment) {
      let content = comment.querySelector(".CommentContent"); // 寻找评论文字所在元素
      if (!content) return;
      let text = content.textContent.toLowerCase(); // 全部转为小写（用来不区分大小写）
      content.querySelectorAll("img.sticker[alt]").forEach((img) => {
        text += img.alt.toLowerCase();
      }); // 将评论中的表情添加到待遍历的评论文字中

      for (const keyword of keywordsLower) {
        // 遍历关键词黑名单
        if (text.indexOf(keyword) > -1) {
          // 找到就删除该评论
          let originalNodes = Array.from(content.childNodes).map((n) =>
            n.cloneNode(true),
          );
          content.onclick = (e) => {
            if (
              e.target === content &&
              content.textContent === "[该评论已屏蔽，可点击显示]"
            ) {
              content.textContent = "";
              originalNodes.forEach((n) => content.appendChild(n));
              content.onclick = null;
            }
          };
          content.textContent = "[该评论已屏蔽，可点击显示]";
          // 必须停止匹配：此时 childNodes 已是占位符，
          // 再命中会把占位符当原文 clone，原评论无法恢复
          break;
        }
      }
    }

    const callback = (mutationsList) => {
      for (const mutation of mutationsList) {
        for (const target of mutation.addedNodes) {
          if (target.nodeType != 1) continue;
          if (
            target.tagName == "DIV" &&
            target.className.indexOf("css-") == 0 &&
            target.dataset.id == undefined
          ) {
            let item = target.querySelector(
              'a[href^="https://www.zhihu.com/people/"]>img.Avatar[alt][loading]',
            );
            if (item) {
              filterComment(
                item.parentElement.parentElement.parentElement.parentElement,
              );
            }
          }

          /*if (target.tagName == 'DIV' && target.dataset.id !== undefined) {
                        for (const node of target.querySelectorAll('*')) {
                            if (node.className === 'CommentItemV2-metaSibling') filterComment(node);
                        }
                    }*/
        }
      }
    };
    GlobalObserver.add(callback);
  }

  function blockKeywords_1(item1, css) {
    let item = item1.querySelector(css); // 标题所在元素
    if (item) {
      let text = (item.content || item.textContent).toLowerCase();
      for (const keyword of keywordsLower) {
        // 遍历关键词黑名单
        if (text.indexOf(keyword) > -1) {
          // 找到就删除该信息流
          item1.hidden = true;
          item1.style.display = "none";
          break;
        }
      }
    }
  }
}

// 屏蔽指定类别（视频/文章等）

function blockType(type) {
  let name;
  // 一开始加载的信息流 + 添加标签样式
  if (type === "search") {
    // 搜索页
    if (
      !menu_value("menu_blockTypeVideo") &&
      !menu_value("menu_blockTypeArticle") &&
      !menu_value("menu_blockTypePin") &&
      !menu_value("menu_blockTypeTopic") &&
      !menu_value("menu_blockTypeSearch")
    )
      return;
    if (menu_value("menu_blockTypeSearch") && location.pathname === "/search")
      setTimeout(function () {
        document.querySelectorAll(".RelevantQuery").forEach((r) => {
          r.parentElement.parentElement.hidden = true;
        });
      }, 2000);
    name =
      "h2.ContentItem-title a:not(.zhihu_e_toQuestion), a.KfeCollection-PcCollegeCard-link, h2.SearchTopicHeader-Title a";
    addSetInterval_(name);
  } else if (type === "question") {
    // 问题页
    if (!menu_value("menu_blockTypeVideo")) return;
    document.head.appendChild(
      document.createElement("style"),
    ).textContent =
      `.VideoAnswerPlayer, .VideoAnswerPlayer video, .VideoAnswerPlayer-video, .VideoAnswerPlayer-iframe {display: none !important;}`;
    name = ".VideoAnswerPlayer";
    document.querySelectorAll(name).forEach(function (item) {
      blockType_(item);
    });
  } else if (type === "follow") {
    // 首页 - 关注
    if (
      !menu_value("menu_blockTypeFollowAgree") &&
      !menu_value("menu_blockTypeFollowQuestion")
    )
      return;
    if (menu_value("menu_blockTypeFollowAgree"))
      name = ".TopstoryItem-isFollow .FeedSource-byline"; // 赞同了XX
    if (menu_value("menu_blockTypeFollowQuestion")) {
      if (name) {
        name +=
          ",.ContentItem[data-za-detail-view-path-module=QuestionItem]:not(.AnswerItem):not(.PinItem)";
      } else {
        name =
          ".ContentItem[data-za-detail-view-path-module=QuestionItem]:not(.AnswerItem):not(.PinItem)";
      }
    } // 关注了XX
    if (!name) return;
    document.querySelectorAll(name).forEach(function (item) {
      blockType_(item);
    });
  } else {
    // 首页
    if (
      !menu_value("menu_blockTypeVideo") &&
      !menu_value("menu_blockTypeArticle") &&
      !menu_value("menu_blockTypePin")
    )
      return;
    if (menu_value("menu_blockTypeVideo"))
      document.head.appendChild(
        document.createElement("style"),
      ).textContent =
        `.Card .ZVideoItem-video, .VideoAnswerPlayer video, nav.TopstoryTabs > a[aria-controls="Topstory-zvideo"] {display: none !important;}`;
    name = "h2.ContentItem-title a:not(.zhihu_e_toQuestion)";
    if (menu_value("menu_blockTypePin"))
      name =
        "h2.ContentItem-title a:not(.zhihu_e_toQuestion), .ContentItem.PinItem";
    document.querySelectorAll(name).forEach(function (item) {
      blockType_(item);
    });
  }

  // 后续加载的信息流
  GlobalObserver.add((mutationsList) => {
    for (const mutation of mutationsList) {
      for (const target of mutation.addedNodes) {
        if (target.nodeType != 1) continue;
        if (
          target.className === "Card SearchResult-Card" &&
          target.dataset.zaDetailViewPathModule === undefined
        ) {
          // 移除相关搜索
          if (
            menu_value("menu_blockTypeSearch") &&
            location.pathname === "/search" &&
            location.search.includes("type=content")
          )
            target.hidden = true;
        } else {
          blockType_(target.querySelector(name));
        }
      }
    }
  });

  UrlChangeManager.add(function () {
    addSetInterval_(name);
    // 移除相关搜索
    if (
      menu_value("menu_blockTypeSearch") &&
      location.pathname === "/search" &&
      location.search.includes("type=content")
    )
      setTimeout(function () {
        document.querySelectorAll(".RelevantQuery").forEach((r) => {
          r.parentElement.parentElement.hidden = true;
        });
      }, 1500);
  });

  function blockType_(titleA) {
    if (!titleA) return; // 判断是否为真
    if (location.pathname === "/search") {
      // 搜索页
      if (location.search.includes("type=content") === false) return; //   仅限搜索页的 [综合]
      if (
        titleA.href.includes("/zvideo/") ||
        titleA.href.includes("video.zhihu.com")
      ) {
        // 如果是视频
        if (menu_value("menu_blockTypeVideo"))
          titleA.closest(".Card").remove();
      } else if (titleA.href.includes("zhuanlan.zhihu.com")) {
        // 如果是文章
        if (menu_value("menu_blockTypeArticle"))
          titleA.closest(".Card.SearchResult-Card").hidden = true;
      } else if (titleA.href.includes("/topic/")) {
        //            如果是话题
        if (menu_value("menu_blockTypeTopic"))
          titleA.closest(".Card.SearchResult-Card").hidden = true;
      } else if (titleA.href.includes("/market/")) {
        //           如果是杂志文章等乱七八糟的
        if (menu_value("menu_blockTypeSearch"))
          titleA.closest(".Card.SearchResult-Card").hidden = true;
      }
    } else if (location.pathname.includes("/question/")) {
      // 问题页
      if (menu_value("menu_blockTypeVideo"))
        titleA.closest(".List-item").hidden = true;
    } else if (location.pathname.includes("/follow")) {
      // 首页 - 关注
      if (type === "follow") {
        if (
          (menu_value("menu_blockTypeFollowAgree") &&
            titleA.className.includes("FeedSource-byline")) ||
          (menu_value("menu_blockTypeFollowQuestion") &&
            titleA.dataset.zaDetailViewPathModule == "QuestionItem")
        )
          titleA.closest(".Card.TopstoryItem.TopstoryItem-isFollow").hidden = true; // 赞同了XX + 关注了XX
      }
      if (
        titleA.className == "ContentItem PinItem" &&
        menu_value("menu_blockTypePin")
      )
        titleA.closest(".Card.TopstoryItem.TopstoryItem-isFollow").hidden = true; // 如果是想法
    } else {
      // 首页
      if (titleA.className == "ContentItem PinItem") {
        // 如果是想法（针对无标题）
        if (menu_value("menu_blockTypePin"))
          titleA.closest(".Card.TopstoryItem.TopstoryItem-isRecommend").hidden = true;
      } else if (
        titleA.href.includes("/zvideo/") ||
        titleA.href.includes("video.zhihu.com")
      ) {
        // 如果是视频
        if (menu_value("menu_blockTypeVideo")) {
          titleA.closest(".Card.TopstoryItem.TopstoryItem-isRecommend").hidden = true;
        }
      } else if (titleA.href.includes("/answer/")) {
        //           如果是问题（视频回答）
        if (
          titleA.closest(".ContentItem.AnswerItem").querySelector(
            ".VideoAnswerPlayer",
          )
        ) {
          if (menu_value("menu_blockTypeVideo")) {
            titleA.closest(".Card.TopstoryItem.TopstoryItem-isRecommend").hidden = true;
            titleA.closest(".ContentItem.AnswerItem").remove();
          }
        }
      } else if (titleA.href.includes("/education/video-course/")) {
        // 如果是视频课程
        if (menu_value("menu_blockTypeVideo")) {
          titleA.closest(".Card.TopstoryItem.TopstoryItem-isRecommend").hidden = true;
        }
      } else if (titleA.href.includes("zhuanlan.zhihu.com")) {
        // 如果是文章
        if (menu_value("menu_blockTypeArticle"))
          titleA.closest(".Card.TopstoryItem.TopstoryItem-isRecommend").hidden = true;
      }
    }
  }

  let pendingHandler = null;
  function addSetInterval_(A) {
    // URL 变化会重新进入，先移除上一个未命中的 handler，避免累积
    if (pendingHandler) {
      GlobalObserver.remove(pendingHandler);
      pendingHandler = null;
    }
    let aTag = document.querySelectorAll(A);
    if (aTag.length > 0) {
      aTag.forEach(function (item) {
        blockType_(item);
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
}

// 寻找父元素

function blockYanXuan() {
  if (!menu_value("menu_blockYanXuan")) return;
  const blockYanXuan_question = (mutationsList) => {
    for (const mutation of mutationsList) {
      for (const target of mutation.addedNodes) {
        if (target.nodeType != 1) continue;
        if (
          target.className === "List-item" ||
          target.className === "Card AnswerCard"
        ) {
          if (
            target.querySelector(
              ".KfeCollection-AnswerTopCard-Container, .KfeCollection-PurchaseBtn",
            )
          ) {
            target.hidden = true;
          }
        }
      }
    }
  };

  const blockYanXuan_question_answer = (mutationsList) => {
    for (const mutation of mutationsList) {
      for (const target of mutation.addedNodes) {
        if (target.nodeType != 1) continue;
        target
          .querySelectorAll(".List-item, .Card.AnswerCard")
          .forEach(function (item) {
            if (
              item.querySelector(
                ".KfeCollection-AnswerTopCard-Container, .KfeCollection-PurchaseBtn",
              )
            ) {
              item.hidden = true;
            }
          });
      }
    }
  };

  if (location.pathname.includes("/answer/")) {
    // 回答页（就是只有三个回答的页面）
    GlobalObserver.add(blockYanXuan_question_answer);
  } else {
    // 问题页（可以显示所有回答的页面）
    GlobalObserver.add(blockYanXuan_question);
  }

  // 针对的是打开网页后直接加载的前面几个回答（上面哪些是针对动态加载的回答）
  document
    .querySelectorAll(".List-item, .Card.AnswerCard")
    .forEach(function (item) {
      if (
        item.querySelector(
          ".KfeCollection-AnswerTopCard-Container, .KfeCollection-PurchaseBtn",
        )
      ) {
        item.hidden = true;
      }
    });
}

// 区分问题文章

function blockHotOther() {
  if (!menu_value("menu_blockTypeLiveHot")) return;

  const isQuestionItem = (hotItem) => {
    const linkItem = hotItem.querySelector(".HotItem-content a");
    if (linkItem === null) return false;
    return /\/question\/\d+/.test(linkItem.href);
  };

  const block = () => {
    removeLiveItems();
    fixItemRank();
  };

  // 移除非问题的内容
  const removeLiveItems = () => {
    const hotItems = document.querySelectorAll(".HotList-list .HotItem");
    for (const item of hotItems) {
      if (!isQuestionItem(item)) item.remove();
    }
  };

  // 修复排行榜序号
  const fixItemRank = () => {
    const hotItems = document.querySelectorAll(
      ".HotList-list .HotItem:not([hidden])",
    );
    hotItems.forEach((item, index) => {
      const rank = item.querySelector(".HotItem-index .HotItem-rank");
      if (rank !== null) rank.innerText = index + 1;
    });
  };

  const blockLive_content = (mutationsList) => {
    for (const mutation of mutationsList) {
      for (const target of mutation.addedNodes) {
        if (target.nodeType != 1) continue;
        if (target.classList.contains("HotItem")) {
          block();
        }
      }
    }
  };

  GlobalObserver.add(blockLive_content);

  // 初始移除
  block();
}

// 将关注/推荐/热榜/专栏的选项去掉默认的点击事件改成静态链接（针对首页互相切换（知乎这里切换是动态加载的），为了避免功能交叉混乱
// 针对所有页面

function cleanHighlightLink() {
  if (!menu_value("menu_cleanHighlightLink")) return;
  const callback = (mutationsList) => {
    for (const mutation of mutationsList) {
      for (const target of mutation.addedNodes) {
        if (target.nodeType != 1 || target.tagName != "A") continue;
        if (
          target.dataset.zaNotTrackLink &&
          target.href.includes("https://zhida.zhihu.com/search?")
        ) {
          target.parentElement.replaceWith(target.textContent);
        }
      }
    }
  };
  GlobalObserver.add(callback);

  // 针对的是打开网页后直接加载的前面几个回答（上面哪些是针对动态加载的回答）
  document
    .querySelectorAll(
      'span > a[data-za-not-track-link][href^="https://zhida.zhihu.com/search?"]',
    )
    .forEach((e) => e.parentElement.replaceWith(e.textContent));
}

// 屏蔽盐选内容

function removeLogin() {
  const removeLoginModal = (mutationsList) => {
    for (const mutation of mutationsList) {
      for (const target of mutation.addedNodes) {
        if (target.nodeType != 1) continue;
        // 登录弹窗容器都是 DIV，粗筛掉其他节点，避免每节点跑 XPath
        if (target.tagName !== "DIV") continue;
        if (target.querySelector(".signFlowModal")) {
          let button = target.querySelector(
            ".Button.Modal-closeButton.Button--plain",
          );
          if (button) button.click();
        } else if (getXpath('//button[text()="立即登录/注册"]', target)) {
          target.remove();
        }
      }
    }
  };

  // 检查是否登录
  function isLoggedIn() {
    if (location.hostname === "zhuanlan.zhihu.com") {
      return !!document.querySelector(".ColumnPageHeader-profile>.AppHeader-menu");
    }
    return !!document.querySelector(".AppHeader-profile>.AppHeader-menu");
  }

  // 未登录时才会监听并移除登录弹窗
  if (!isLoggedIn()) {
    GlobalObserver.add(removeLoginModal);
    const loginButton = getXpath('//button[text()="登录/注册"]');
    if (loginButton) {
      loginButton.outerHTML =
        '<a class="Button AppHeader-login Button--blue" href="https://www.zhihu.com/signin" target="_blank">登录/注册</a>';
    }
    if (location.hostname !== "zhuanlan.zhihu.com") {
      // 屏蔽问题页中间的登录提示
      document.head.appendChild(
        document.createElement("style"),
      ).textContent =
        ".Question-mainColumnLogin, button.AppHeader-login {display: none !important;}";
    }
  }
}

// 净化标题消息

function cleanTitles() {
  if (!menu_value("menu_cleanTitles")) return;

  // 方案一
  const elTitle = document.head.querySelector("title");
  const original = elTitle.textContent;
  const observer = new MutationObserver(function () {
    if (elTitle.textContent != original) {
      // 避免重复执行
      elTitle.textContent = original;
    }
  });
  observer.observe(elTitle, { childList: true });

}

// 净化搜索热门

function cleanSearch() {
  if (!menu_value("menu_cleanSearch")) return;

  const el = document.querySelector(".SearchBar-input > input");
  const observer = new MutationObserver((mutationsList) => {
    if (
      mutationsList[0].attributeName === "placeholder" &&
      mutationsList[0].target.placeholder != ""
    )
      mutationsList[0].target.placeholder = "";
  });
  el.placeholder = "";
  observer.observe(el, { attributes: true });
  document.head.appendChild(
    document.createElement("style"),
  ).textContent =
    '.AutoComplete-group > .SearchBar-label:not(.SearchBar-label--history), .AutoComplete-group > [id^="AutoComplete2-topSearch-"], .AutoComplete-group > [id^="AutoComplete3-topSearch-"] {display: none !important;}';
}

// 快捷关闭悬浮评论（监听点击事件，点击网页两侧空白处）

function closeFloatingComments() {
  document.addEventListener("click", function (e) {
    const button = document.querySelector('button[aria-label="关闭"]');
    if (!button) return;
    const overlay = button.parentElement?.parentElement;
    if (overlay && (e.target === overlay || e.target.parentElement === overlay)) {
      button.click();
    }
  }, true);
}

// 自定义 urlchange 事件（用来监听 URL 变化）

function topTime_processItem(_this, classs) {
  let t = _this.querySelector(".ContentItem-time");
  if (!t) return;
  if (
    !t.classList.contains("full") &&
    t.querySelector("a") &&
    t.querySelector("a").textContent != null
  ) {
    topTime_allTime(t);
    topTime_publishTop(t, _this, classs);
  }
}

// 完整显示时间 + 置顶显示时间 - 文章
function topTime_post() {
  let t = document.querySelector(".ContentItem-time:not(.xiu-time)");
  if (!t) return;
  // 完整显示时间
  if (
    t.textContent.includes("编辑于") &&
    !t.classList.contains("xiu-time")
  ) {
    let tt = t.textContent;
    t.click();
    t.textContent = t.textContent + " ，" + tt;
    t.classList.add("xiu-time");
  }

  // 置顶显示时间
  if (
    menu_value("menu_publishTop") &&
    !document.querySelector(".Post-Header > .ContentItem-time") &&
    !document.querySelector(".ContentItem-meta > .ContentItem-time")
  ) {
    let temp_time = t.cloneNode(true);
    temp_time.style.padding = "0px";
    document
      .querySelector(".Post-Header")
      .insertAdjacentElement("beforeEnd", temp_time);
  }
}

// 完整显示时间
function topTime_allTime(t) {
  if (
    t.textContent.includes("发布于") &&
    t.textContent.includes("编辑于") === false
  ) {
    t.querySelector("a").textContent = t.querySelector("a").dataset.tooltip;
    t.classList.add("full");
  } else if (
    t.textContent.includes("发布于") === false &&
    t.textContent.includes("编辑于")
  ) {
    t.querySelector("a").textContent =
      t.querySelector("a").dataset.tooltip +
      " ，" +
      t.querySelector("a").textContent;
    t.classList.add("full");
  }
}

// 置顶显示时间
function topTime_publishTop(t, _this, _class) {
  if (!menu_value("menu_publishTop")) return;
  if (!t.parentNode.classList.contains(_class)) {
    let temp_time = t.cloneNode(true);
    temp_time.style.padding = "0px";
    // 对于较短的回答，隐藏回答底部的时间
    if (_this.offsetHeight < 600) t.style.display = "none";
    _this
      .querySelector("." + _class)
      .insertAdjacentElement("beforeEnd", temp_time);
  }
}

// 问题创建时间
function question_time() {
  if (
    !document.querySelector(
      ".QuestionPage .QuestionHeader-side .QuestionTime-xiu",
    )
  ) {
    document
      .querySelector(".QuestionPage .QuestionHeader-side")
      .insertAdjacentHTML(
        "beforeEnd",
        '<div class="QuestionTime-xiu" style="color: #9098ac; margin-top: 5px; font-size: 13px; font-style: italic;"><p>创建时间：' +
          getUTC8(
            new Date(
              document.querySelector(
                ".QuestionPage > meta[itemprop=dateCreated]",
              ).content,
            ),
          ) +
          "</p><p>最后编辑：" +
          getUTC8(
            new Date(
              document.querySelector(
                ".QuestionPage > meta[itemprop=dateModified]",
              ).content,
            ),
          ) +
          "</p></div>",
      );
  }
}

// UTC+8 北京时间格式化
var _utc8Formatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
  year: "numeric", month: "2-digit", day: "2-digit",
  hour: "2-digit", minute: "2-digit", second: "2-digit",
  hour12: false,
});
function getUTC8(t) {
  return _utc8Formatter.format(t).replace(/\//g, "-");
}

function createIncrementalTopTimeHandler(css, classs) {
  return function (mutations) {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        if (node.matches?.(css)) topTime_processItem(node, classs);
        const items = node.querySelectorAll?.(css);
        if (items) for (const item of items) topTime_processItem(item, classs);
      }
    }
  };
}

function setOriginalPic(img) {
  if (img.dataset.originalXiu) return;
  img.src =
    "https://" +
    img.dataset.original.split("/")[2] +
    "/" +
    img.dataset.originalToken +
    ".webp";
  img.dataset.originalXiu = "true";
}

function originalPic() {
  document
    .querySelectorAll(
      "img[data-original][data-original-token][data-lazy-status]:not([data-original-xiu]):not(.comment_sticker):not(.Avatar)",
    )
    .forEach(setOriginalPic);
}

const PIC_SEL = "img[data-original][data-original-token][data-lazy-status]:not([data-original-xiu]):not(.comment_sticker):not(.Avatar)";

function processAddedPics(node) {
  if (node.nodeType !== Node.ELEMENT_NODE) return;
  if (node.matches?.(PIC_SEL)) setOriginalPic(node);
  const imgs = node.querySelectorAll?.(PIC_SEL);
  if (imgs) for (const img of imgs) setOriginalPic(img);
}

// 默认站外直链，修改自：https://greasyfork.org/scripts/402808（从 JQuery 改为原生 JavaScript，且精简、优化了代码）

function setDirectLink(a) {
  a.href = decodeURIComponent(
    a.href.substring(a.href.indexOf("link.zhihu.com/?target=") + 23),
  );
}

function directLink() {
  document
    .querySelectorAll(
      'a.external[href*="link.zhihu.com/?target="], a.LinkCard[href*="link.zhihu.com/?target="]:not(.MCNLinkCard):not(.ZVideoLinkCard):not(.ADLinkCardContainer)',
    )
    .forEach(setDirectLink);
}

const LINK_SEL = 'a.external[href*="link.zhihu.com/?target="], a.LinkCard[href*="link.zhihu.com/?target="]:not(.MCNLinkCard):not(.ZVideoLinkCard):not(.ADLinkCardContainer)';

function processAddedLinks(node) {
  if (node.nodeType !== Node.ELEMENT_NODE) return;
  if (node.matches?.(LINK_SEL)) setDirectLink(node);
  const links = node.querySelectorAll?.(LINK_SEL);
  if (links) for (const link of links) setDirectLink(link);
}

// 默认折叠邀请，修改自：https://greasyfork.org/scripts/402808（从 JQuery 改为原生 JavaScript，且精简、优化了代码）

function question_author() {
  try {
    if (
      document.querySelector(
        ".BrandQuestionSymbol, .QuestionAuthor, .SpecialQuestionAuthor",
      )
    )
      return;
    let qJson = JSON.parse(
        document.querySelector("#js-initialData").textContent,
      ).initialState.entities.questions[/\d+/.exec(location.pathname)[0]]
        .author,
      html = `<div class="BrandQuestionSymbol"><a class="BrandQuestionSymbol-brandLink" href="/people/${escapeHtml(qJson.urlToken)}"><img role="presentation" src="${escapeHtml(qJson.avatarUrl)}" class="BrandQuestionSymbol-logo" alt=""><span class="BrandQuestionSymbol-name">${escapeHtml(qJson.name)}</span></a><div class="BrandQuestionSymbol-divider" style="margin-left: 5px;margin-right: 10px;"></div></div>`;
    //html = `<div class="QuestionAuthor"><div class="AuthorInfo AuthorInfo--plain" itemprop="author" itemscope="" itemtype="http://schema.org/Person"><div class="AuthorInfo"><span class="UserLink AuthorInfo-avatarWrapper"><div class="Popover"><div id="Popover18-toggle" aria-haspopup="true" aria-expanded="false" aria-owns="Popover18-content"><a class="UserLink-link" data-za-detail-view-element_name="User" target="_blank" href="${qJson.urlToken}"><img class="Avatar AuthorInfo-avatar" width="24" height="24" src="${qJson.avatarUrl}"></a></div></div></span><div class="AuthorInfo-content"><div class="AuthorInfo-head"><span class="UserLink AuthorInfo-name"><div class="Popover"><div id="Popover19-toggle" aria-haspopup="true" aria-expanded="false" aria-owns="Popover19-content"><a class="UserLink-link" data-za-detail-view-element_name="User" target="_blank" href="${qJson.urlToken}">${qJson.name}</a></div></div></span></div></div></div></div></div>`
    document
      .querySelector(".QuestionHeader-topics")
      .insertAdjacentHTML("beforebegin", html);
    //document.querySelector('.QuestionPage h1.QuestionHeader-title').insertAdjacentHTML('afterend', html);
  } catch (e) {
    console.warn("question_author error:", e);
  }
}

// [完整显示时间 + 置顶显示时间] 功能修改自：https://greasyfork.org/scripts/402808（从 JQuery 改为原生 JavaScript，且精简、优化了代码）
// 完整显示时间 + 置顶显示时间

function questionRichTextMore() {
  if (!menu_value("menu_questionRichTextMore")) return;
  let button = document.querySelector("button.QuestionRichText-more");
  if (button) button.click();
}

// 移除登录弹窗

function questionInvitation() {
  var _qiHandler = function () {
    let q = document.querySelector(".QuestionInvitation-content");
    if (!q) return;
    GlobalObserver.remove(_qiHandler);
    q.style.display = "none";
    const titleEl = document.querySelector(".QuestionInvitation-title");
    titleEl.textContent = titleEl.textContent;
    const toggleSpan = document.createElement("span");
    toggleSpan.style.cssText = "cursor: pointer; font-size: 14px; color: #919aae;";
    toggleSpan.textContent = " 展开/折叠";
    titleEl.appendChild(toggleSpan);
    document.querySelector(".Topbar").onclick = function () {
      let q = document.querySelector(".QuestionInvitation-content");
      if (q.style.display == "none") {
        q.style.display = "";
      } else {
        q.style.display = "none";
      }
    };
  };
  GlobalObserver.add(_qiHandler);
}

// 屏蔽热榜杂项

function addTypeTips() {
  if (!menu_value("menu_typeTips")) return;
  let style = `font-weight: bold;font-size: 13px;padding: 1px 4px 0;border-radius: 2px;display: inline-block;vertical-align: top;margin: ${location.pathname === "/search" ? "2" : "4"}px 4px 0 0;`;
  document.body.appendChild(document.createElement("style")).textContent =
    `/* 区分问题文章 */
.AnswerItem .ContentItem-title a:not(.zhihu_e_toQuestion)::before {content:'问题';color: #f68b83;background-color: #f68b8333;${style}}
/* 针对的是部分搜索词下搜索页开头的 "最新讨论" 之类的非常规元素 */
.HotLanding-contentItem .ContentItem[data-za-detail-view-path-module=Content] .ContentItem-title a:not(.zhihu_e_toQuestion)::before {content:'问题';color: #f68b83;background-color: #f68b8333;${style}}
.TopstoryQuestionAskItem .ContentItem-title a:not(.zhihu_e_toQuestion)::before {content:'问题';color: #ff5a4e;background-color: #ff5a4e33;${style}}
.ZVideoItem .ContentItem-title a::before, .ZvideoItem .ContentItem-title a::before {content:'视频';color: #00BCD4;background-color: #00BCD433;${style}}
.PinItem .ContentItem-title a::before {content:'想法';color: #4CAF50;background-color: #4CAF5033;${style}}
.ArticleItem .ContentItem-title a::before {content:'文章';color: #2196F3;background-color: #2196F333;${style}}`;
}

// 直达问题按钮
function addToQuestion() {
  if (!menu_value("menu_toQuestion")) return;

  // 一开始加载的信息流 + 添加按钮样式
  if (location.pathname === "/search") {
    document.head.appendChild(
      document.createElement("style"),
    ).textContent =
      `a.zhihu_e_toQuestion {font-size: 13px !important;font-weight: normal !important;padding: 1px 6px 0 !important;border-radius: 2px !important;display: inline-block !important;vertical-align: top !important;height: 20.67px !important;line-height: 20.67px !important;margin-top: 2px !important;}`;
    addSetInterval_("h2.ContentItem-title a:not(.zhihu_e_tips)");
  } else {
    document.head.appendChild(
      document.createElement("style"),
    ).textContent =
      `a.zhihu_e_toQuestion {font-size: 13px !important;font-weight: normal !important;padding: 1px 6px 0 !important;border-radius: 2px !important;display: inline-block !important;vertical-align: top !important;margin-top: 4px !important;}`;
    document
      .querySelectorAll("h2.ContentItem-title a:not(.zhihu_e_tips)")
      .forEach(function (item) {
        addTypeTips_(item);
      });
  }

  // 后续加载的信息流
  GlobalObserver.add((mutationsList) => {
    for (const mutation of mutationsList) {
      for (const target of mutation.addedNodes) {
        if (target.nodeType != 1) continue;
        addTypeTips_(
          target.querySelector("h2.ContentItem-title a:not(.zhihu_e_tips)"),
        );
      }
    }
  });

  UrlChangeManager.add(function () {
    addSetInterval_("h2.ContentItem-title a:not(.zhihu_e_tips)");
  });

  function addTypeTips_(titleA) {
    if (!titleA) return; // 判断是否为真
    if (titleA.parentElement.querySelector("a.zhihu_e_toQuestion")) return; // 判断是否已添加
    if (titleA.textContent.includes("?")) {
      // 把问题末尾英文问好 [?] 的替换为中文问好 [？]，这样按钮与标题之间的间距就刚刚好~
      titleA.innerHTML = titleA.innerHTML.replace("?", "？");
    }
    if (/answer\/\d+/.test(titleA.href)) {
      //  如果是指向回答的问题（而非指向纯问题的链接）
      const titleA_meta = titleA.parentElement.parentElement.querySelector(
        'meta[itemprop="url"]',
      ); // 获取该问题页地址
      if (!titleA_meta) return; // 判断元素是否存在（针对的是部分搜索词下搜索页开头的 "最新讨论" 之类的非常规元素）
      titleA.insertAdjacentHTML(
        "afterend",
        `<a class="zhihu_e_toQuestion VoteButton" href="${escapeHtml(titleA_meta.content)}" target="_blank">直达问题</a>`,
      );
    }
  }

  let pendingHandler = null;
  function addSetInterval_(A) {
    // URL 变化会重新进入，先移除上一个未命中的 handler，避免累积
    if (pendingHandler) {
      GlobalObserver.remove(pendingHandler);
      pendingHandler = null;
    }
    let aTag = document.querySelectorAll(A);
    if (aTag.length > 0) {
      aTag.forEach(function (item) {
        addTypeTips_(item);
      });
      return;
    }
    var _handler = function () {
      let aTag = document.querySelectorAll(A);
      if (aTag.length > 0) {
        GlobalObserver.remove(_handler);
        if (pendingHandler === _handler) pendingHandler = null;
        aTag.forEach(function (item) {
          addTypeTips_(item);
        });
      }
    };
    pendingHandler = _handler;
    GlobalObserver.add(_handler);
  }
}

// 展开问题描述

function switchHome() {
  document.querySelectorAll("header.AppHeader nav").forEach((a) => {
    a.outerHTML = a.outerHTML;
  });
}
// 针对首页几个页面
function switchHomeRecommend() {
  document
    .querySelectorAll(
      'header.AppHeader nav>a:not([target])[href="https://www.zhihu.com/"]',
    )
    .forEach((a) => {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        document.cookie =
          "tst=r; expires=Thu, 18 Dec 2099 12:00:00 GMT; domain=.zhihu.com; path=/";
        location.href = this.href;
        return false;
      });
    });
}

var menu_ALL = [
    { key: "menu_defaultCollapsedAnswer", label: "默认收起回答", tips: "默认收起回答", default: true, type: "toggle" },
    { key: "menu_collapsedAnswer", label: "一键收起回答/评论", tips: "一键收起回答/评论", default: true, type: "toggle" },
    { key: "menu_collapsedNowAnswer", label: "快捷收起回答/评论 (点击两侧空白处)", tips: "快捷收起回答/评论", default: true, type: "toggle" },
    { key: "menu_backToTop", label: "快捷回到顶部 (右键两侧空白处)", tips: "快捷回到顶部", default: true, type: "toggle" },
    {
      key: "menu_blockLowCount", label: "屏蔽低赞低评",
      tips: "设置要屏蔽 低于多少赞同/评价 的回答/文章（默认不需要留空即可）\n（例如设置 0 则无人赞同/评价的回答/文章会被屏蔽\n（例如设置 20 则赞同/评价数量低于 20 的回答/文章会被屏蔽\n（修改后，后续加载的回答/文章会立即生效，但不影响当前网页已有内容",
      type: "group",
      children: [
        { key: "menu_blockLowUpvoteCount", label: "最低赞同数 [首页]", default: "", inputType: "text" },
        { key: "menu_blockLowCommentCount", label: "最低评价数 [首页]", default: "", inputType: "text" },
        { key: "menu_blockLowUpvoteCountQuestion", label: "最低赞同数 [问题页]", default: "", inputType: "text" },
        { key: "menu_blockLowCommentCountQuestion", label: "最低评价数 [问题页]", default: "", inputType: "text" },
        { key: "menu_blockLowUpvoteCountFollow", label: "最低赞同数 [关注页]", default: "", inputType: "text" },
        { key: "menu_blockLowCommentCountFollow", label: "最低评价数 [关注页]", default: "", inputType: "text" },
      ],
    },
    { key: "menu_blockUsers", label: "屏蔽指定用户", tips: "屏蔽指定用户", default: true, type: "toggle" },
    {
      key: "menu_customBlockUsers", label: "自定义屏蔽用户", tips: "自定义屏蔽用户",
      default: ["故事档案局","盐选推荐","盐选科普","盐选成长计划","知乎盐选会员","知乎盐选创作者","盐选心理","盐选健康必修课","盐选奇妙物语","盐选生活馆","盐选职场","盐选文学甄选","盐选作者小管家","盐选博物馆","盐选点金","盐选测评室","盐选科技前沿","盐选会员精品"],
      type: "action", action: function () { customBlockUsers(); },
      visibleWhen: "menu_blockUsers",
    },
    { key: "menu_blockKeywords", label: "屏蔽指定关键词", tips: "屏蔽指定关键词", default: true, type: "toggle" },
    {
      key: "menu_blockKeywordsComment", label: "屏蔽关键词 - 评论区", tips: "屏蔽关键词 - 评论区", default: true,
      type: "toggle", visibleWhen: "menu_blockKeywords",
    },
    {
      key: "menu_customBlockKeywords", label: "自定义屏蔽关键词", tips: "自定义屏蔽关键词", default: [],
      type: "action", action: function () { customBlockKeywords(); },
      visibleWhen: "menu_blockKeywords",
    },
    {
      key: "menu_addSelectedBlockKeywords", label: "添加选中文字到屏蔽词 ↑", tips: "添加选中文字到屏蔽词", default: [],
      type: "action", action: function () { addSelectedKeywordToBlocklist(); },
      visibleWhen: "menu_blockKeywords",
    },
    {
      key: "menu_blockType", label: "屏蔽指定类别 (视频/文章等)",
      tips: "勾选 = 屏蔽该类别的信息流",
      type: "group",
      children: [
        { key: "menu_blockTypeVideo", label: "视频 [首页、搜索页、问题页、关注页]", default: true },
        { key: "menu_blockTypeArticle", label: "文章 [首页、搜索页、关注页]", default: false },
        { key: "menu_blockTypePin", label: "想法 [首页、关注页]", default: false },
        { key: "menu_blockTypeFollowAgree", label: "赞同了XX [关注页]", default: false },
        { key: "menu_blockTypeFollowQuestion", label: "关注了XX [关注页]", default: false },
        { key: "menu_blockTypeTopic", label: "话题 [搜索页]", default: false },
        { key: "menu_blockTypeSearch", label: "杂志文章、盐选专栏、相关搜索等 [搜索页]", default: false },
        { key: "menu_blockYanXuan", label: "盐选内容 [问题页]", default: false },
        { key: "menu_blockTypeLiveHot", label: "热榜文章、直播、广告等 [热榜]", default: true },
      ],
    },
    { key: "menu_cleanHighlightLink", label: "移除高亮链接 (高亮的文字链接)", tips: "移除高亮链接", default: true, type: "toggle" },
    { key: "menu_cleanSearch", label: "净化搜索热门 (默认搜索词及热门搜索)", tips: "净化搜索热门", default: false, type: "toggle" },
    { key: "menu_cleanTitles", label: "净化标题消息 (标题中的私信/消息)", tips: "净化标题提醒", default: false, type: "toggle" },
    { key: "menu_questionRichTextMore", label: "展开问题描述", tips: "展开问题描述", default: false, type: "toggle" },
    { key: "menu_publishTop", label: "置顶显示时间", tips: "置顶显示时间", default: true, type: "toggle" },
    { key: "menu_typeTips", label: "区分问题文章", tips: "区分问题文章", default: true, type: "toggle" },
    { key: "menu_toQuestion", label: "直达问题按钮", tips: "直达问题按钮", default: true, type: "toggle" },
  ],
  menu_ID = [];
initMenuValues(menu_ALL);
setMenuRegistrar(registerMenuCommand);
registerMenuCommand();

// 注册脚本菜单
function registerMenuCommand() {
  for (let i = 0; i < menu_ID.length; i++) {
    GM_unregisterMenuCommand(menu_ID[i]);
  }
  menu_ID = [];

  for (const item of menu_ALL) {
    // 条件显示：visibleWhen 指定的菜单项必须为 true
    if (item.visibleWhen && !GM_getValue(item.visibleWhen)) continue;

    if (item.type === "group") {
      menu_ID.push(GM_registerMenuCommand(`#️⃣ ${item.label}`, function () {
        menu_setting(item.label, item.tips, item.children);
      }));
    } else if (item.type === "action") {
      menu_ID.push(GM_registerMenuCommand(`#️⃣ ${item.label}`, item.action));
    } else if (item.type === "toggle") {
      let val = GM_getValue(item.key);
      menu_ID.push(GM_registerMenuCommand(
        `${val ? "✅" : "❌"} ${item.label}`,
        function () { menu_switch(`${GM_getValue(item.key)}`, item.key, item.tips); },
      ));
    }
  }

  menu_ID.push(GM_registerMenuCommand("💬 反馈 & 建议", function () {
    window.GM_openInTab("https://github.com/XIU2/UserScript#xiu2userscript", { active: true, insert: true, setParent: true });
    window.GM_openInTab("https://greasyfork.org/zh-CN/scripts/419081/feedback", { active: true, insert: true, setParent: true });
  }));
}

// 菜单开关
function menu_switch(menu_status, Name, Tips) {
  if (menu_status == "true") {
    GM_setValue(`${Name}`, false);
    GM_notification({
      text: `已关闭 [${Tips}] 功能\n（点击刷新网页后生效）`,
      timeout: 3500,
      onclick: function () {
        location.reload();
      },
    });
  } else {
    GM_setValue(`${Name}`, true);
    GM_notification({
      text: `已开启 [${Tips}] 功能\n（点击刷新网页后生效）`,
      timeout: 3500,
      onclick: function () {
        location.reload();
      },
    });
  }
  registerMenuCommand(); // 重新注册脚本菜单
}

// ========== 主入口 ==========

(function () {
  if (window.onurlchange === undefined) {
    addUrlChangeEvent();
  }
  rememberSelectedBlockKeyword();

  removeLogin();
  cleanTitles();

  if (
    GM_info.scriptHandler === "Violentmonkey" ||
    (GM_info.scriptHandler === "Tampermonkey" &&
      parseFloat(GM_info.version.slice(0, 4)) >= 4.18)
  ) {
    setTimeout(start, 200);
  } else {
    start();
  }

  function start() {
    switchHome();
    cleanHighlightLink();
    originalPic();
    directLink();
    GlobalObserver.add(function (mutations) {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          processAddedPics(node);
          processAddedLinks(node);
        }
      }
    });
    if (location.hostname != "zhuanlan.zhihu.com") {
      if (location.pathname.includes("/column/") === false) cleanSearch();
      collapsedAnswer();
    }
    closeFloatingComments();
    blockKeywords("comment");

    if (
      location.pathname.includes("question") &&
      location.href.includes("/log") === false
    ) {
      //       回答页 //
      if (location.pathname.includes("waiting") === false) {
        collapsedNowAnswer(".QuestionPage");
        collapsedNowAnswer(".Question-main");
        questionRichTextMore();
        if (location.pathname.includes("answer") === false) {
          blockLowCount("question");
        } else {
          document.querySelectorAll("div.Card.ViewAll>a").forEach((a) => {
            a.outerHTML = a.outerHTML;
          });
        }
        blockUsers("question");
        blockYanXuan();
        blockType("question");
        defaultCollapsedAnswer();
      }
      GlobalObserver.add(
        createIncrementalTopTimeHandler(".ContentItem.AnswerItem", "ContentItem-meta"),
      );
      setTimeout(function () {
        question_time();
        question_author();
      }, 100);
      questionInvitation();
    } else if (location.pathname === "/search") {
      //          搜索结果页 //
      collapsedNowAnswer("main div");
      collapsedNowAnswer(".Search-container");
      GlobalObserver.add(
        createIncrementalTopTimeHandler(
          ".ContentItem.AnswerItem, .ContentItem.ArticleItem",
          "SearchItem-meta",
        ),
      );
      addTypeTips();
      addToQuestion();
      blockUsers("search");
      blockKeywords("search");
      blockType("search");
    } else if (location.pathname.includes("/topic/")) {
      //   话题页 //
      if (
        location.pathname.includes("/hot") ||
        location.href.includes("/top-answers")
      ) {
        collapsedNowAnswer("main.App-main");
        GlobalObserver.add(
          createIncrementalTopTimeHandler(
            ".ContentItem.AnswerItem, .ContentItem.ArticleItem",
            "ContentItem-meta",
          ),
        );
        addTypeTips();
        addToQuestion();
        blockUsers("topic");
        blockKeywords("topic");
      }
    } else if (location.hostname === "zhuanlan.zhihu.com") {
      //    文章 //
      backToTop(".Post-content");
      backToTop(".Post-Row-Content");
      setTimeout(topTime_post, 300);
      blockUsers();
    } else if (location.pathname.includes("/column/")) {
      //    专栏 //
      setTimeout(function () {
        collapsedAnswer();
        collapsedNowAnswer("main div");
        GlobalObserver.add(
          createIncrementalTopTimeHandler(
            ".ContentItem.AnswerItem, .ContentItem.ArticleItem",
            "ContentItem-meta",
          ),
        );
        blockUsers();
      }, 300);
    } else if (
      location.pathname.includes("/people/") ||
      location.href.includes("org")
    ) {
      // 用户主页 //
      if (location.pathname.split("/").length === 3) {
        addTypeTips();
        addToQuestion();
      }
      collapsedNowAnswer("main div");
      collapsedNowAnswer(".Profile-main");
      GlobalObserver.add(
        createIncrementalTopTimeHandler(
          ".ContentItem.AnswerItem, .ContentItem.ArticleItem",
          "ContentItem-meta",
        ),
      );
      blockUsers("people");
      blockKeywords("people");
    } else if (location.pathname.includes("/collection/")) {
      // 收藏夹 //
      addTypeTips();
      addToQuestion();
      collapsedNowAnswer("main");
      collapsedNowAnswer(".CollectionsDetailPage");
      GlobalObserver.add(
        createIncrementalTopTimeHandler(
          ".ContentItem.AnswerItem, .ContentItem.ArticleItem",
          "ContentItem-meta",
        ),
      );
      blockKeywords("collection");
    } else if (location.pathname.includes("/pin/")) {
      // 想法 //
      backToTop("main[role=main]");
      GlobalObserver.add(
        createIncrementalTopTimeHandler(".ContentItem.PinItem", "ContentItem-meta"),
      );
    } else if (
      ["/", "/hot", "/follow", "/column-square", "/ring-feeds"].includes(
        location.pathname,
      )
    ) {
      //    首页 //
      switchHomeRecommend();
      let style = "";
      if (location.pathname !== "/column-square") {
        style += ".Topstory-container {min-height: 1500px;}";
      }
      if (menu_value("menu_blockTypeVideo")) {
        style += `.Card .ZVideoItem-video, nav.TopstoryTabs > a[aria-controls="Topstory-zvideo"] {display: none !important;}`;
      }
      if (style) {
        document.head.appendChild(
          document.createElement("style"),
        ).textContent = style;
      }

      collapsedNowAnswer("main div");
      collapsedNowAnswer(".Topstory-container");
      if (location.pathname !== "/column-square") {
        GlobalObserver.add(
          createIncrementalTopTimeHandler(".TopstoryItem", "ContentItem-meta"),
        );
        addTypeTips();
        addToQuestion();
        if (location.pathname == "/") {
          blockLowCount("index");
          blockUsers("index");
          blockKeywords("index");
          blockType();
        } else if (location.pathname == "/hot") {
          blockKeywords("index");
          blockHotOther();
        } else if (location.pathname == "/follow") {
          blockLowCount("follow");
          blockUsers("follow");
          blockKeywords("follow");
          blockType();
          blockType("follow");
        }
      }
    }
  }
})();
