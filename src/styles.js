import { css } from "catom";
export const hoverable = css({
  pseudo: {
    ":not([disabled])": {
      cursor: "pointer",
      transition: "0.3s ease-in-out",
      transformStyle: "preserve-3d",
    },
    ":active:not([disabled])": {
      transform: "perspective(1px) scale(1.048) translateZ(0)",
    },
    ":focus:not([disabled])": {
      transform: "perspective(1px) scale(1.048) translateZ(0)",
    },
    ":hover:not([disabled])": {
      transform: "perspective(1px) scale(1.048) translateZ(0)",
    },
  },
});

export const heading = css({
  color: "var(--default-accent)",
  fontSize: "2rem",
  fontWeight: "bold",
});
