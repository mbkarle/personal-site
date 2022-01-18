import "intersection-observer";
import * as styles from "./layout.module.scss";
import "css/typography.scss";

import React, { useEffect } from "react";
import mergeDefaults from "utils/merge-defaults";

const Layout = (props) => {
  useEffect(() => {
    // delay smoothscroll polyfill until on client to avoid accessing window during SSR
    if (window) {
      (async () => {
        const smoothscroll = await import("smoothscroll-polyfill");
        smoothscroll.polyfill();
      })();
    }
  }, []);
  return <main {...mergeDefaults({ className: styles.layout }, props)} />;
};

export default Layout;
