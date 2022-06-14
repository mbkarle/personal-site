import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import Document from "components/basics/document";
import Slideshow from "components/basics/slideshow";

const Jazz = (props) => {
  return (
    <Document {...props}>
      <Document.Header>Jazz, My Pup</Document.Header>
      <Document.Separator />
      <Document.Body>
        The lucky dog gets a whole page to herself since I featured Tuck on the
        homepage.
      </Document.Body>
      <Document.Center>
        <div
          style={{
            maxWidth: "calc(100vw - var(--page-margin) * 2",
            width: "min(500px, 95vw)",
            borderRadius: "8px",
            overflow: "hidden",
            transform: "translateZ(0)",
          }}
        >
          <Slideshow>
            <Slideshow.Slide>
              <StaticImage
                src="../images/jazz-wag.png"
                alt="Jazz wagging her tail"
                layout="fullWidth"
              />
            </Slideshow.Slide>
            <Slideshow.Slide>
              <StaticImage
                src="../images/canoe.png"
                alt="Jazz in a canoe!"
                layout="fullWidth"
              />
            </Slideshow.Slide>
            <Slideshow.Slide>
              <StaticImage
                src="../images/jazz-nap.png"
                alt="Jazz napping with me"
                layout="fullWidth"
              />
            </Slideshow.Slide>
            <Slideshow.Slide>
              <StaticImage
                src="../images/jazz-report.png"
                alt="The neighbor's report on Jazz's behavior"
                layout="fullWidth"
              />
            </Slideshow.Slide>
          </Slideshow>
        </div>
      </Document.Center>
      <Document.Body>
        Jazz is a 10 year old beagle + english-shepherd mix and a good girl. I
        could say so much more - talk about her “my way or home” attitude
        towards walks, her love of cinema, and her integral role in dish washing
        processes (haha jk... unless?) - but I’ll let the pictures do most of
        the talking.
      </Document.Body>
    </Document>
  );
};

export default Jazz;
