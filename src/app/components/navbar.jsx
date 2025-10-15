"use client";
import { useGSAP } from "@gsap/react";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  const toggleMenu = () => setOpen(!open);

  useGSAP(() => {
    if (open) {
      gsap.to(panelRef.current, {
        x: "0%",
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.to(".plus", {
        rotate: 405,
        duration: 0.2,
        ease: "power2.out",
      });

      gsap.fromTo(
        ".menu-link",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.inOut",
          stagger: 0.2,
          delay: 0.2,
        }
      );

      gsap.fromTo(
        ".social-link",
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
          stagger: 0.2,
          delay: 0.2,
        }
      );
    } else {
      gsap.to(panelRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
      });

      gsap.to(".plus", {
        rotate: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [open]);

  useEffect(() => {
    const links = document.querySelectorAll(".menu-link, .social-link");

    links.forEach((link) => {
      const text1 = document.createElement("span");
      const text2 = document.createElement("span");

      text1.className = "text-layer text-layer-1";
      text2.className = "text-layer text-layer-2";

      text1.textContent = link.textContent;
      text2.textContent = link.textContent;

      link.textContent = "";
      link.appendChild(text1);
      link.appendChild(text2);

      gsap.set(text2, { yPercent: 100 });

      const tl = gsap.timeline({ paused: true });
      tl.to(text1, {
        yPercent: -100,
        duration: 0.4,
        ease: "power3.out",
      }).to(
        text2,
        {
          yPercent: 0,
          duration: 0.4,
          ease: "power3.out",
        },
        0
      );

      link.addEventListener("mouseenter", () => tl.play());
      link.addEventListener("mouseleave", () => tl.reverse());
    });
  }, []);

  return (
    <div className="top-0 left-0 overflow-hidden overflow-x-hidden">
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-6 md:p-10 bg-transparent z-50">
        <h1
          className={`${raleway.className} text-[clamp(1.5rem,4vw,2.5rem)] font-bold`}
        >
          Auvoria
        </h1>

        <div className="menucontainer flex items-center gap-4">
          <button
            className={`${raleway.className} cursor-pointer bg-black text-white rounded-full px-6 py-3 text-[clamp(1rem,2vw,1.5rem)]`}
          >
            Book now
          </button>
          <button
            className="navbutton relative inline-flex items-center cursor-pointer"
            aria-label={open ? "Close menu" : "Open menu"}
            type="button"
            onClick={toggleMenu}
          >
            <h2
              className={`${raleway.className} text-[clamp(1.2rem,3vw,1.8rem)]`}
            >
              Menu
            </h2>
            <span className="text plus ml-2 text-[clamp(1.8rem,4vw,2.5rem)]">
              +
            </span>
          </button>
        </div>
      </header>

      <aside
        ref={panelRef}
        className="menupanel fixed top-0 right-0 h-full w-[85%] sm:w-[70%] md:w-[60%] bg-[#b6ab87] flex flex-col justify-between p-[4em_1.5em_2em_1.5em] md:p-[6em_2em_2em_2em] overflow-y-auto z-30 backdrop-blur-[12px] rounded-l-[10%] translate-x-full"
        aria-hidden={!open}
      >
        {/* Menu links */}
        <div className="flex-1 flex flex-col gap-5">
          <ul className="list-none m-0 p-0 flex flex-col gap-3">
            {["Home", "About", "Our Location", "Contact"].map((text, i) => (
              <li key={i} className="relative overflow-hidden leading-none">
                <a
                  href={`/${text.toLowerCase().replace(" ", "")}`}
                  className="relative text-black font-semibold text-[clamp(2.5rem,7vw,4rem)] cursor-pointer leading-none tracking-[1px] uppercase inline-block no-underline"
                >
                  <span
                    className={`menu-link ${raleway.className} inline-block will-change-transform`}
                  >
                    {text}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials Section */}
        <div className="socialscontainer flex justify-end pr-[5%] sm:pr-[10%]">
          <div className="socials flex flex-col items-end text-right">
            <h3
              className={`${raleway.className} text-[clamp(2rem,5vw,3.5rem)] mb-3`}
            >
              Socials
            </h3>
            <ul
              className={`${raleway.className} text-black text-[clamp(1.5rem,4vw,3rem)] flex flex-col gap-2`}
            >
              {["Twitter", "Instagram", "Whatsapp", "Tiktok"].map(
                (social, i) => (
                  <li
                    key={i}
                    className="social-link hover:text-[#4B4737] cursor-pointer"
                  >
                    {social}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
