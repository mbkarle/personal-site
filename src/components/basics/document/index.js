import * as styles from "./document.module.scss";

import React from "react";
import { Link } from "gatsby";
import mergeDefaults from "utils/merge-defaults";
import { capitalize } from "utils/str";
import Layout from "components/layout";
import MD from "components/basics/md";
import { StaticImage } from "gatsby-plugin-image";
import Youtube from "react-youtube";

const getBasicComponent = (className, Base) => {
  const Component = ({
    top = 0,
    right = 0,
    bottom = 0,
    left = 0,
    ...props
  }) => {
    const finalProps = mergeDefaults(
      {
        className: styles[className] + ` ${styles.basic}`,
        style: {
          marginTop: top,
          marginRight: right,
          marginBottom: bottom,
          marginLeft: left,
        },
      },
      props
    );
    return Base ? <Base {...finalProps} /> : <div {...finalProps} />;
  };
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

const SUBCOMPONENTS = [
  "header",
  "body",
  "center",
  "banner",
  "separator",
  "br",
  "info",
];

SUBCOMPONENTS.forEach((name) => {
  Document[capitalize(name)] = getBasicComponent(name);
});

Document.MD = getBasicComponent("md", MD);

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

const ResponsiveYoutube = (props) => (
  <div className={styles.youtubeParent}>
    <Youtube
      {...mergeDefaults(
        {
          iframeClassName: styles.youtubeFrame,
          className: styles.youtubeContainer,
        },
        props
      )}
    />
  </div>
);

Document.Youtube = ResponsiveYoutube;

export const QuickInfo = getBasicComponent("info");

const INFO_SUBS = ["header", "separator", "row", "col"];

INFO_SUBS.forEach((name) => {
  const capName = capitalize(name);
  QuickInfo[capName] = getBasicComponent(`info${capName}`);
});

export default Document;
