import * as styles from "./md.module.scss";

import React from "react";
import ReactMarkdown from "react-markdown";
import mergeDefaults from "utils/merge-defaults";
import GlobalOrLocalLink from "components/basics/global-or-local-link";

const MD = (props) => (
  <ReactMarkdown
    components={{
      p: (props) => {
        // default to use divs instead of p
        return <div {...props} />;
      },
      a: (props) => {
        return <GlobalOrLocalLink className={styles.link} {...props} />;
      },
    }}
    {...mergeDefaults({ className: styles.md }, props)}
  />
);

export default MD;
