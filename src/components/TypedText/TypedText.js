import { useState, useEffect, useRef, h } from "@hydrophobefireman/ui-lib";

export function TypedText(props) {
  const { text, interval, onAnimationOver, ...rest } = props;
  const [index, setIndex] = useState(0);
  const intervalRef = useRef();
  const intervalTime = interval || 100;

  useEffect(() => {
    intervalRef.current = setInterval(
      () => setIndex((previous) => ++previous),
      intervalTime
    );
    return () => clearInterval(intervalRef.current);
  }, [props.text]);

  if (intervalRef.current != null && index >= text.length) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    onAnimationOver && onAnimationOver();
  }

  return h("span", rest, text.substr(0, index));
}
