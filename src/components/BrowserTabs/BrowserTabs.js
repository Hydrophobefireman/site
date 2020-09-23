import { useSetSharedState, useSharedStateValue } from "statedrive";
import {
  A,
  useState,
  useEffect,
  useCallback,
  loadURL,
  Router,
} from "@hydrophobefireman/ui-lib";
import { css } from "catom";
import { useLocation, useViewportSize } from "../../hooks";
import { showBrowser, is404 } from "../../state";
import { AboutIcon, Beaker, Terminal, Icon404 } from "./icons";
const tab = css({
  minWidth: "20%",
  display: "inline-block",
  padding: "0.6rem",
  marginLeft: "-.5rem",
  borderRadius: "10px 10px 0px 0px",
  transition: "0.1s linear",
  color: "#fff",
});

const FIRST_SLASH = /^\/+/g;
const activeTab = css({ backgroundColor: "var(--active-tab)" });
const inactiveTab = css({ backgroundColor: "var(--inactive-tab)" });
const navCSS = css({ textAlign: "left", position: "relative" });
const omniBoxDiv = css({
  backgroundColor: "var(--active-tab)",
  marginLeft: "-.5rem;",
  borderRadius: "5px",
  borderTopLeftRadius: "0px",
  padding: "5px",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  paddingLeft: "1rem",
  paddingRight: "1rem",
});
const omnibox = css({
  fontSize: "1.1rem",
  border: "none",
  outline: "none",
  background: "var(--omnibox-input)",
  paddingTop: "0.2rem",
  paddingBottom: "0.2rem",
});
const urlInput = css({
  color: "#fff",
  padding: "0",
  //   fontWeight: "lighter",
  flex: 1,
  paddingRight: "0.2rem",
  borderTopRightRadius: "10px",
  borderBottomRightRadius: "10px",
});
const urlHost = css({
  paddingLeft: "0.2rem",
  borderTopLeftRadius: "10px",
  borderBottomLeftRadius: "10px",
  fontWeight: "lighter",
});
const tabBox = css({
  backgroundColor: "#2c2c2c",
  borderRadius: "5px",
  marginBottom: "1rem",
});
const closeBtn = css({
  height: "1rem",
  width: "1rem",
  borderRadius: "50%",
  backgroundColor: "#ff5f56",
  right: "10px",
  position: "absolute",
  top: "10px",
  cursor: "pointer",
});

export function BrowserTabs() {
  const setBrowser = useSetSharedState(showBrowser);
  const location = useLocation();
  const [, width] = useViewportSize();
  const wideScreen = width >= 600;
  const [value, setValue] = useState(location);
  useEffect(() => setValue(location), [location]);
  const onInput = useCallback((e) => setValue(e.target.value), []);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      try {
        loadURL(value);
      } catch (e) {}
    },
    [value]
  );
  const $404 = useSharedStateValue(is404);
  return (
    <div class={tabBox}>
      <form onSubmit={onSubmit}>
        <nav class={navCSS}>
          <Tab
            activeLocations={["/", "/about"]}
            icon={AboutIcon}
            href="/about"
            text="About"
            location={location}
          />
          <Tab
            href="/projects"
            text="Projects"
            location={location}
            icon={Beaker}
          />
          <Tab href="/code" text="Code" location={location} icon={Terminal} />
          {$404 && (
            <Tab
              href="/"
              text={"Can't find " + Router.path}
              location="/"
              icon={Icon404}
            />
          )}
          <div class={closeBtn} onClick={() => setBrowser(false)}></div>
        </nav>
        <div class={omniBoxDiv}>
          <span class={[omnibox, urlHost]}>
            <Lock />
            {wideScreen && window.origin}/
          </span>
          <input
            class={[omnibox, urlInput]}
            onInput={onInput}
            value={value.replace(FIRST_SLASH, "")}
          ></input>
        </div>
      </form>
    </div>
  );
}

function Lock({ size = 16 }) {
  return (
    <svg viewBox="0 0 36 36" height={size} width={size}>
      <path
        fill="rgb(5 199 5)"
        d="M18 3C12 3 8 7 8 13v10h4V13a6 6 0 0112 0v10h4V13c0-6-4-10-10-10z"
      />
      <path
        fill="rgb(5 199 5)"
        d="M31 32c0 2-2 4-4 4H9c-2 0-4-2-4-4V20c0-2 2-4 4-4h18c2 0 4 2 4 4v12z"
      />
    </svg>
  );
}
const LoadingIcon = () => () => <loading-spinner size={5} />;
function Tab({ activeLocations, icon, href, text, location }) {
  let isActive = location === href;
  if (!isActive && activeLocations) {
    isActive = activeLocations.indexOf(location) > -1;
  }
  const [Icon, setIcon] = useState(LoadingIcon);
  useEffect(() => {
    setTimeout(() => {
      setIcon(() => icon);
    }, Math.floor(Math.random() * 2000));
  }, []);

  return (
    <A href={href} class={[tab, isActive ? activeTab : inactiveTab]}>
      <span class={css({ display: "inline-flex", alignItems: "center" })}>
        <Icon />
        <span class={css({ marginLeft: "5px" })}>{text}</span>
      </span>
    </A>
  );
}
