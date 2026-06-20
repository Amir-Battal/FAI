import ThreeD from "./components/ThreeD";
import Navbar from "./components/Navbar";

import HistoryTimeline from "./components/HistoryTimeline";
import ContactSection from "./components/ContactSection";
import StackProducts2 from "./components/StackProducts2";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  return (
    <>

      <LoadingScreen />

      <Navbar />

      {/* HERO */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <canvas className="webgl" />

        <ThreeD />

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white z-99">
          <div className="animate-bounce text-center">
            <p>Discover More</p>
            <span>↓</span>
          </div>
        </div>
      </div>

      {/* مساحة رؤية الـ Hero */}
      <section className="h-screen" />

      <section id="products">
        {/* Product Stack */}
        {/* <StackProducts /> */}
        <StackProducts2 />
      </section>

      <section id="story">
        {/* Timeline */}
        <HistoryTimeline />
      </section>

        <section id="contact">
          <ContactSection />
        </section>

    </>
  );
}