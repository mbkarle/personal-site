import React from "react";
import Document from "components/basics/document";
import { SUBHEADER, PREFACE, THE_DEETS, REFLECTIONS } from "data/project-jeff";
import * as styles from "./project-jeff.module.scss";

const ProjectJeff = (props) => {
  return (
    <Document className={styles.jeffDoc} {...props}>
      <Document.Header>Project Jeff</Document.Header>
      <Document.Body>
        <Document.MD>{SUBHEADER}</Document.MD>
      </Document.Body>
      <Document.Separator />
      <Document.Body>
        <Document.MD>{PREFACE}</Document.MD>
        <Document.MD>{THE_DEETS}</Document.MD>
        <Document.MD>{REFLECTIONS}</Document.MD>
      </Document.Body>
    </Document>
  );
};

export default ProjectJeff;
