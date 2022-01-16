import { useEffect, useState } from "react";

const useTextPlayback = (text, interval) => {
  const [nextIndex, setNextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const distFromEnd = text?.length - nextIndex;
    if (distFromEnd >= 0) {
      setDisplayText(
        text.substring(0, nextIndex) +
          (distFromEnd > 0 && distFromEnd < text.length ? "|" : "")
      );
      const timeout = setTimeout(
        () => setNextIndex((current) => current + 1),
        interval
      );
      return () => clearTimeout(timeout);
    }
  }, [text, interval, nextIndex]);

  return displayText;
};

export default useTextPlayback;
