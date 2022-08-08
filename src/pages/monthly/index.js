import React from "react";
import Document, { QuickInfo } from "components/basics/document";
import * as styles from "./monthly.module.scss";

const Monthly = (props) => {
  return (
    <Document className={styles.monthlyDoc} {...props}>
      <Document.Header>{`Monthly, months later`}</Document.Header>
      <Document.Body>
        <Document.MD>{`Revisiting my first full-time year in tech`}</Document.MD>
      </Document.Body>
      <Document.Separator />
      <Document.Body>
        <div className={styles.row}>
          <QuickInfo right={16}>
            <QuickInfo.Header>Quick Facts</QuickInfo.Header>
            <QuickInfo.Separator />
            <QuickInfo.Row top={8}>
              <div>Period:</div>
              <div>Sep. 2020 - Aug. 2021</div>
            </QuickInfo.Row>
            <QuickInfo.Row top={8}>
              <div>Role:</div>
              <div>Full Stack Engineer</div>
            </QuickInfo.Row>
            <QuickInfo.Row top={8}>
              <div>Tech Stack:</div>
              <QuickInfo.Col>
                <div>Web FE - React</div>
                <div>BE - Flask</div>
                <div>Mobile FE - React Native</div>
              </QuickInfo.Col>
            </QuickInfo.Row>
          </QuickInfo>
          <div>
            <Document.MD>{`As I write this, Monthly is rebranded to Studio, and I am finishing the last week of my second summer here, now as a “Studient” rather than a “Monthlete”. Given the discreteness of my two periods of employment at Studio (since there was [school](/schoolwork) in between, and plenty of it), I figured I’d write a second, separate reflection about this summer and constrain this one to the first year alone. There should be little concern about filling the space anyways; frankly, I’m not really sure where to start. Over the course of that year, I lived in Montana, Vermont, and Massachusetts; I navigated the vast majority of my fledgling college friendships remotely (with questionable success); and I gained unique insight into what post-grad life could look like in software. As much as I’d love to dive into the first two bullets, for the sake of some meager measure of professionality we’ll start with the last.`}</Document.MD>
          </div>
        </div>
        <Document.MD>
          {`Compared to the tortuous backdrop of a raging pandemic, my daily life at Monthly was relatively simple. I worked, and I got better at working. The feedback loops baked into development made sure of that. For the first time in my programming career, every line of code I wrote was meticulously scrutinized, and in response to my growing fear of the glaring red “Changes Requested” icon, I learned to scrutinize them myself first. Broader lessons began to stick, too - a clever trick wasn’t always preferable if it was hard for another dev to understand; and code styles could be pretty broadly descriptive, with the real enemy usually being my laziness in applying them. Though I battled daily to avoid their critique in review, I quickly grew to love and admire my fellow engineers. I was the third IC, and we made for a pretty tight-knit crew. I always came to daily standup with jokes and a dry, youthful sense of humor - isolated as I was most of the year, laughter on muted zoom screens often had to do.  
          Though the full stack title suggested an even balance of frontend and backend work, it really translated to doing whatever the product needed, which often looked like lots of frontend features, touching the backend only insofar as it facilitated that work. This was largely fine by me, as I was developing a real attachment to the React framework and its abstract, declarative elegance. As I read articles, watched talks, and shipped features, I grew opinionated about patterns like never before. I wanted more custom hooks and fewer arbitrary props; everything should be reusable and maybe while we're at it they should all be subcomponents because boy do I love those. By the end of my internship, I presented on my knowledge of React, though true to form I ran out of time telling a year’s worth of callbacks and jokes and hardly scratched the surface of my deep-rooted preferences.  
          Among all the projects I worked on - an interactive shoe-builder, a mobile-app comment system, an unsaved-changes-safe auto-update (to name a few) - my work was probably best embodied by the Monthly Plus subscription push. We were launching a brand new yearly subscription, and as all the backend work of this substantial endeavor was delegated elsewhere and practically every frontend ticket given to me, I realized that I had built myself an impregnable React comfort zone, in which I was now a little stuck. However, the seduction of the comfort zone is, of course, that it is comfortable, and I was more than happy to have the great responsibility of leading frontend development on a project so central to company direction. It was the hardest I worked all year, reconvening daily with our project team to update on fine-grain deadlines, with little tolerance for delay. To my great pride, we launched on time, and it was my promotion page that prompted thousands of customers to subscribe in those opening weeks, my checkout modal that processed all of their transactions, and my celebratory splash screen that greeted each of them after their successful purchase. What’s more, reusability had been my guiding principle the whole way, and I felt I had left the codebase with a strong new suite of general components, from animated carousels to custom payments UI.  
          ... To Be Continued!
          `}
        </Document.MD>
      </Document.Body>
    </Document>
  );
};

export default Monthly;
