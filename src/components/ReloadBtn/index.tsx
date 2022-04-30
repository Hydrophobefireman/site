import {css} from "catom";
import {useSetSharedState} from "statedrive";

import {showBrowser} from "@/state";
import {hoverable, reloadDiv} from "@/styles";

import {Sherlock} from "../Sherlock/Sherlock";

export function ReloadBtn({show}) {
  const setBrowser = useSetSharedState(showBrowser);
  return (
    <div
      class={[
        css({
          position: "absolute",
          top: "25vh",
          left: 0,
          right: 0,
        }),
        show ? "" : css({display: "none"}),
      ]}
    >
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
    </div>
  );
}
