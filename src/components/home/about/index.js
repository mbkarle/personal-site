import * as styles from "./about.module.scss";

import React, { useState } from "react";
import mergeDefaults from "utils/merge-defaults";
import { StaticImage } from "gatsby-plugin-image";
import Slideshow from "components/basics/slideshow";
import SnapScroller from "components/basics/snap-scroller";
import LocationIcon from "images/location.icon.svg";
import MD from "components/basics/md";
import { SLIDES, ABOUT_ME } from "./data";

const About = (props) => {
  const [slideIdx, setSlideIdx] = useState(0);
  return (
    <SnapScroller.Panel {...mergeDefaults({ className: styles.about }, props)}>
      <div className={styles.slideshowContainer}>
        <div className={styles.slideLocation}>
          <LocationIcon height={18} width={18} />
          {SLIDES[slideIdx]?.location}
          <button className={styles.howToButton}>How’d I make this?</button>
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

      <div className={styles.descriptionContainer}>
        <div className={styles.descriptionHeader}>About Me</div>
        <MD className={styles.descriptionP}>{ABOUT_ME}</MD>
        <div className={styles.originCta}>
          Want even{" "}
          <button className={styles.originButton}>more origin story?</button>
        </div>
      </div>
    </SnapScroller.Panel>
  );
};

export default About;
