import {css} from "catom";
import {useSetSharedState} from "statedrive";

import {Sherlock} from "@/components/Sherlock/Sherlock";
import {is404} from "@/state";
import {hoverable} from "@/styles";
import {A, useEffect} from "@hydrophobefireman/ui-lib";

export function NotFound() {
  const set404 = useSetSharedState(is404);
  useEffect(() => {
    set404(true);
    return () => {
      set404(false);
    };
  }, []);
  return (
    <div>
      <div class={css({margin: "auto", textAlign: "center"})}>
        <Sherlock />
      </div>
      <A href="/" class={[hoverable, css({display: "inline-block"})]}>
        <Home />
      </A>
    </div>
  );
}

function Home({size = "2rem"}) {
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
      />
    </svg>
  );
}
