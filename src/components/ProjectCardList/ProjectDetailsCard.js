import { useState, useEffect, h, useMemo } from "@hydrophobefireman/ui-lib";
// yep
const raf = window.requestAnimationFrame
  ? (fn) =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() => requestAnimationFrame(fn))
      )
  : (fn) => setTimeout(fn, 16.6 * 3);

const defaultCSS = {
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};
const afterAnimationCSS = {
  height: "50vh",
  width: "95vw",
};
function getTransformValue(pos, neg, reference) {
  return pos < reference - neg ? pos : neg;
}

export function ProjectDetailsMinWidth(props) {
  const { width, height, details } = props;

  const deps = [width, height];

  const [initialAnimationCompleted, setInitialAnimationCompleted] = useState(
    false
  );
  const getStyle = useMemo(
    () => ({
      transform: `scaleX(${props.rect.width / width / 2}) scaleY(${
        props.rect.height / height / 2
      })`,
      transformOrigin: `${getTransformValue(
        props.rect.left,
        props.rect.right,
        width
      )}px ${getTransformValue(props.rect.top, props.rect.bottom, height)}px`,
      overflow: "hidden",
      height: "100vh",
      width: "100vw",
      ...defaultCSS,
    }),
    deps
  );
  const [style, setStyle] = useState(null);

  useEffect(() => {
    if (!initialAnimationCompleted) {
      setInitialAnimationCompleted(true);
      setStyle(getStyle);
    }
  }, deps);

  useEffect(() => {
    !initialAnimationCompleted &&
      raf(() => setStyle({ ...afterAnimationCSS, ...defaultCSS }));
  }, deps);

  return style && h(Card, { details, style, close: props.close });
}

export function ProjectDetailsMaxWidth(props) {
  return h(
    "div",
    { class: "project-card--static-container" },
    h(Card, {
      ...props,
      style: {
        height: "50vh",
        flex: 1,
        position: "sticky",
        width: "50%",
        right: 0,
        top: "40%",
      },
    })
  );
}

function Card(props) {
  const { title, description, github, app } = props.details;
  const style = props.style;
  return h(
    "div",
    { style, class: "project-card--c" },
    h(
      "div",
      { style: "height:0" },
      h("div", {
        class: "project-card--close hoverable",
        onClick: props.close,
      })
    ),
    h(
      "div",
      { class: "project-card--proj-runs" },
      h("div", { class: "project-card--project-title" }, title),
      h("div", { class: "project-card--project-desc" }, description),
      h(
        "div",
        { class: "ma_tc", style: "margin-top:1.5rem;width:80%" },
        app &&
          h(
            "a",
            {
              href: app,
              class: "hoverable project-card--outlink",
              target: "_blank",
            },
            "Open"
          ),
        github &&
          h(
            "a",
            {
              href: github,
              class: "hoverable project-card--outlink",
              target: "_blank",
            },
            "Source Code"
          )
      )
    )
  );
}
