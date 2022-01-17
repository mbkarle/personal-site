import { useEffect, useState } from "react";
import * as variables from "css/_export.module.scss";

const min = (...values) => {
  const existing = values.filter((val) => val != null);
  return Math.min(...existing);
};

const getWindowSize = (useMin) => {
  if (typeof window === "undefined") return { width: 2000, height: 2000 };
  const choose = useMin ? min : Math.max;
  return {
    width: choose(window?.visualViewport?.width, window?.innerWidth),
    height: choose(window?.visualViewport?.height, window?.innerHeight),
  };
};

export const useWindowSize = (useMin) => {
  const [width, setWidth] = useState(() => getWindowSize().width);
  const [height, setHeight] = useState(() => getWindowSize().height);

  useEffect(() => {
    const handleResize = () => {
      const { width: w, height: h } = getWindowSize(useMin);
      setWidth(w);
      setHeight(h);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [useMin]);

  return { width, height };
};

const useIsAtWindowBreakpoint = (breakpoint) => {
  // keep breakpoint in state to force re-render if it updates
  // since breakpoints may come from exported css, will not re-render otherwise
  const [bp, updateBP] = useState(breakpoint);
  useEffect(() => updateBP(breakpoint), [breakpoint]);
  const { width } = useWindowSize();

  return width <= bp;
};

export const useIsMobileSize = () => {
  return useIsAtWindowBreakpoint(variables.mobileBreakpoint || 600);
};

export const useIsTabletSize = () => {
  return useIsAtWindowBreakpoint(variables.tabletBreakpoint || 1024);
};
