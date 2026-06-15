import { useEffect, useRef, useState } from "react";
import "./LoadingScreen.css";
import { toArabicNumbers } from "../lib/utils";

export default function LoadingScreen({ onComplete }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef(null);
  const animationRef = useRef(null);

  const [fontReady, setFontReady] = useState(false);

  useEffect(() => { document.fonts.load('100px Naskh').then(() => { setFontReady(true); }); }, []);
  

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video plays
    video.play().catch(() => {});

    // Sync progress with video timeline
    const updateProgress = () => {
      if (video.duration) {
        const pct = (video.currentTime / video.duration) * 100;
        setProgress(Math.min(pct, 100));

        if (pct >= 100) {
          setIsExiting(true);
          setTimeout(() => {
            setIsLoading(false);
            if (onComplete) onComplete();
          }, 800);
          return;
        }
      }
      animationRef.current = requestAnimationFrame(updateProgress);
    };

    // Start tracking when video is ready
    video.addEventListener("loadedmetadata", () => {
      animationRef.current = requestAnimationFrame(updateProgress);
    });

    // Fallback: if video fails to load, simulate progress
    const fallbackTimer = setTimeout(() => {
      if (!animationRef.current) {
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              setIsExiting(true);
              setTimeout(() => {
                setIsLoading(false);
                if (onComplete) onComplete();
              }, 800);
              return 100;
            }
            return prev + Math.random() * 15;
          });
        }, 200);
      }
    }, 3000);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      clearTimeout(fallbackTimer);
    };
  }, [onComplete]);

  if (!isLoading) return null;

  const value = Math.min(Math.round(progress), 100)

  return (
    // <div className={`loading-screen ${isExiting ? "exiting" : ""}`}>
    <div className="fixed inset-0 bg-[#f3f3f7] flex items-center justify-center z-99 loading-screen">
      <div className="text-center flex flex-col items-center mt-[-20%]">
        <div className="w-75 h-155 flex items-center justify-center overflow-hidden ">
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/dqe36doqn/video/upload/v1781541163/liquidLogo_1_gj6s9v.mp4"
            muted
            playsInline
            loop={false}
            className="w-[30%] h-[30%] object-cover"
          />
        </div>
        <div className="text-3xl text-black font-[Nask] mt-[-50%]">{toArabicNumbers(value)}%</div>
      </div>
    </div>
  );
}