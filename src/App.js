import { render, h, useState, useCallback } from "@hydrophobefireman/ui-lib";

import { HeadingText } from "./components/HeadingText/HeadingText";
import { ProjectCardList } from "./components/ProjectCardList/ProjectCardList";

import "./App.css";
import "./components/HeadingText/HeadingText.css";
import "./components/ProjectCardList/ProjectCardList.css";

function App() {
  const [cardList, setCardList] = useState(false);

  const enableCardList = useCallback(() => setCardList(true), []);
  return h(
    "main",
    null,
    h(HeadingText, { displayCardList: enableCardList }),
    cardList && h(ProjectCardList)
  );
}

render(h(App), document.getElementById("app-mount"));
