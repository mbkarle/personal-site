import * as styles from "./snap-scroller.module.scss";
import React, { useContext, createContext } from "react";
import mergeDefaults from "utils/merge-defaults";
import useScrollContainer from "hooks/scroll-container";
import { isFunction } from "utils/type";

const ScrollContext = createContext({ triggerScroll: () => null });

const SnapScroller = (props) => {
  const [scrollContainer, ref, scroll] = useScrollContainer();
  const triggerScroll = () => {
    if (window?.innerHeight) {
      scroll({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <ScrollContext.Provider value={{ triggerScroll, scrollContainer }}>
      <div
        {...mergeDefaults({ className: styles.container }, props)}
        ref={ref}
      />
    </ScrollContext.Provider>
  );
};

const Panel = ({ children, ...props }) => {
  const scrollContext = useContext(ScrollContext);
  return (
    <section {...mergeDefaults({ className: styles.panel }, props)}>
      {isFunction(children) ? children(scrollContext) : children}
    </section>
  );
};

SnapScroller.Panel = Panel;

export default SnapScroller;
