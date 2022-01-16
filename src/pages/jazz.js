import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import Document from "components/basics/document";
import Slideshow from "components/basics/slideshow";

const Jazz = (props) => {
  return (
    <Document {...props}>
      <Document.Header>Jazz, My Pup</Document.Header>
      <Document.Body>
        The lucky dog gets a whole page to herself since I featured Tuck on the
        homepage.
      </Document.Body>
      <Document.Center>
        <div
          style={{
            width: "600px",
            margin: "32px",
            borderRadius: "8px",
            overflow: "hidden",
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
        Jazz is a 10 year old beagle + english-shepherd mix and a good girl.
      </Document.Center>
    </Document>
  );
};

export default Jazz;
