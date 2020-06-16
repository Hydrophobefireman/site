const css = document.createElement("template");
css.innerHTML = `
<style>
.__replaced{margin-left:5px;cursor:pointer}
.obj-h{display:flex}
.json-key{opacity:1;cursor:pointer}
.json-key::after{content:":"}
.json-obj{flex-direction:column}
.json-obj::before{content:"{"}
.json-obj::after{content:"}"}
.json-val{opacity:1}
.array-opener{margin-left: 10px;margin-right: 10px;}
.is-array{display:inline;flex-direction:column}
/*.is-array::before{content:"["}
.is-array::after{content:"]"}
*/
</style>
`;
const arr = k =>
  Object.assign(document.createElement("div"), {
    className: "array-opener",
    textContent: k
  });
function buildJsonReader() {
  const assign = Object.assign;
  const _jsonColorScheme = {
    values: {
      numeric: "#b5cea8",
      keyWord: "#569cd6",
      string: "#ce9178"
    },
    keys: "#c586c0"
  };
  const _parseDat = (k, ik) => {
    const el = document.createElement("span");
    el.textContent = k;
    if (ik) {
      el.style.color = _jsonColorScheme.keys;
      lAdd(el);
      return el;
    }
    const v = _jsonColorScheme.values;
    switch (typeof k) {
      case "number":
        el.style.color = v.numeric;
        break;
      case "boolean":
        el.style.color = v.keyWord;
      default:
        el.style.color = v.string;
        break;
    }
    return el;
  };
  const lAdd = e =>
    e.addEventListener("click", t =>
      replace(t.target.parentElement.nextElementSibling)
    );
  function replace(e) {
    if (e.__replace) {
      return e.replaceWith(e.__replace);
    }
    //  if (e.firstChild.className !== "json-obj") return;
    const j = document.createElement("div");
    j.textContent = "{ ...";
    j.className = "__replaced";
    j.__replace = e;
    j.addEventListener("click", replace.bind(null, j));
    return e.replaceWith(j);
  }
  const rec = (j, iter, isKey, options) => {
    options = options || {};
    const e = ++iter
      ? assign(document.createElement("div"), {
          style: `margin-left: ${options.arrayChild != null ? 1 : iter * 5}px`,
          className:
            options.arrayChild == null ? (isKey ? "json-key" : "json-val") : ""
        })
      : document.createDocumentFragment();

    if (typeof j === "object") {
      const div = assign(document.createElement("div"), {
        className: "json-obj"
      });
      if (Array.isArray(j)) {
        div.style.display = "inline";
        e.className = "is-array";
        div.className = "";
        div.append(arr("["));
        const jl = j.length;
        div.append(
          ...j.map((x, i) => {
            const t = document.createDocumentFragment();
            t.append(
              rec(x, iter, -1, { arrayChild: i }),
              jl - i === 1 ? "" : ","
            );
            return t;
          })
        );
        div.append(arr("]"));
        e.append(div);
      } else {
        Object.entries(j).map(([k, v]) => {
          const dv = document.createElement("div");
          dv.className = "obj-h";
          dv.append(rec(k, iter, 1), rec(v, iter, 0));
          div.append(dv);
          e.append(div);
        });
      }
    } else {
      e.append(_parseDat(j, isKey));
    }
    return e;
  };
  let template = document.createElement("template");
  const html = "";
  template.innerHTML = html;
  return class JsonReader extends HTMLElement {
    set data(jsObj) {
      this._data = jsObj;
      this._render();
    }
    constructor() {
      super();
      const c = this.attachShadow({ mode: "open" });
      c.appendChild(css.content.cloneNode(!0));
    }
    _recurseThroughObjects() {
      const data = this._data;
      return rec(data, -1);
    }
    _render() {
      const dom = this._recurseThroughObjects();
      this.shadowRoot.append(dom);
    }
  };
}

const c = buildJsonReader();
window.customElements.define("json-reader", c);
