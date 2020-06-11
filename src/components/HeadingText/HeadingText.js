import { h, useState, useCallback } from "@hydrophobefireman/ui-lib";
import { TypedText } from "../TypedText/TypedText";

export function HeadingText(props) {
  const [showNextText, setShowNextText] = useState(false);

  const onAnimationOver = useCallback(() => setShowNextText(true), []);

  return h(
    "div",
    { class: "text-8-bit" },
    h(
      "div",
      { class: "heading--name" },
      h(TypedText, {
        text: "Hydrophobefireman",
        onAnimationOver,
        interval: 65,
      })
    ),
    showNextText &&
      h(
        "div",
        { class: "heading--ext-text" },
        h(TypedText, {
          text: "I make stuff... sometimes it breaks",
          interval: 45,
          onAnimationOver: props.displayCardList,
        })
      )
  );
}
