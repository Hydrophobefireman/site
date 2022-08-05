// import "@kit/styles";

// javascript is supported
import "./App.css";

import {useSharedStateValue} from "statedrive";

import {init} from "@hydrophobefireman/qwc";
import {VNode, render} from "@hydrophobefireman/ui-lib";

import {Router} from "./_router";
import {BrowserTabs} from "./components/BrowserTabs/BrowserTabs";
import {ReloadBtn} from "./components/ReloadBtn";
import {showBrowser} from "./state";
import {animAway, appShell, browserWindow, headingText} from "./styles";

init({
  "loading-spinner": {
    observedAttributes: [
      {
        prop: "size",
        listener(_, nv) {
          const h = nv ? `${nv}${nv.includes("px") ? "" : "px"}` : "50px";
          const style = this.shadowRoot.querySelector(".spinner").style;
          style.height = style.width = h;
        },
      },
    ],
  },
});

function App(): VNode {
  const shouldHide = !useSharedStateValue(showBrowser);
  return (
    <section class={appShell}>
      <section class={[browserWindow, shouldHide ? animAway : ""]}>
        <BrowserTabs />
        <Router />
      </section>
      <ReloadBtn show={shouldHide} />
    </section>
  );
}

render(<App />, document.getElementById("app-mount"));
