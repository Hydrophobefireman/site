// ==UserScript==
// @name extra js
// @namespace    js
// @description stuff
// @downloadURL  https://pycode.tk/x/u.user.js
// @author       hpfm
// @match        *://*/*
// @grant        unsafeWindow
// @run-at       document-start
// @exclude *google.com/recaptcha/*
// ==/UserScript==
(() => {
  const ORIGIN = `https://hpfm.dev`;
  function __eval(text) {
    const scr = document.createElement("script");
    scr.text = text;
    document.head.appendChild(scr).remove();
  }
  function nextEvent(obj, event) {
    return new Promise((res) =>
      obj.addEventListener(event, res, {
        once: true,
      })
    );
  }
  const evt = {
    domain: location.host,
    attemptedConnections: [],
    apis: [],
    dynamicCode: [],
  };
  function applyLazyLoading() {
    [].slice
      .call(document.querySelectorAll("img"))
      .forEach((x) => (x.loading = "lazy"));
  }
  function patchMethods() {
    const formatter = Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    const oldFetch = globalThis.fetch.bind(globalThis);
    const oldXmlHTTPReq = globalThis.XMLHttpRequest.prototype.open;

    const { set: _set, ...imgProps } = Object.getOwnPropertyDescriptor(
      globalThis.Image.prototype,
      "src"
    );
    const oldEval = globalThis.eval;
    const { set: oldScriptSrc, ...oldScript } = Object.getOwnPropertyDescriptor(
      globalThis.HTMLScriptElement.prototype,
      "src"
    );
    const oldSW = globalThis.navigator.serviceWorker.register;
    const oldWS = globalThis.WebSocket;
    function push(data, type) {
      evt[type].push(
        Object.assign(data, {
          ts: formatter.format(+new Date()),
        })
      );
    }
    globalThis.eval = (code) => {
      push({ eval: true, code }, "dynamicCode");
      return oldEval(code);
    };

    globalThis.navigator.serviceWorker.register = function (url, ...opts) {
      push({ serviceWorker: true, url }, "apis");
      return oldSW.call(this, url, ...opts);
    };
    globalThis.XMLHttpRequest.prototype.open = function (method, url, ...args) {
      push({ method: "xhr", url }, "attemptedConnections");
      return oldXmlHTTPReq.call(this, method, url, ...args);
    };

    globalThis.fetch = function patchedFetch(url, ...args) {
      push({ method: "fetch", url }, "attemptedConnections");
      return oldFetch(url, ...args);
    };
    globalThis.WebSocket.prototype.constructor = function (url, ...a) {
      if (!(this instanceof globalThis.WebSocket)) return oldWS(url);
      push({ method: "WebSocket", url }, "apis");
      return new oldWS(url, ...a);
    };
    navigator.sendBeacon = (url) => {
      push({ method: "beacons", url }, "attemptedConnections");
    };
    Object.defineProperty(
      globalThis.HTMLScriptElement.prototype,
      "src",
      Object.assign(oldScript, {
        set(url) {
          push({ method: "dynamicScript", url }, "dynamicCode");
          return oldScriptSrc.call(this, url);
        },
      })
    );
    Object.defineProperty(
      globalThis.Image.prototype,
      "src",
      Object.assign(imgProps, {
        set(url) {
          push({ method: "img", url }, "attemptedConnections");
          return _set.call(this, url);
        },
      })
    );
  }
  function uiButton() {
    const b = Object.assign(document.createElement("button"), {
      textContent: "D",
    });
    Object.assign(b.style, {
      position: "fixed",
      bottom: "2px",
      left: "2px",
      padding: "4px",
      borderRadius: "20px",
      outline: "none",
      zIndex: 100000000,
    });
    b.addEventListener("click", () => createMenu(evt));
    const append = () => document.body.appendChild(b);
    try {
      append();
    } catch (e) {}
    document.addEventListener("DOMContentLoaded", append);
  }
  function registerCustomElement() {
    let template = document.createElement("template");
    const html =
      '<style>div[full]{color: #000; z-index: 100000000; font-family: "Open Sans", "Sans Serif"; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-align: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; position: fixed; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0, 0, 0, 0.61); padding: 16px;}div[header]{-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;}div[header]{font-weight: 700; user-select: none;}div[message], div[area]{-webkit-box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4); box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4); z-index: 100000000; background: #fff; border-radius: 8px; width: 100%; padding: 16px; max-width: 500px;}[clc]{display: inline-block;}[clc]:hover{background-color: #d2d2d2;}[clc]{-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; min-width: 60px; text-align: center; padding: 6px; cursor: pointer; border-radius: 8px; color: #4749e4;}.inp-x{border: 2px solid #e3e3e3; border-radius: 10px; padding: 4px; display: block; margin: auto;}</style><div full=""> <div area="" style="transform: translate3d(0px, 0px, 0px);"> <div header="" style=" text-align: center;">Details</div><div detail=""> Total Requests Captured: <span req-captured data-req=""></span> </div><div detail="">ServiceWorker: <span service-worker data-req=""></span></div><div detail=""> Dynamic Code Injected: <span dynamic-code data-req=""></span> </div><a style="text-decoration:none" clc send-button="" style=" display: block; text-align: left;" >Open JSON Reader</a ><span clc cancel-button="" style=" display: inline-block; text-align: left;" >Cancel</span > <div> <form action="javascript:"> <div style="margin: auto;text-align: center;">Execute JS</div><textarea class="inp-x"></textarea> <button style="border: 2px solid #e3e3e3;border-radius: 5px;background-color: white;display: block;margin: auto;" > Eval </button> </form> </div></div></div>';
    template.innerHTML = html;
    class DataEl extends HTMLElement {
      set data(d) {
        this.__data = d;
        this._render(d, this.url);
      }
      set url(u) {
        this.__url = u;

        this._render(this.__data, u);
      }
      constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(!0));
        shadowRoot.querySelector("span[cancel-button]").onclick = () =>
          this.remove();
        this._send = this.shadowRoot.querySelector("[send-button]");
        this._send.addEventListener("click", async () => {
          const url = this._send.dataset.href;
          window.open(url);
          const src = await nextEvent(window, "message");
          if (src.data === "init") src.source.postMessage(this.__data, "*");
        });
        const inp = this.shadowRoot.querySelector("textarea");
        this.shadowRoot
          .querySelector("form")
          .addEventListener("submit", () => __eval(inp.value));
      }
      _render(data) {
        if (this.__data) {
          const { attemptedConnections, apis, dynamicCode } = data;
          const attCon = attemptedConnections && attemptedConnections.length;
          const hasSw = apis && apis.some((x) => x.serviceWorker);
          const dyn = dynamicCode.length;
          const set = (k, v) =>
            (this.shadowRoot.querySelector(k).textContent = v);
          set("[req-captured]", attCon);
          set("[service-worker]", hasSw);
          set("[dynamic-code]", dyn);
        }
        if (this.__url) {
          const send = this._send;
          send.dataset.href = this.__url;
        }
      }
    }
    window.customElements.define("text-info", DataEl);
  }
  registerCustomElement();
  async function createMenu(evt) {
    const str = JSON.stringify(evt, null, 3);
    // const b64 = btoa(str);f
    const url = `${ORIGIN}/x/dl.html`;
    const el = document.createElement("text-info");
    el.data = evt;
    el.url = url;
    document.body.appendChild(el);
  }
  document.addEventListener("DOMContentLoaded", applyLazyLoading);
  patchMethods();
  uiButton();
})();
