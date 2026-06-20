import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../index.css";
import FaiLogo from "./FaiLogo";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isContact, setIsContact] = useState(false);

  const openTimer = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    const productsTrigger = ScrollTrigger.create({
      trigger: "#products",
      start: "top 20%",
      onEnter: () => {
        setDarkMode(true);
        setIsContact(false);
      },
      onEnterBack: () => {
        setDarkMode(true);
        setIsContact(false);
      },
      onLeaveBack: () => {
        setDarkMode(false);
        setIsContact(false);
      },
    });

    const contactTrigger = ScrollTrigger.create({
      trigger: "#contact",
      start: "top 50%",
      onEnter: () => {
        setDarkMode(false);
        setIsContact(true);
      },
      onEnterBack: () => {
        setDarkMode(false);
        setIsContact(true);
      },
      onLeaveBack: () => {
        setDarkMode(true);
        setIsContact(false);
      },
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      productsTrigger.kill();
      contactTrigger.kill();
    };
  }, []);

  const scrollToSection = (id) => {
    gsap.killTweensOf(window);

    gsap.to(window, {
      duration: 0.8,
      ease: "power3.out",
      scrollTo: {
        y: `#${id}`,
        offsetY: 80,
      },
    });
  };

  const handleEnter = () => {
    clearTimeout(closeTimer.current);

    openTimer.current = setTimeout(() => {
      setMenuOpen(true);
      setVisible(true);
    }, 120);
  };

  const handleLeave = () => {
    clearTimeout(openTimer.current);

    closeTimer.current = setTimeout(() => {
      setMenuOpen(false);

      setTimeout(() => {
        setVisible(false);
      }, 300);
    }, 200);
  };

  const textColor = darkMode ? "text-black" : "text-white";
  const logoColor = darkMode ? "#000000" : "#ffffff";

  const MenuItems = () => (
    <div className="w-full flex flex-row justify-between gap-20 font-[Dahlia] tracking-wider text-2xl">
      <li>
        <button onClick={() => scrollToSection("products")} className="hover:text-gray-600 cursor-pointer">Buy</button>
      </li>
      <li>
        <button onClick={() => scrollToSection("story")} className="hover:text-gray-600 cursor-pointer">Our Story</button>
      </li>
      <li>
        <button onClick={() => scrollToSection("contact")} className="hover:text-gray-600 cursor-pointer">Contact Us</button>
      </li>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-[90] px-10 md:px-16 pt-6">
      <nav
        className={`
          relative transition-all duration-700
          ${
            !scrolled
              ? "flex justify-between items-center"
              : isContact
              ? "flex justify-start items-center"
              : "flex justify-center items-center"
          }
        `}
      >
        {/* NORMAL STATE */}
        {!scrolled && (
          <>
            <button
              onClick={() => scrollToSection("products")}
              className="cursor-pointer"
            >
              <FaiLogo color={logoColor} />
            </button>

            <ul className={`flex gap-10 text-lg font-[Naskh] ${textColor}`}>
              <MenuItems />
            </ul>
          </>
        )}

        {/* SCROLLED STATE */}
        {scrolled && (
          <div
            className="relative flex flex-col items-center pb-32"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            {/* LOGO */}
            <button
              onClick={() => scrollToSection("products")}
              className="cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <FaiLogo color={logoColor} />
            </button>

            {/* MENU ITEMS */}
            {visible && (
              <ul
                className={`
                  absolute mt-40 left-1/2 -translate-x-1/2
                  flex gap-10 whitespace-nowrap text-lg font-[Naskh]
                  transition-all duration-500
                  ${textColor}
                  ${
                    menuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-3"
                  }
                `}
              >
                <MenuItems />
              </ul>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;