import {
  Router,
  AsyncComponent,
  Path,
  A,
  useEffect,
} from "@hydrophobefireman/ui-lib";
import { Object_entries as entries } from "@hydrophobefireman/j-utils";
import { Sherlock } from "./components/Sherlock/Sherlock";
import { hoverable } from "./styles";
import { useSetSharedState } from "statedrive";
import { is404 } from "./state";
import { css } from "catom";
const getDefault = (mod) => mod.default;
const about = () => import("./components/About/About").then(getDefault);
const componentMap = {
  "/": about,
  "/about": about,
  "/projects": () => import("./components/Projects/Projects").then(getDefault),
  "/code": () => import("./components/Code/Code").then(getDefault),
};
const c = entries(componentMap).map(([path, comp]) => (
  <Path
    match={path}
    component={
      <section data-app-state={path} class="route-path">
        <AsyncComponent
          componentPromise={comp}
          fallback={
            <div>
              <loading-spinner>Loading..</loading-spinner>
            </div>
          }
        />
      </section>
    }
  />
));

export function AppLoader() {
  return (
    <Router
      fallbackComponent={() => {
        const set404 = useSetSharedState(is404);
        useEffect(() => {
          set404(true);
          return () => set404(false);
        }, []);
        return (
          <div>
            <div class={css({ margin: "auto", textAlign: "center" })}>
              <Sherlock />
            </div>
            <A href="/" class={[hoverable, css({ display: "inline-block" })]}>
              <Home />
            </A>
          </div>
        );
      }}
    >
      {c}
    </Router>
  );
}

function Home({ size = "2rem" }) {
  return (
    <svg
      fill="none"
      stroke="var(--default-accent)"
      viewBox="0 0 24 24"
      height={size}
      width={size}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      ></path>
    </svg>
  );
}
