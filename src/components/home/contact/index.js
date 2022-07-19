import * as styles from "./contact.module.scss";

import React, { useMemo, useState, useEffect } from "react";
import mergeDefaults, { mergeClassName } from "utils/merge-defaults";
import { usePlaybackSequence } from "hooks/text-playback";
import SnapScroller from "components/basics/snap-scroller";
import { useIsOnScreen } from "hooks/intersection-observer";
import { useIsMobileSize } from "hooks/window-size";
import { copyToClipboard } from "utils/str";
import { CTAs, ACTIVITIES, ACTIVE_DELAY, STATIC_DELAY, EMAIL } from "./data";
import MD from "components/basics/md";

const Contact = (props) => {
  return (
    <SnapScroller.Panel
      {...mergeDefaults({ className: styles.container }, props)}
      id="contact"
    >
      <div className={styles.content}>
        <Header />
        <div className={styles.subheader}>
          Whether you mean strictly business, or you’re just looking to be
          carried in Rocket League, I’d love to get in touch: {EMAIL}
        </div>
        <CopyEmail />
        <div className={styles.separator} />
        <div className={styles.subheader}>
          And if you’re in Cambridge, you might find me involved with this good
          stuff on campus:
        </div>
        <div className={styles.campusContainer}>
          {ACTIVITIES.map(({ title, description, Icon }, idx) => (
            <div className={styles.activity} key={`${title}-${idx}`}>
              {Icon && (
                <div className={styles.activityIcon}>
                  <Icon />
                </div>
              )}
              <div className={styles.activityText}>
                <div className={styles.activityHeader}>{title}</div>
                <MD className={styles.activityDescription}>{description}</MD>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </SnapScroller.Panel>
  );
};

const Header = (props) => {
  const [element, setElement] = useState(null);
  const isOnScreen = useIsOnScreen({ element });
  const isMobileSize = useIsMobileSize();
  const delay = useMemo(
    () => (!isMobileSize && isOnScreen ? ACTIVE_DELAY : STATIC_DELAY),
    [isOnScreen]
  );
  const header = usePlaybackSequence(CTAs, 80, delay);

  return (
    <div
      {...mergeDefaults({ className: styles.header }, props)}
      ref={setElement}
    >
      Let’s {header}
    </div>
  );
};

const CopyEmail = ({ delay = 2000, ...props }) => {
  const [isClicked, setClicked] = useState(false);
  useEffect(() => {
    if (isClicked) {
      const timeout = setTimeout(() => setClicked(false), delay);
      return () => clearTimeout(timeout);
    }
  }, [isClicked, delay]);

  const handleClick = () => {
    setClicked(true);
    copyToClipboard(EMAIL);
  };

  return (
    <button
      className={mergeClassName(styles.button, styles.emailButton)}
      onClick={handleClick}
      {...props}
    >
      {isClicked ? (
        <div>Email Copied!</div>
      ) : (
        <div>
          <CopyIcon />
          Copy Email
        </div>
      )}
    </button>
  );
};

const CopyIcon = (props) => (
  <svg
    width={13}
    height={16}
    viewBox="0 0 13 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.895 0H1.368C.616 0 0 .616 0 1.368v8.895c0 .377.308.684.684.684a.686.686 0 00.684-.684v-8.21c0-.377.308-.685.685-.685h6.842a.686.686 0 00.684-.684A.686.686 0 008.895 0zm2.737 2.737H4.105c-.752 0-1.368.616-1.368 1.368v9.58c0 .752.616 1.368 1.368 1.368h7.527c.752 0 1.368-.616 1.368-1.369V4.105c0-.752-.616-1.368-1.368-1.368zM4.789 13.684h6.158a.686.686 0 00.685-.684V4.79a.686.686 0 00-.685-.685H4.79a.686.686 0 00-.684.684V13c0 .376.308.684.684.684z"
      fill="#404D61"
    />
  </svg>
);

const Footer = (props) => (
  <div {...mergeDefaults({ className: styles.footer }, props)}>
    <div className={styles.attribution}>
      <MD className={styles.footHeader}>By Matt Karle, 2022</MD>
      <MD>{`Peep the [source](https://github.com/mbkarle/personal-site).`}</MD>
      {/*<MD>{`Icons by [Freepik](https://www.flaticon.com/free-icons/cone)`}</MD>*/}
    </div>
    <div className={styles.footerLinks}>
      <MD className={mergeClassName(styles.footHeader, styles.merge)}>
        More Links
      </MD>
      <MD>{`[GitHub](https://github.com/mbkarle)`}</MD>
      <MD>{`[LinkedIn](https://www.linkedin.com/in/matthew-karle-631556155/)`}</MD>
      <MD>{`[Resume](https://drive.google.com/file/d/1GwH-7WsPuWouclrWNsAxXJ0CER0Av5VU/view?usp=sharing)`}</MD>
      <MD
        className={styles.merge}
      >{`Icons by [Freepik](https://www.flaticon.com/free-icons/cone)`}</MD>
    </div>
  </div>
);

export default Contact;
