import React from "react";
import { StaticImage } from "gatsby-plugin-image";

export const PROJECTS = [
  {
    title: "Monthly",
    time: "Sep. 2020 - Aug. 2021",
    to: "/coming-soon",
    description:
      "I took a year off from school in 2020 to work full time at Monthly. In my time there I grew so much as an engineer and got to work on loads of cool projects. Read about it here!",
    Image: () => (
      <StaticImage
        src="../../../images/monthly-project.png"
        alt="Screenshot of Monthly website"
      />
    ),
  },
  {
    title: "Project Jeff",
    time: "Sep. 2021 - Nov. 2021",
    to: "/project-jeff",
    description: `My designer at Monthly and good friend Jeff hired me as a solo contractor to implement his portfolio site. Though reasonable in scope as a static site, there were plenty of challenges to overcome between rich interactions, responsive design, and integrating with a CMS to alleviate the technical burden of future updates. More of my thoughts here.`,
    Image: () => (
      <StaticImage
        src="../../../images/project-jeff.png"
        alt="Screenshot of Jeff's portfolio"
      />
    ),
  },
  {
    title: "Schoolwork",
    time: "Sep. 2019 - Present",
    to: "/schoolwork",
    description: `I love my classes at school! Most of what I’ve done so far has tended to be more theoretical (which is fine by me, I like a mix!), but once in a while things get a bit more applied. Ranging from mobile apps to neural architecture search research, here are some fun projects I had a hand in during my studies so far.`,
    Image: () => (
      <StaticImage
        src="../../../images/bigger-and-faster.png"
        alt="Screenshot of NAS research paper"
      />
    ),
  },
];
