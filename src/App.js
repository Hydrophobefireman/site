import { render, h } from "@hydrophobefireman/ui-lib";

import { HeadingText } from "./components/HeadingText/HeadingText";
import { ProjectCardList } from "./components/ProjectCardList/ProjectCardList";

import "./App.css";
import "./components/HeadingText/HeadingText.css";
import "./components/ProjectCardList/ProjectCardList.css";

function App() {
  return h("main", null, h(HeadingText), h(ProjectCardList));
}

render(h(App), document.getElementById("app-mount"));
