import React from "react";
import Document from "components/basics/document";
import { HEADER, SUBHEADER, PREFACE, CONTENTS, CLASSES } from "data/schoolwork";
import * as styles from "./schoolwork.module.scss";

const CLASS_LIST = Object.keys(CLASSES);

const Schoolwork = (props) => {
  return (
    <Document className={styles.schoolDoc} {...props}>
      <Document.Header>{HEADER}</Document.Header>
      <Document.Body>
        <Document.MD>{SUBHEADER}</Document.MD>
      </Document.Body>
      <Document.Separator />
      <Document.Body>
        <Document.MD>{PREFACE}</Document.MD>
        <Document.MD>{CONTENTS}</Document.MD>
        {CLASS_LIST.map((className) => (
          <div key={className} id={className}>
            {CLASSES[className]}
          </div>
        ))}
      </Document.Body>
    </Document>
  );
};

export default Schoolwork;
