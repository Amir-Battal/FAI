import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ThreeD from "./components/ThreeD";
import Navbar from "./components/Navbar";

import ProductNada from "./components/ProductNada";
import ProductSafaa from "./components/ProductSafaa";
import ProductGhasaq from "./components/ProductGhasaq";
import ProductNadaParticles from "./components/ProductNadaParticles";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const sections = sectionsRef.current;

    const ctx = gsap.context(() => {
      // ترتيب الطبقات
      sections.forEach((section, index) => {
        gsap.set(section, {
          zIndex: index + 1,
        });
      });

      // كل السكاشن ماعدا الأولى تبدأ أسفل الشاشة
      gsap.set(sections.slice(1), {
        yPercent: 100,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${sections.length * 100}%`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      sections.slice(1).forEach((section) => {
        tl.to(
          section,
          {
            yPercent: 0,
            ease: "none",
            duration: 1,
          },
          ">"
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />

      {/* الخلفية الثابتة */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <canvas className="webgl" />

        <ThreeD />

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70">
          <div className="animate-bounce text-center">
            <p className="text-sm">اكشف المزيد</p>
            <span className="text-2xl">↓</span>
          </div>
        </div>
      </div>

      {/* مساحة البداية */}
      <div className="h-screen" />

      {/* Stack Container */}
      <main
        ref={containerRef}
        className="relative z-10 h-screen overflow-hidden"
      >
        {/* Section 1 */}
        <section
          ref={(el) => (sectionsRef.current[0] = el)}
          className="absolute inset-0 w-full h-screen bg-white"
          style={{
            clipPath: "polygon(0 30px,100% 0,100% 100%,0 100%)",
          }}
        >
          <ProductNada />
        </section>

        {/* Section 2 */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="absolute inset-0 w-full h-screen bg-white"
          style={{
            clipPath: "polygon(0 30px,100% 0,100% 100%,0 100%)",
          }}
        >
          <ProductSafaa />
        </section>

        {/* Section 3 */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="absolute inset-0 w-full h-screen bg-white"
          style={{
            clipPath: "polygon(0 30px,100% 0,100% 100%,0 100%)",
          }}
        >
          <ProductGhasaq />
        </section>

        {/* Section 4 */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="absolute inset-0 w-full h-screen bg-slate-300"
        >
          <ProductNadaParticles />
        </section>
      </main>

      {/* مساحة خروج بعد آخر سكشن */}
      {/* <div className="h-screen" /> */}
    </>
  );
}