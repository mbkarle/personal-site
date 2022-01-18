import React from "react";
import { StaticImage } from "gatsby-plugin-image";

export const CTAs = [
  "work",
  "chat",
  "build",
  "make music",
  "make products",
].map((action) => action + " together.");

export const ACTIVE_DELAY = 5000;
export const STATIC_DELAY = Infinity;

// TODO: add icons, descriptions
export const ACTIVITIES = [
  {
    title: "Dunster House",
    description:
      "The objectively greatest house. Find me in the dining hall, running Smash Ultimate with the blockmates, or representing on the pitch for as many intramurals as I can manage. Roll Moose!",
    Icon: () => (
      <StaticImage
        src="../../../images/dunster.png"
        alt="Dunster House coat of arms"
      />
    ),
  },
  {
    title: "HOC",
    description:
      "The [Harvard Outing Club](https://www.harvardoutingclub.org/) is my favorite thing that I'm up to on campus right now! Great people and the great outdoors - what’s not to love?",
    Icon: () => (
      <StaticImage
        src="../../../images/hoc.jpeg"
        alt="HOC organization symbol"
      />
    ),
  },
  {
    title: "FOP",
    description: `The first-year outdoor program is an amazing orientation for incoming freshmen, and fittingly has one of the most wonderful communities on campus`,
    Icon: () => <StaticImage src="../../../images/fop.png" alt="FOP logo" />,
  },

  {
    title: "CS50 Course Assistant",
    description:
      "A big part of my fall semester! Weekly tutorials were not only an excuse to post up in Dunster D-Hall but also to enjoy some teaching.",
    Icon: () => (
      <StaticImage src="../../../images/cs50.jpeg" alt="CS50 Github Avatar" />
    ),
  },
  {
    title: "Jamming Out",
    description:
      "Not in a formal group but I love to play music! Piano is my main, but I dabble in guitar, bass, drums, and even a little singing.",
    Icon: () => (
      <StaticImage
        src="../../../images/piano-icon.png"
        alt="Musical notes icon"
      />
    ),
  },
  {
    title: "Lifting",
    description:
      "If we’re being real, I do spend a good bit of time at the gym. Currently trying to run an nSuns program.",
    Icon: () => (
      <StaticImage
        src="../../../images/dumbbell-icon.png"
        alt="Dumbbell icon"
      />
    ),
  },
];

export const EMAIL = "mkarle2178@gmail.com";
