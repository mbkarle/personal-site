import { useEffect, useState } from "react";

const getTextEdit = (current, target) => {
  // if target has changed such that current is not a prefix, start removing current
  if (current.length > target.length || !target.startsWith(current)) {
    return current.substring(0, current.length - 1);
  }
  // otherwise if current is a prefix of target, build towards target
  return target.substring(0, current.length + 1);
};

const useTextPlayback = (text = "", interval = 80) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const timeout = setTimeout(
      () => setDisplayText(getTextEdit(displayText, text)),
      interval
    );
    return () => clearTimeout(timeout);
  }, [displayText, text, interval]);

  const hasCursor = !(
    displayText.length === 0 || displayText.length === text.length
  );

  return displayText + (hasCursor ? "|" : "");
};

export const usePlaybackSequence = (texts, interval, delay) => {
  const [textIdx, setTextIdx] = useState(0);
  const displayText = useTextPlayback(texts[textIdx], interval);

  useEffect(() => {
    if (displayText === texts[textIdx] && delay !== Infinity) {
      const timeout = setTimeout(
        () => setTextIdx((current) => (current + 1) % texts.length),
        delay
      );

      return () => clearTimeout(timeout);
    }
  }, [displayText, delay, texts, textIdx]);
  return displayText || " ";
};

export default useTextPlayback;
