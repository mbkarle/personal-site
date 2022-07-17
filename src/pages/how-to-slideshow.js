import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import Document from "components/basics/document";
import MD from "components/basics/md";
import Slideshow from "components/basics/slideshow";

const PREFACE = `A carousel of the nature pictured below has become a somewhat commonplace bit of UI, as popularized by Instagram and similar applications.  Many component libraries offer their own plug-and-play implementations of this item, but as a budding React enthusiast and aspiring **Competent Programmer**, I decided to take a stab at rolling my own variation from scratch, and thought I'd record some of the details and choices that went into the process as a neat, self-contained code example.

`;

const SPECS = `## Consumer Considerations 
There were a number of specifications around which I wanted to build my version of the carousel.
1. Most importantly, I wanted it to feel as reusable as a component library's offering. It should be simple and declarative to drop in anywhere on the DOM with minimal wiring to be done in the parent component.  
2. It should be easily and intuitively customized, with minimal constraints on what kind of content can populate a slide.  
3. Though it should operate independently, the consumer should be able to synchronize separate content with changes to active slides.
`;

const SUBCOMPONENT = `An early design choice made towards promoting flexibility was to use a subcomponent pattern, which made it simple for a consumer to take advantage of the tight coupling of the slideshow container and its constituent slide components without loss of customizability:
\`\`\`
const Consumer = () => (
  <Slideshow {...containerProps}>
    <Slideshow.Slide {...someProps}>Some Content<Slideshow.Slide>
    <Slideshow.Slide {...otherProps}>Different Content</Slideshow.Slide>
  </Slideshow>
);
\`\`\`
The resulting style for consumers is intuitive, readable, and declarative. Subcomponent patterns are especially popular among component libraries for this reason, and enable even more complicated coupling of logic than is needed in my slideshow - for instance, it is an ideal pattern for React contexts, as the context creators and consumers are bound together in a single abstraction. At the same time, the pattern rejects *too much* abstraction, as can become an issue in bloated React components that attempt to surface all options in endless arbitrary props, or as illustrated more infamously by the [jQuery datepicker](https://api.jqueryui.com/datepicker/).
`;

const STYLE = `Now that it was possible to couple styles between the slide container and its slides, I had to decide the best way for my drop-in component to size intuitively. For simplicity, I opted to make my slideshow square by default and fill the width of its parent container. Maintaining such a fixed aspect ratio with a variable width required a little non-trivial CSS trick, which I was luckily familiar with already from having styled video containers with 16:9 constraints and the like. The key idea is that padding values given in percent units are derived as a percentage of content width, so setting \`padding-top: 100%\` gives as much padding as the container is wide.`;

