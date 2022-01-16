import * as styles from "./coming-soon.module.scss";

import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import Document from "components/basics/document";
import MD from "components/basics/md";

const TEXT = `
Turns out it takes a while to write all of these things. Huh.

Hopefully I'll get to this one very soon - in the meantime, check out some [other projects](/#archive)!
`;

const ComingSoon = (props) => {
  return (
    <Document {...props}>
      <Document.Header>Coming Soon!</Document.Header>
      <Document.Center>
        <div className={styles.cone}>
          <StaticImage
            src="../images/traffic-cone.png"
            alt="Construction cone icon"
          />
        </div>
        <MD className={styles.text}>{TEXT}</MD>
      </Document.Center>
    </Document>
  );
};

export default ComingSoon;
