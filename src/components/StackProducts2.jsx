import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { products } from "../Data/productsData";
import ProductScene from "./ProductScene";

gsap.registerPlugin(ScrollTrigger);

export default function StackProducts2() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const cards = cardsRef.current;

    const ctx = gsap.context(() => {
      // 🔥 مهم: ترتيب الطبقات
      cards.forEach((card, i) => {
        gsap.set(card, {
          zIndex: i,
          position: "absolute",
          inset: 0,
        });
      });

      // 🔥 كل الكروت تبدأ تحت باستثناء الأول
      gsap.set(cards.slice(1), {
        yPercent: 100,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${(products.length - 1) * window.innerHeight}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 🔥 كل scroll خطوة = card يدخل فوق السابق
      cards.slice(1).forEach((card) => {
        tl.to(
          card,
          {
            yPercent: 0,
            ease: "none",
            duration: 1,
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {products.map((product, i) => (
        <section
          key={product.id}
          ref={(el) => (cardsRef.current[i] = el)}
          className="w-full h-full"
        >
          <ProductScene product={product} />
        </section>
      ))}
    </section>
  );
}