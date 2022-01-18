import * as styles from "./contact.module.scss";

import React, { useMemo, useState } from "react";
import mergeDefaults from "utils/merge-defaults";
import { usePlaybackSequence } from "hooks/text-playback";
import SnapScroller from "components/basics/snap-scroller";
import { useIsOnScreen } from "hooks/intersection-observer";
import { useIsMobileSize } from "hooks/window-size";

const CTAs = ["work", "chat", "build", "make music", "make products"].map(
  (action) => action + " together."
);

const ACTIVE_DELAY = 5000;
const STATIC_DELAY = Infinity;

const Contact = (props) => {
  return (
    <SnapScroller.Panel
      {...mergeDefaults({ className: styles.container }, props)}
      id="contact"
    >
      <Header />
    </SnapScroller.Panel>
  );
};

const Header = (props) => {
  const [element, setElement] = useState(null);
  const isOnScreen = useIsOnScreen({ element });
  const isMobileSize = useIsMobileSize();
  const delay = useMemo(
    () => (!isMobileSize && isOnScreen ? ACTIVE_DELAY : STATIC_DELAY),
    [isOnScreen]
  );
  const header = usePlaybackSequence(CTAs, 80, delay);

  return (
    <div
      {...mergeDefaults({ className: styles.header }, props)}
      ref={setElement}
    >
      Let’s {header}
    </div>
  );
};

export default Contact;
