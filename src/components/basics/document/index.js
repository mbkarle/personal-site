import * as styles from "./document.module.scss";

import React from "react";
import { Link } from "gatsby";
import mergeDefaults from "utils/merge-defaults";
import { capitalize } from "utils/str";
import Layout from "components/layout";
import MD from "components/basics/md";
import { StaticImage } from "gatsby-plugin-image";

const getBasicComponent = (className) => {
  const Component = (props) => (
    <div
      {...mergeDefaults(
        { className: styles[className] + ` ${styles.basic}` },
        props
      )}
    />
  );
  Component.displayName = capitalize(className);
  return Component;
};

const Document = ({ children, ...props }) => (
  <Layout {...mergeDefaults({ className: styles.document }, props)}>
    <div className={styles.content}>{children}</div>
    <div className={styles.footer}>
      <Link className={styles.homeButton} to="/">
        Home
      </Link>
      <Link className={styles.moreButton} to="/#archive">
        More Projects
      </Link>
      <MD
        className={styles.attribution}
      >{`By [Matt Karle](/#contact), 2022`}</MD>
    </div>
  </Layout>
);

const SUBCOMPONENTS = ["header", "body", "center", "banner", "separator"];

SUBCOMPONENTS.forEach((name) => {
  Document[capitalize(name)] = getBasicComponent(name);
});

const WIP = (props) => (
  <div {...mergeDefaults({ className: styles.wip }, props)}>
    <div className={styles.wipImage}>
      <StaticImage
        src="../../../images/traffic-cone.png"
        alt="Construction cone icon"
      />
    </div>
    Hey! Just so you know, this content is still a work in progress...
  </div>
);

Document.WIP = WIP;

export default Document;
