import * as styles from "./archive.module.scss";

import React from "react";
import SnapScroller from "components/basics/snap-scroller";
import mergeDefaults from "utils/merge-defaults";

const Archive = (props) => (
  <SnapScroller.Panel
    {...mergeDefaults({ className: styles.archive }, props)}
    id="archive"
  >
    World
  </SnapScroller.Panel>
);

export default Archive;
