import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import Document from "components/basics/document";
import * as styles from "./schoolwork.module.scss";

export const HEADER = `Classes Taken; Lessons Learned`;
export const SUBHEADER = `(Yet another blog post disguised as employer-facing case studies)`;
// export const PREFACE = `One of my favorite quotes these days is Annie Dillard's musing: "how we spend our days is, of course, how we spend our lives." I think of it often, and it reminds me to be present and intentional in how I spend my time - although more in a “go for a walk” kind of way than trying to optimize productivity toward some great entrepreneurial ambition.`;

export const PREFACE = `On several occasions I’ve bothered friends with an inarticulate musing that “college is, currently, life.” Though I never get much better at explaining why, it really does perpetually astound me that as structured and ostensibly singly-purposed as college is, it is no less a time for personal growth, change, connection - for living - than any other of our years. As such, it’s incredibly daunting to approach any rigorous reflection on my undergraduate experience so far, and is something of a relief to follow the constraint of strictly peering through the lens of Computer Science classes. Tellingly, I suspect the themes of growth and connection will remain just as apparent, even in this limited framework. I think that's pretty cool.`;

export const CONTENTS = `## Contents
* [CS50: Intro to Computer Science](/schoolwork#CS50)
* [CS124: Data Structures & Algorithms](/schoolwork#CS124)
* [CS121: Theoretical Computer Science](/schoolwork#CS121)
* [CS242: Computing at Scale](/schoolwork#CS242)
* [CS181: Machine Learning](/schoolwork#CS181)
* [CS152: Programming Languages](/schoolwork#CS152)
`;

