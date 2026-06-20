import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const story = [
  {
    year: "2021",
    title: "The Beginning",
    description:
      "Our journey started with a simple idea: create skincare that feels luxurious while delivering real results.",
    image:
      "https://res.cloudinary.com/dqe36doqn/image/upload/v1781967985/FAI-BE-02B_cieeve.jpg",
  },
  {
    year: "2022",
    title: "Ingredient Research",
    description:
      "We spent months researching premium botanical ingredients and advanced formulations.",
    image:
      "https://res.cloudinary.com/dqe36doqn/image/upload/v1781969025/FAI-BE-04A_zfdwib.gif",
  },
  {
    year: "2023",
    title: "Testing & Refinement",
    description:
      "Every formula was carefully tested and improved until we achieved the perfect balance.",
    image:
      "https://res.cloudinary.com/dqe36doqn/image/upload/v1781969322/FAI-BE-05_npqsbj.jpg",
  },
  {
    year: "2024",
    title: "First Launch",
    description:
      "Our first collection launched and quickly became loved by customers seeking effective skincare.",
    image:
      "https://res.cloudinary.com/dqe36doqn/image/upload/v1781969372/FAI-BE-09A_vvq6iy.jpg",
  },
  {
    year: "Today",
    title: "Growing Together",
    description:
      "We continue innovating while staying true to our mission of quality and transparency.",
    image:
      "https://res.cloudinary.com/dqe36doqn/image/upload/v1781966736/FAI-BE-04B_kough0.jpg",
  },
];

const HistoryTimeline = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          // end: () => `+=${track.scrollWidth}`,
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white font-[Dahlia]"
      // style={{
      //   height: `${story.length * 100}vh`,
      // }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 w-full z-20 px-12 md:px-24 pt-12 tracking-wide">
          <p className="uppercase tracking-[0.6em] text-sm text-neutral-500">
            Our Story
          </p>

          <h2 className="text-4xl md:text-6xl font-light mt-4">
            From Vision To Reality
          </h2>

          <div className="w-full h-px bg-black/10 mt-4" />
        </div>

        {/* Horizontal Track */}
        <div
          ref={trackRef}
          className="flex h-full mt-5"
          style={{
            width: `${story.length * 100}vw`,
          }}
        >
          {story.map((item, index) => (
            <section
              key={index}
              className="w-screen h-screen flex items-center px-10 md:px-24"
            >
              <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
                {/* Image */}
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] rounded-[32px]" />

                  <img
                    src={item.image}
                    alt={item.title}
                    className=" w-full h-[500px] object-cover rounded-[32px] opacity-99"
                  />
                </div>

                {/* Content */}
                <div className="relative">
                  <span
                    className="
                      absolute
                      -top-20
                      left-0
                      text-[120px]
                      md:text-[180px]
                      font-bold
                      text-black/[0.05]
                      select-none
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="uppercase tracking-[0.4em] text-sm text-neutral-500">
                    {item.year}
                  </p>

                  <h3 className="text-5xl md:text-7xl font-light mt-4 leading-tight">
                    {item.title}
                  </h3>

                  <p className="mt-8 text-lg text-neutral-600 leading-relaxed max-w-xl tracking-[0.2em]">
                    {item.description}
                  </p>

                  <div className="mt-10 flex items-center gap-4">
                    <div className="w-12 h-px bg-black/30" />

                    <span className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                      Chapter {index + 1}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      
    </section>
  );
};

export default HistoryTimeline;