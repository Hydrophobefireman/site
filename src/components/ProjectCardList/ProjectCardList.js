import { h, useRef, useState, useCallback } from "@hydrophobefireman/ui-lib";

import {
  ProjectDetailsMinWidth,
  ProjectDetailsMaxWidth,
} from "./ProjectDetailsCard";
import { useViewportSize } from "./viewportSize";

const projects = window._projects;
window._projects = null;

export function ProjectCardList() {
  const [details, setDetails] = useState(null);
  const [rect, setRect] = useState(null);
  const [height, width] = useViewportSize();
  const nonWideScreen = width < 850; //todo

  const animateCardDetails = useCallback((element, data) => {
    /** @type {DOMRect} */
    const rect = element.getBoundingClientRect();
    setRect(rect);
    setDetails(data);
  }, []);
  const close = useCallback(() => setDetails(null), []);

  const componentName = nonWideScreen
    ? ProjectDetailsMinWidth
    : ProjectDetailsMaxWidth;

  return h(
    "div",
    {
      class: `project-card--grid-container${
        details ? (!nonWideScreen ? " enabled" : " nw") : ""
      }`,
    },
    h(
      "div",
      { class: "project-card--box" },
      projects.map((x) =>
        h(ProjectCard, { data: x, animateFrom: animateCardDetails })
      )
    ),
    details && h(componentName, { rect, details, close, width, height }),
    details && !nonWideScreen && h("div", { style: "flex:1" })
  );
}

function ProjectCard(props) {
  const data = props.data;
  const { title, short } = data;
  const ref = useRef();

  const handleClick = () => props.animateFrom(ref.current, data);
  return h(
    "div",
    { class: "project-card--container hoverable", ref, onClick: handleClick },
    h("div", { class: "project-card--title" }, title),
    h("div", { class: "project-card--description" }, short)
  );
}
