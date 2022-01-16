import * as styles from "./archive.module.scss";

import React from "react";
import { Link } from "gatsby";
import SnapScroller from "components/basics/snap-scroller";
import mergeDefaults from "utils/merge-defaults";
import MD from "components/basics/md";
import { PROJECTS } from "./data";

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
    {PROJECTS.map(({ title, description, Image, time, to }, idx) => (
      <Link
        key={`${title}-${idx}`}
        className={styles.row + (idx % 2 == 1 ? ` ${styles.rev}` : "")}
        to={to}
      >
        <div className={styles.imageContainer}>
          <Image />
        </div>
        <div className={styles.textContainer}>
          <div className={styles.title}>{title}</div>
          <div className={styles.time}>{time}</div>
          <MD className={styles.description}>{description}</MD>
        </div>
      </Link>
    ))}
  </SnapScroller.Panel>
);

export default Archive;
