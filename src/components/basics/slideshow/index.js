import * as styles from "./slideshow.module.scss";

import React, { useState, useEffect } from "react";
import mergeDefaults from "utils/merge-defaults";
import ScrollIcon from "images/scroll-down.icon.svg";
import useScrollContainer from "hooks/scroll-container";
import { isArray } from "utils/type";

const Slideshow = ({ children, onChange, ...props }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const hasMult = isArray(children) && children.length;
  const [scrollContainer, ref, scroll] = useScrollContainer();
  const scrollDistance = scrollContainer?.offsetWidth;
  const getScroll = (isRight) => () => {
    const coeff = isRight ? 1 : -1;
    scroll({ left: coeff * scrollDistance, behavior: "smooth" });
    setActiveIdx((current) => {
      const nextIdx = current + coeff;
      onChange?.(nextIdx);
      return nextIdx;
    });
  };
  const scrollLeft = getScroll(false);
  const scrollRight = getScroll(true);
  return (
    <div {...mergeDefaults({ className: styles.container }, props)}>
      {hasMult && activeIdx > 0 && <SlideButton onClick={scrollLeft} />}
      <div className={styles.scroller} ref={ref}>
        {children}
      </div>
      {hasMult && activeIdx < children.length - 1 && (
        <SlideButton className={styles.right} onClick={scrollRight} />
      )}
    </div>
  );
};

const Slide = (props) => {
  return <div {...mergeDefaults({ className: styles.slide }, props)} />;
};

const SlideButton = ({ onClick, ...props }) => {
  const [canClick, setCanClick] = useState(true);

  useEffect(() => {
    if (!canClick) {
      let timeout = setTimeout(() => setCanClick(true), 500);
      return () => clearTimeout(timeout);
    }
  }, [canClick]);

  const handleClick = () => {
    if (canClick) {
      setCanClick(false);
      onClick?.();
    }
  };

  return (
    <button
      {...mergeDefaults(
        { className: styles.button, onClick: handleClick },
        props
      )}
    >
      <ScrollIcon className={styles.icon} height={16} width={16} />
    </button>
  );
};

const SlideIndicator = ({ isActive, ...props }) => (
  <div
    {...mergeDefaults(
      { className: styles.indicator + (isActive ? ` ${styles.active}` : "") },
      props
    )}
  />
);

Slideshow.Slide = Slide;

Slideshow.Indicator = SlideIndicator;

export default Slideshow;
