import * as styles from "./archive.module.scss";

import React, { useState } from "react";
import { Link } from "gatsby";
import SnapScroller from "components/basics/snap-scroller";
import mergeDefaults, { mergeClassName } from "utils/merge-defaults";
import MD from "components/basics/md";
import { PROJECTS } from "./data";
import { useIsOnScreen } from "hooks/intersection-observer";
import { useIsTabletSize } from "hooks/window-size";

const Project = ({ title, description, Image, time, to, isRev, ...props }) => {
  const [element, setElement] = useState(null);
  const isNarrowScreen = useIsTabletSize();
  const isOnScreen = useIsOnScreen({ element, minimumIntersectionRatio: 0.4 });

  return (
    <div
      ref={setElement}
      className={mergeClassName(
        styles.project,
        !(isNarrowScreen || isOnScreen) && styles.exit,
        isRev && styles.rev
      )}
    >
      <Link className={styles.row + (isRev ? ` ${styles.rev}` : "")} to={to}>
        <div className={styles.imageContainer}>
          <Image />
        </div>
        <div className={styles.textContainer}>
          <div className={styles.title}>{title}</div>
          <div className={styles.time}>{time}</div>
          <MD className={styles.description}>{description}</MD>
        </div>
      </Link>
    </div>
  );
};

const Archive = (props) => (
  <SnapScroller.Panel
    {...mergeDefaults({ className: styles.archive }, props)}
    id="archive"
  >
    <div className={styles.header}>Some things I’ve done</div>
    <div className={styles.subheader}>
      Here’s a little select work and project experiences from recent years that
      I’ve written a bit about.
    </div>
    {PROJECTS.map((project, idx) => (
      <Project
        key={`${project.title}-${idx}`}
        isRev={idx % 2 == 1}
        {...project}
      />
    ))}
  </SnapScroller.Panel>
);

export default Archive;
