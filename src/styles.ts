import {css} from "catom";
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

export const appShell = css({
  marginTop: "6rem",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
});
export const headingText = css({
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
export const browserWindow = css({
  marginTop: "1rem",
  border: "3px solid var(--default-accent)",
  borderRadius: "10px",
  boxShadow: "var(--box-shadow)",
  padding: "1.5rem",
  transition: "0.2s linear",
  transformOrigin: "0% 100%",
  zIndex: 10,
  maxWidth: "100ch",
  marginLeft: "auto",
  marginRight: "auto",
});
export const reloadDiv = css({
  textAlign: "center",
  fontSize: "1.5rem",
  marginTop: "2rem",
});
export const animAway = css({
  transform: "scale(0)",
  // height: "0",
  overflow: "hidden",
});
