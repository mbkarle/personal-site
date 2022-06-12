import * as styles from "./slideshow.module.scss";

import React, { useState, useEffect } from "react";
import mergeDefaults from "utils/merge-defaults";
import ScrollIcon from "images/scroll-down.icon.svg";
import useScrollContainer from "hooks/scroll-container";
import { useIsMobileSize } from "hooks/window-size";
import { isArray } from "utils/type";

const Slideshow = ({ children, onChange, ...props }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const hasMult = isArray(children) && children.length;
  const [scrollContainer, ref, scroll] = useScrollContainer();
  const scrollDistance = scrollContainer?.offsetWidth;

  useEffect(() => {
    if (scrollContainer) {
      const updateIdx = (currScroll) => {
        const idx = Math.floor(
          (currScroll + scrollDistance / 3) / scrollDistance
        );
        if (idx != activeIdx) {
          setActiveIdx(idx);
          onChange?.(idx);
        }
      };

      // set index on initial render
      updateIdx(scrollContainer.scrollLeft);

      // function to handle index updates on scroll
      const onScroll = ({ target }) => {
        updateIdx(target?.scrollLeft);
      };

      // add scroll handler to scrollContainer
      scrollContainer.addEventListener("scroll", onScroll);
      return () => scrollContainer.removeEventListener("scroll", onScroll);
    }
  }, [scrollContainer, scrollDistance, activeIdx, onChange]);

  // fix over scrolling bug on mobile
  const scrollDiscount = useIsMobileSize() ? 0.99 : 1;

  const getScroll = (isRight) => () => {
    const coeff = isRight ? 1 : -1;
    const distance = coeff * scrollDistance * scrollDiscount;
    scroll({ left: distance, behavior: "smooth" });
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