const INTERNALS = `## Internals
With some notions of how the component could be used by a consumer, I next had to decide the details of its internal functionality.
This actually underwent significant iteration between initial design and the final product.

Consistent across both iterations was a consistent setup stylistically, where slides would be rendered in the DOM but only visible through the containing “viewport”, which would hide the overflowing content.
Using JavaScript's vanilla scrolling API, it was simple to build a function to trigger movement along this continuous tape of content. The extent of movement would simply be the width of the parent container, which would be determined after the initial render and maintained with window resize events that might affect its width.

I wanted to track internally which slide was active, and surface this information via an \`onChange\` prop pattern which would fire events to the consumer when the active index was updated.

In my initial build, I maintained the active index imperatively, baking it into the scrolling function such that a forward or backward scroll would increment and decrement the state accordingly. This seemed sensible enough, as ostensibly this function (triggered by arrow buttons on either side of the slideshow) would be the only possible source of change for the content displayed.

\`\`\`
// Iteration One Example

const Slideshow = ({ onChange }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollContainer, ref, scroll] = useScrollContainer();

  const triggerScroll = (isRight) => {
    direction = isRight ? 1 : -1;
    // trigger scroll in dom
    scroll({ left: direction * scrollContainer?.offsetWidth });

    // update state and fire state change event
    setActiveIdx((current) => {
      const nextIdx = current + direction;
      onChange?.(nextIdx);
      return nextIdx;
    });
  }

  // ... render
};
\`\`\`

However, a number of issues with this assumption emerged that prompted me to change this detail. One that was especially prevalent when developing but seemed feasible to arise in production as well was that sometimes the scroll offset of the content would cache while the active index state would not, meaning that other content dependent on the active index would become out of sync with what was actually displayed. And looking to improve the mobile experience, I realized I couldn't support what would have been a simple swipe to change slides implementation because it wouldn't use the imperative scroll function, and so wouldn't update the index.

Therefore, I revamped the internal logic to attach a scroll event listener to the scrolling container, which would determine on any movement (and initialization) what the active index ought to be depending on the scroll offset.

\`\`\`
// Iteration Two Example

const Slideshow = ({ onChange }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollContainer, ref, scroll] = useScrollContainer();

  // listen for scrolls
  useEffect(() => {
    if (scrollContainer) {
      const scrollDistance = scrollContainer.offsetWidth
      const updateIdx = (currScroll) => {
        const idx = Math.floor(
          (currScroll + scrollDistance / 3) / scrollDistance
        );
        if (idx != activeIdx) {
          setActiveIdx(idx);
          onChange?.(idx);
        }
      };

      // set index on initial render
      updateIdx(scrollContainer.scrollLeft);

      // function to handle index updates on scroll
      const onScroll = ({ target }) => {
        updateIdx(target?.scrollLeft);
      };

      // add scroll handler to scrollContainer
      scrollContainer.addEventListener("scroll", onScroll);

      // remove event listener on dismount
      return () => scrollContainer.removeEventListener("scroll", onScroll);
    }
  }, [scrollContainer, activeIdx, onChange]);

  const triggerScroll = (isRight) => {
    direction = isRight ? 1 : -1;
    // trigger scroll in dom
    scroll({ left: direction * scrollContainer?.offsetWidth });
  };

  // ... render
};
\`\`\`
`;

const FUTURE = `## Future Optimizations
At the moment this component does exactly what I need it to, with minimal effort needed as I drop it into novel use cases across the site. However, if I were to publish such a component, I'd need to do a bit more work.

Some considerations worth noting:

1. Stylistic flexibility: it was convenient for me to constrain the slideshow to a square aspect ratio and bake specific buttons into the component itself, since these would save me time in future consuming use cases. However, it's likely another product would not want these features at all. A more future proof way of writing this component from the beginning with regard to these decisions might have been to pull these specifics into a composing parent component, so at a lower level a more generic component would exist.
2. Performance: since I never have that many slides, it's fine to render them all in the browser in one go. This is doubly okay considering Gatsby's \`IntersectionObserver\` based image lazy-loading. However, in the absence of such a feature, or with sufficient numbers, it would not make sense to render variable-size N images all at once. Instead, a more performant component would lazy load a sliding window of content around its active index.
`;

const CLOSING = `On the whole, I had a lot of fun rolling my own component here and pretending that it would have to fit the needs of a wider audience of potential consumers. I was also glad to have the opportunity to explore some of the elegance of abstraction in React via hooks and components. Considering the plethora of UI library options out there, though, it certainly was not the most “scrappy” endeavor... but that's ok! So often the fun is in the details.`;

const HowTo = (props) => {
  return (
    <Document {...props}>
      <Document.Header>Slideshow Code Walkthrough</Document.Header>
      <Document.Separator />
      <Document.Body>
        <MD>{PREFACE}</MD>
        <Document.Center>
          <div
            style={{
              maxWidth: "calc(100vw - var(--page-margin) * 2)",
              width: "min(250px, 95vw)",
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
                  src="../images/jazz-nap.png"
                  alt="Jazz napping with me"
                  layout="fullWidth"
                />
              </Slideshow.Slide>
            </Slideshow>
          </div>
          <div>An example of image carousel UI</div>
        </Document.Center>
        <MD>{SPECS}</MD>
        <MD>{SUBCOMPONENT}</MD>
        <Document.Br />
        <MD>{STYLE}</MD>
        <Document.Br />
        <MD>{INTERNALS}</MD>
        <MD>{FUTURE}</MD>
      </Document.Body>
      <Document.Separator />
      <Document.Body>
        <MD>{CLOSING}</MD>
      </Document.Body>
    </Document>
  );
};

export default HowTo;
