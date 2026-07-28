import { useEffect, useState } from "react";
import "./MobileLoadingScreen.css";
import { toArabicNumbers } from "../lib/utils";
import FaiLogo from "./FaiLogo";

export default function MobileLoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 8 + 2;

      if (value >= 100) {
        value = 100;
        setProgress(100);

        clearInterval(interval);

        setTimeout(() => {
          setIsExiting(true);

          setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
          }, 500);
        }, 250);
      } else {
        setProgress(Math.round(value));
      }
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`mobile-loading ${isExiting ? "exit" : ""}`}>
      <div className="mobile-loading-content">

        {/* Logo */}
        {/* <img
          src="/logo.svg"
          alt="Logo"
          className="mobile-loading-logo"
        /> */}
        <div className="mobile-loading-logo">
          <FaiLogo color="#fff" size="50" />
        </div>

        {/* Loader */}
        <div className="mobile-loading-bar">
          <div
            className="mobile-loading-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <div className="mobile-loading-number">
          {toArabicNumbers(progress)}%
        </div>

      </div>
    </div>
  );
}