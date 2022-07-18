import * as styles from "./md.module.scss";

import React from "react";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "react-code-blocks";
import mergeDefaults from "utils/merge-defaults";
import GlobalOrLocalLink from "components/basics/global-or-local-link";
import gfm from "remark-gfm";

const MD = (props) => (
  <ReactMarkdown
    remarkPlugins={[gfm]}
    components={{
      p: (props) => {
        // default to use divs instead of p
        return <div className="md-p" {...props} />;
      },
      a: (props) => {
        return <GlobalOrLocalLink className={styles.link} {...props} />;
      },
      h2: (props) => <div className={`${styles.customH2} md-h2`} {...props} />,
      code: (props) =>
        props.inline ? (
          <code className={styles.code} {...props} />
        ) : (
          <CodeBlock
            language={"jsx"}
            text={props.children?.[0] ?? ""}
            {...props}
          />
        ),
    }}
    {...mergeDefaults({ className: styles.md }, props)}
  />
);

export default MD;
