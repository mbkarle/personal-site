import * as styles from "./home.module.scss";

import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import ScrollIcon from "images/scroll-down.icon.svg";
import useTextPlayback from "hooks/text-playback";
import SnapScroller from "components/basics/snap-scroller";
import About from "./about";
import Archive from "./archive";
import Contact from "./contact";

const Home = (props) => {
  return (
    <SnapScroller
      {...props}
      // sadly discontinuing snap scroll for now :(
      disabled
    >
      <Hero />
      <About />
      <Archive />
      <Contact />
    </SnapScroller>
  );
};

const HERO_TEXT = {
  header: "Hi, I’m Matt.",
  subheader: "Full stack engineer, student, and aspiring generalist",
};

const Hero = (props) => {
  // animate text with typing effect
  const header = useTextPlayback(HERO_TEXT.header, 80);
  // sequence subheader after header is complete with ternary
  const subheader = useTextPlayback(
    header === HERO_TEXT.header ? HERO_TEXT.subheader : "",
    30
  );
  return (
    <SnapScroller.Panel {...props}>
      {({ triggerScroll }) => (
        <>
          <StaticImage
            src="../../images/home-hero.png"
            alt="Matt on Middle Teton"
            placeholder="blurred"
            layout="fullWidth"
            className={styles.heroImage}
          />
          <div className={styles.heroTextContainer}>
            <div className={styles.heroHeader}>{header}</div>
            <div className={styles.heroSubheader}>{subheader}</div>
          </div>
          {subheader === HERO_TEXT.subheader && (
            <button className={styles.scrollButton} onClick={triggerScroll}>
              <ScrollIcon height={60} width={60} />
            </button>
          )}
        </>
      )}
    </SnapScroller.Panel>
  );
};

export default Home;
