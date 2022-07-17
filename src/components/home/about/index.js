import * as styles from "./about.module.scss";

import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import mergeDefaults from "utils/merge-defaults";
import { StaticImage } from "gatsby-plugin-image";
import Slideshow from "components/basics/slideshow";
import SnapScroller from "components/basics/snap-scroller";
import LocationIcon from "images/location.icon.svg";
import MD from "components/basics/md";
import { SLIDES, ABOUT_ME } from "./data";
import { useIsOnScreen } from "hooks/intersection-observer";

const About = (props) => {
  return (
    <SnapScroller.Panel {...mergeDefaults({ className: styles.about }, props)}>
      <AboutSlides />
      <Blurb />
    </SnapScroller.Panel>
  );
};

const Blurb = (props) => {
  const [element, setElement] = useState(null);
  const [wasVisible, setWasVisible] = useState(false);
  const isOnScreen = useIsOnScreen({ element });
  useEffect(() => {
    if (isOnScreen) {
      setWasVisible(true);
    }
  }, [isOnScreen]);

  return (
    <div className={styles.descriptionContainer} {...props}>
      <div
        className={
          styles.descriptionHeader + (wasVisible ? ` ${styles.seen}` : "")
        }
        ref={setElement}
      >
        About Me
      </div>
      <MD className={styles.descriptionP}>{ABOUT_ME}</MD>
      <div className={styles.originCta}>
        Want even{" "}
        <Link className={styles.originButton} to="/coming-soon">
          more origin story?
        </Link>
      </div>
    </div>
  );
};

const AboutSlides = (props) => {
  const [slideIdx, setSlideIdx] = useState(0);
  return (
    <div className={styles.slideshowContainer} {...props}>
      <div className={styles.slideLocation}>
        <LocationIcon height={18} width={18} />
        <div className={styles.locationText}>{SLIDES[slideIdx]?.location}</div>
        <Link className={styles.howToButton} to="/how-to-slideshow">
          How’d I make this?
        </Link>
      </div>
      <Slideshow className={styles.slideshow} onChange={setSlideIdx}>
        <Slideshow.Slide>
          <StaticImage
            src="../../../images/tuck.png"
            alt="Matt with a friend's dog, betraying his own beloved beagle Jazz!"
            layout="fullWidth"
            placeholder="blurred"
          />
        </Slideshow.Slide>
        <Slideshow.Slide>
          <StaticImage
            src="../../../images/formal.png"
            alt="All business with the roommates"
            layout="fullWidth"
            placeholder="blurred"
          />
        </Slideshow.Slide>
        <Slideshow.Slide>
          <StaticImage
            src="../../../images/working.png"
            alt="Working hard with the cats."
            layout="fullWidth"
            placeholder="blurred"
          />
        </Slideshow.Slide>
        <Slideshow.Slide>
          <StaticImage
            src="../../../images/jam.png"
            alt="Playing music with my brother"
            layout="fullWidth"
            placeholder="blurred"
          />
        </Slideshow.Slide>
        <Slideshow.Slide>
          <StaticImage
            src="../../../images/jmt-wide.png"
            alt="Through hiking the John Muir Trail in the Sierra."
            layout="fullWidth"
            placeholder="blurred"
          />
        </Slideshow.Slide>
      </Slideshow>
      <div className={styles.slideBody}>
        {SLIDES.length && (
          <div className={styles.indicatorContainer}>
            {SLIDES.map((slide, idx) => (
              <Slideshow.Indicator
                key={`${slide.location}-${idx}`}
                isActive={idx === slideIdx}
              />
            ))}
          </div>
        )}
        <MD className={styles.slideDescription}>
          {SLIDES[slideIdx]?.description}
        </MD>
      </div>
    </div>
  );
};

export default About;
