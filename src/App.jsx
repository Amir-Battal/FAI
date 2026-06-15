import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import ThreeD from "./components/ThreeD";
import LoadingScreen from "./components/LoadingScreen";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showWhiteSection, setShowWhiteSection] = useState(false);
  const sceneRef = useRef(null);
  const transitionRef = useRef(null);

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Circle expand animation
      gsap.fromTo(transitionRef.current,
        { clipPath: "circle(0% at 50% 50%)" },
        {
          clipPath: "circle(150% at 50% 50%)",
          ease: "none",
          scrollTrigger: {
            trigger: sceneRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
              if (self.progress > 0.95) {
                setShowWhiteSection(true);
              } else {
                setShowWhiteSection(false);
              }
            },
            onLeave: () => {
              setShowWhiteSection(true);
              gsap.to(transitionRef.current, { opacity: 0, duration: 0.3 });
            },
            onEnterBack: () => {
              gsap.to(transitionRef.current, { opacity: 1, duration: 0.3 });
              setShowWhiteSection(false);
            },
          },
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, [isLoading]);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {/* 3D Scene Section */}
      <div className="scene-section" ref={sceneRef}>
        <canvas className="webgl"></canvas>
        <Navbar />
        <ThreeD />

        {/* Scroll indicator */}
        <div className={`scroll-indicator ${showWhiteSection ? "hidden" : ""}`}>
          <span>اكشف المزيد</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>

      {/* Circle Transition Overlay */}
      <div className="transition-overlay" ref={transitionRef}>
        <div className="transition-content">
          <h1>عنوان القسم</h1>
          <p>هذا قسم جديد يظهر عند التمرير لأسفل. يمكن إضافة محتوى هنا.</p>
        </div>
      </div>

      {/* White Section */}
      <section className={`white-section ${showWhiteSection ? "visible" : ""}`}>
        <div className="white-content">
          <div className="cards-container">
            <div className="info-card">
              <div className="card-icon">🌿</div>
              <h3>مكونات طبيعية</h3>
              <p>منتجاتنا مصنوعة من مكونات طبيعية 100%</p>
            </div>
            <div className="info-card">
              <div className="card-icon">✨</div>
              <h3>جودة فاخرة</h3>
              <p>نحرص على أعلى معايير الجودة في كل منتج</p>
            </div>
            <div className="info-card">
              <div className="card-icon">🎁</div>
              <h3>تغليف أنيق</h3>
              <p>تصاميم تغليف فاخرة تناسب جميع المناسبات</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Section */}
      <section className="dark-section">
        <div className="dark-content">
          <h1>قسم آخر</h1>
          <p>محتوى إضافي يظهر عند التمرير أكثر</p>

          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-number">01</span>
              <h3>العناية</h3>
              <p>نهتم بكل التفاصيل لنقدم لكم أفضل المنتجات</p>
            </div>
            <div className="feature-item">
              <span className="feature-number">02</span>
              <h3>الإبداع</h3>
              <p>تصاميم فريدة تناسب جميع الأذواق</p>
            </div>
            <div className="feature-item">
              <span className="feature-number">03</span>
              <h3>التميز</h3>
              <p>نلتزم بأعلى معايير الجودة في كل خطوة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h2>FAI | في</h2>
          <p>منتجات عطرية فاخرة</p>
        </div>
      </footer>
    </>
  );
}