import { useState, useCallback, useEffect } from "@hydrophobefireman/ui-lib";

export function useViewportSize() {
  const [innerHeight, setInnerHeight] = useState(() => window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(() => window.innerWidth);

  const callback = useCallback(() => {
    setInnerHeight(window.innerHeight);
    setInnerWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    addEventListener("resize", callback);
    return () => removeEventListener("resize", callback);
  }, []);
  return [innerHeight, innerWidth];
}
