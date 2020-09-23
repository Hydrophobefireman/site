import { render, h } from "@hydrophobefireman/ui-lib";
import { init } from "@hydrophobefireman/qwc";
import { AppLoader } from "./AppLoader";
import { css } from "catom";
import { BrowserTabs } from "./components/BrowserTabs/BrowserTabs";
import "./App.css";
import { showBrowser } from "./state";
import { useSharedStateValue, useSetSharedState } from "statedrive";
import { hoverable } from "./styles";
import { Sherlock } from "./components/Sherlock/Sherlock";
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
const appShell = css({
  marginTop: "6rem",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
});
const headingText = css({
  color: "var(--default-accent)",
  fontSize: "2.5rem",
  textAlign: "left",
  fontWeight: "bold",
  media: {
    "only screen and (max-width:500px)": {
      fontSize: "2rem",
    },
  },
});
const browserWindow = css({
  marginTop: "1rem",
  border: "3px solid var(--default-accent)",
  borderRadius: "10px",
  boxShadow: "var(--box-shadow)",
  padding: "1.5rem",
  transition: "0.2s linear",
  transformOrigin: "0% 100%",
});
const reloadDiv = css({
  textAlign: "center",
  fontSize: "1.5rem",
  marginTop: "2rem",
});
const animAway = css({ transform: "scale(0)", height: "0" });
function ReloadBtn() {
  const setBrowser = useSetSharedState(showBrowser);
  return (
    <>
      <Sherlock
        class={css({
          margin: "auto",
          display: "block",
        })}
        size={200}
      />
      <div class={reloadDiv}>
        <div>Maybe it's time to</div>
        <button
          class={[
            css({
              minWidth: "20%",
              padding: ".4rem",
              margin: "auto",
              display: "block",
              background: "transparent",
              border: "3px solid var(--default-accent)",
              color: "var(--default-accent)",
              fontWeight: "bold",
              borderRadius: "7px",
              fontSize: "1.1rem",
              opacity: 0.7,
              cursor: "pointer",
              marginTop: "2rem",
              outline: "none",
              textAlign: "center",
              letterSpacing: "1.2px",
            }),
            hoverable,
          ]}
          onClick={() => setBrowser(true)}
        >
          Reboot
        </button>
      </div>
    </>
  );
}
function App() {
  const shouldHide = !useSharedStateValue(showBrowser);
  return (
    <section class={appShell}>
      <div class={headingText}>Hydrophobefireman</div>
      <section class={[browserWindow, shouldHide ? animAway : ""]}>
        <BrowserTabs />
        <AppLoader />
      </section>
      {shouldHide && <ReloadBtn />}
    </section>
  );
}
render(h(App), document.getElementById("app-mount"));