const CS50 = (
  <>
    <Document.MD>{`## CS50: Intro to Computer Science
The entrypoint to college CS at Harvard. Coming in with some experience, I didn’t always realize how enriching CS50 was for me, and largely let it take a back seat to my more intense linear algebra course. Returning to the class years later on the course staff, I realized how far from “knowing it all” I had been, and how much I had grown within the one class alone. My purportedly deep prior experience involved some work in Java, Python and Web Dev, with comfort writing basic control flows and using abstraction - all great things, **but** I had no idea what a pointer really was, thought that optimal algorithms used the least lines of code, and had written my high school web backends to be stateful (literally saving client tokens in global variables - oops) and ignored the concurrent user issues. CS50 remedied all of these and more, though I was often too focused on demystifying eigenvectors and single value decomposition to particularly notice.

The most tangible outcome of CS50 was of course its [final project](https://github.com/mbkarle/IdentityInsight), which I worked on with my very good friend and eventual constant CS partner-in-crime, Luke Bailey.`}</Document.MD>
    <Document.Center className={styles.bodyCenter}>
      <Document.Youtube videoId="k-ZsSXN_0Mo" />
    </Document.Center>
    <Document.MD>{`As demonstrated in our very professional video, the project was **IdentityInsight**, an iOS app that could identify all of your friends in the room from a photo taken in-app. Although we pitched it as (rather unreliable) tooling for the visually impaired for the sake of the project proposal, most of our motivation stemmed from the fact that this was the perfect intersection between impressive (to a layperson) and easy (or so we thought). We of course had no intention of redesigning neural architectures or training a model; we'd simply surface a pre-trained model to our frontend via a REST API.

Some notes on implementation:
* Swift for iOS mobile frontend
* Node.js Express for HTTP server
* Python for face recognition

A more detailed examination of our stack reveals some commendable knowledge but also quite a bit of hubris (surely never from my humble partner though) and “jank.” To run our python face recognition scripts from a Node backend, we spawned the script as an additional process on the server itself (primitive microservices, if you will); meanwhile, our database of images was similarly just files being written to disc on the machine (horizontal scaling is overrated). On the frontend, a package management issue resulted in what appears to be a rather large networking library being tossed right into our repo, whose extensive documentation is the reason our code is reported as 88.5% HTML.

Despite all of my poking fun and jabs now, 3 years and as many internships later, we clearly had a lot of fun with this project and learned a ton. We built a legit iOS frontend and *stateless* Node backend, and solved real software issues like wrestling with middleware configurations and integrating third party libraries.

And believe it or not, though we couldn’t have told you what a backend architecture was, we did write *all* of the backend code in Vim. Priorities.
`}</Document.MD>
  </>
);
const CS124 = (
  <Document.MD>{`## CS124: Data Structures & Algorithms
CS124 fundamentally changed the way I view computer science. It was hard, and every day I was reminded that this was not quite what I had promised myself when I said I’d “take it easy next semester” right before winter break gave me rose-tinted glasses and clinical amnesia. **But** it was also very rewarding. Here was an all new approach to problem solving and critical thinking. It was totally foreign at first, but gradually became familiar, if not quite second nature. I’ve long loved the feeling of tangible growth returns on effort - incidentally why nordic skiing is my favorite sport - and CS124 provided this in spades, bringing me from total misconceptions (as described [above](/schoolwork#CS50)) to rigorously proving optimality of algorithms of my own design.

Perhaps the most tangible deliverables of the course were its programming assignments, which were always very interesting and a blessed reprieve from the much harder theoretical problem sets. They were the kind of crazy problems where Python would take days to generate results, and Luke Bailey and I had fun being hardcore C stalwarts. Even then, surprising optimizations were often necessary, like generating and discarding random edges on the fly in Prim’s Minimum Spanning Tree algorithm since the full graph would be too large for even modern hardware.

The three assignments (links go to writeups!) were as follows:
### [Minimum Spanning Tree](https://github.com/mbkarle/minimum-spanning-trees/blob/master/writeup.pdf)

In brief: an MST is the subset of edges in a graph that connects all vertices acyclically and minimizes the sum of its edge weights. That is, each vertex in the graph is connected by a single path of edges without cycles (a spanning tree), and those edges collectively have the smallest weights relative to other potential spanning trees (the *minimum* spanning tree). Prim’s algorithm gives a polynomial time greedy solution, basically by iteratively building S, the set of vertices in the tree so far (the algorithm ends when S contains all), and at each step taking the minimal edge that connects some vertex in S with one “across the cut” in the set of unclaimed vertices S'.

In the assignment, Luke and I got to implement Prim’s in C with some fun handrolling of heaps underlying the algorithm, and then test it in some truly ridiculous problem spaces (up to \`2^18\` vertices!). Read more in the linked writeup, if interested!
### [Strassen's Cutoff](https://github.com/mbkarle/strassen-cutoff/blob/data_collection/writeup.pdf)

Just as my misconceptions that optimality was derived from fewer \`if\` statements were being dispelled, and I was beginning to get comfortable with big O notation instead, this assignment threw me through another loop. The cutoff in question refers to the surprising notion that naive algorithms can outperform asymptotically “optimal” ones on small enough inputs - after all, \`f = O(g)\` definitionally grants only that there exists some (potentially massive) \`N\` after which \`f(n) <= cg(n)\` for all \`n > N\` and some constant \`c\`. For recursive algorithms that match this description, the true optimal algorithm would thus be one which switches between asymptotically optimal and naive algorithms at the appropriate \`N\`. Merge sort, for instance, is improved dramatically if one switches to naive sort at a certain array size rather than dividing and conquering all the way down to 1-element arrays.

Matrix multiplication is another concrete example where the clever O(n^2.8) Strassen’s algorithm is improved by switching to O(n^3) naive multiplication. Our job in this assignment was not only to optimally implement Strassen’s algorithm, but also to determine an empirically optimal cutoff. The former task involved some buffer reuse craziness to achieve best results - a far cry from the all-you-can-eat buffet of array instantiation I’d be working with in React the following summer. The latter task was a very cool exercise in data analysis, as we tried to rigorously demonstrate what corresponded with best performance, and did cool things like graph average relative ranks of cutoffs in order to do so. I could put the graphs here to spice up this wall of text, or I could hope their absence incentivizes checking out the writeup instead...
### [Number Partition Problem](https://github.com/mbkarle/number-partition/blob/data-collection/partition_write_up.pdf)

The number partition programming assignment is around the time when I started saying “heuristic” incessantly, to the chagrin of all around me. The problem asks whether a list of positive integers can be split into disjoint, exhaustive halves (partitions) S and S' such that the sum of consituent elements in S equals that of S'. It’s an NP-Complete problem, but can be approximated with surprising accuracy by a number of heuristics, as well as solved in pseudo-polynomial time (polynomial with respect to largest element rather than input length). This assignment involved writing a number of these heuristics and algorithms and testing their results and empirical speed on random inputs. It was pretty cool, and totally put into perspective that time I wrote a genetic algorithm in high school and felt like I was on the cutting edge of computer science research (I was not).

As far as my ceaseless use of “heuristic” as soon as I vaguely gleaned its meaning: I think just about everything we do in life is putting heuristics in action; all our decisions are guided by unprovably but intuitively decent approaches towards local optima, and it’s impossible to gather much insight into the likely tortuous path that could lead to any real global extreme. So yeah, it comes up kinda often.
    `}</Document.MD>
);
const CS121 = (
  <>
    <Document.MD>{`## CS121: Theoretical Computer Science
Okay, so this course didn’t have any programming assignments or flashy final projects for me to showcase (*theoretical* computer science) so instead we’ll do a little story time.
`}</Document.MD>
    <Document.Center className={styles.bodyCenter}>
      <StaticImage
        className={styles.storyTime}
        src="https://www.franksarrislibrary.org/wp-content/uploads/2017/01/storytime-bookworm.jpeg"
        alt="Story Time!"
      />
    </Document.Center>
    <Document.MD>{`
When I was in junior year of high school, I was briefly a physics god. I really don’t say this to boast (note the foreshadowing - it didn’t last forever), but for a notably long stretch of time, I was doing consistently remarkably well in what peer consensus had decisively dubbed a very difficult course. My beloved teacher, Mr. Rideout, was already making clear his hopes that I would pursue a dissertation in physics - but I knew my secret. The truth was that for those opening units on mechanics, I really *cared*. I had recently been playing around with Unity’s 3D game engine, and I was fascinated by the idea of being able to model all the movement around me by the equations I was learning in class; in other words, I was putting together an imaginary physics engine as I went. In the same way that I had pored over Lego catalogues as a kid and imagined playing with the sets, I spent hours staring at the textbook and imagining how that information would come together in my engine. Once or twice I looked at extra problems not on the homework; more importantly, I was just engaged with the material. Every fact was turned over in my head a second time, examined and applied in examples of my imagination. Naturally the fall in my prestige arrived when we moved on to electricity, and I realized that I cared more about girls than circuit diagrams, as one should.

The short moral of a long-winded story is that in this time, I developed an obsessive certainty in the growth mindset: there was nothing exceptional about my intrinsic aptitude for physics - sure, I had learned to become generally a good test-taker over the years through turning my panic into marks on paper, but I wasn’t particularly quick with mental math or whatever else might naturally distinguish a true physics intellectual. Instead, my success had been a function of my intentional engagement with the material, and indeed had dropped off as I began to care less. Though I certainly didn’t have the bandwidth to engage meaningfully with everything, I could do so with *anything*, and that was empowering.

So years go by, and CS121 comes around. I was at Harvard, and I was taking classes with international champs in computer science and math. Still I refused to admit that they were all that much “smarter” than me, or conversely, that I was all that much “smarter” than anyone else. I clung to my growth mindset like it was the last ration in my lifeboat of self-esteem, adrift in the ocean of would-be imposter syndrome. CS124, some one and a half years prior, had been challenging for me in a way that was not strictly encouraging (though notably, engagement plummeted when covid sent me away from my life at college). Nonetheless, it had been rewarding, and I had dubbed myself a “theory guy”, meaning that this stuff was interesting to me, and I would thus engage with it, and thus gain mastery of the material. Now, after a whole gap year away from academics and anything theory, I was in *the* Theoretical Computer Science class. This was a test of everything I believed in with respect to learning and growth and what “intelligence” really was.

It makes me very happy to say that my beliefs were reaffirmed. Not because I cared that much about the grade specifically, but because the growth mindset is such a powerful tool, and encourages me to challenge myself and try new things. Though I was at times limited by other commitments and an increasing realization that my days at school were days of life, and life should involve more than studying, I did care about CS121, and did engage with the material deeply. I turned proof techniques over in my head and thought about why they made sense, instead of memorizing or counting on my 1-page single-sided cheat sheets. And I did well. I was a theory guy after all, not because I always was, but because I had chosen to be.
    `}</Document.MD>
  </>
);
const CS242 = (
  <Document.MD>{`## CS242: Computing at Scale
Wow this is the class that actually had some cutting edge research and I haven’t even written about it yet.
`}</Document.MD>
);
const CS181 = (
  <Document.MD>{`## CS181: Machine Learning
I swear I have fun things to say about these other classes too.
`}</Document.MD>
);
const CS152 = (
  <Document.MD>{`## CS152: Programming Languages
I was just so stoked about my first three write-ups that I *had* to publish. You don’t mind, right?
`}</Document.MD>
);

export const CLASSES = { CS50, CS124, CS121, CS242, CS181, CS152 };
