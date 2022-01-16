import * as styles from "./layout.module.scss";
import "css/typography.scss";

import React from "react";
import mergeDefaults from "utils/merge-defaults";
import smoothscroll from "smoothscroll-polyfill";

// activate smooth scroll polyfill
smoothscroll.polyfill();

const Layout = (props) => (
  <main {...mergeDefaults({ className: styles.layout }, props)} />
);

export default Layout;
