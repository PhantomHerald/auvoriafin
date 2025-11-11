"use client";
import React, { useRef, useEffect, useState } from "react";
import Bounded from "../components/bounded";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/all";
import { Raleway } from "next/font/google";
import { Uncial_Antiqua } from "next/font/google";
import { SplitText } from "gsap/all";
gsap.registerPlugin(ScrollTrigger, SplitText);

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "700", "900"],
  style: ["normal", "italic"],
});

const uncial = Uncial_Antiqua({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});
const About = () => {
  const containerRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    contact: "",
    roomStyle: "Classic",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const modalRef = React.useRef(null);
  const modalBgRef = React.useRef(null);

  // animate modal in when showModal becomes true
  useEffect(() => {
    if (showModal && modalRef.current) {
      gsap.fromTo(
        modalBgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25 }
      );

      gsap.fromTo(
        modalRef.current,
        { y: 40, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }
      );
    }
  }, [showModal]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // desktop & tablet animation
      const decopara1 = new SplitText(".decopara1", { type: "lines, chars" });
      const decosplit = new SplitText(".deco", { type: "lines, chars" });
      const decopara2 = new SplitText(".decopara2", { type: "lines, chars" });

      gsap.set([decosplit.chars, decopara1.chars, decopara2.chars], {
        yPercent: 100,
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".decocontainer",
          start: "top 75%",
          end: "bottom bottom",
          scrub: 0.5,
          markers: false,
        },
      });

      tl.to([decosplit.chars, decopara1.chars, decopara2.chars], {
        yPercent: 0,
        opacity: 1,
        duration: 0.5,
        ease: "expo.out",
        stagger: 0.02,
      }).to(".decobuttons", { opacity: 1, duration: 0.5 }, "<0.3");
    });

    // Always fade in buttons on small screens (no split animation)
    mm.add("(max-width: 767px)", () => {
      gsap.to(".decobuttons", {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".decocontainer",
          start: "top 80%",
        },
      });
    });

    // Always run this (for all screens)
    gsap.to(".section.pin .overlay", {
      yPercent: -100,
      ease: "none",
      borderRadius: "30px",
      scrollTrigger: {
        trigger: ".section.pin",
        start: "top top",
        end: "+=400%",
        scrub: 1.5,
        anticipatePin: 1,
        pin: true,
        markers: false,
        // force3D: true,
        fastScrollEnd: true,
      },
    });

    console.clear();
  }, []);

  {
    /*gsap.utils.toArray(".gallery-img").forEach((img) => {
      gsap.fromTo(
        img,
        { scale: 1, rotate: 0 },
        {
          scale: 1.05,
          rotate: 2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: img,
            start: "top 90%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );
    });*/
  }

  useEffect(() => {
    const buttons = document.querySelectorAll("button");
    const strength = 90; // how "magnetic" the button feels

    buttons.forEach((btn) => {
      const moveButton = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x / 3,
          y: y / 3,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const resetButton = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)",
        });
      };

      btn.addEventListener("mousemove", moveButton);
      btn.addEventListener("mouseleave", resetButton);
    });

    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener("mousemove", moveButton);
        btn.removeEventListener("mouseleave", resetButton);
      });
    };
  }, []);

  {
    /* useEffect(() => {
    const imgs = document.querySelectorAll(".gallery-img");

    imgs.forEach((img) => {
      img.addEventListener("mouseenter", () => {
        gsap.to(img, { scale: 1.1, rotate: 3, duration: 0.4, ease: "power2.out" });
      });
      img.addEventListener("mouseleave", () => {
        gsap.to(img, { scale: 1.05, rotate: 2, duration: 0.6, ease: "power2.out" });
      });
    });

    return () => {
      imgs.forEach((img) => {
        img.removeEventListener("mouseenter", () => {});
        img.removeEventListener("mouseleave", () => {});
      });
    };
  }, []); */
  }

  return (
    <section className="wrap">
      <div
        className="section pin relative w-full h-screen overflow-hidden"
        ref={containerRef}
      >
        <div className="overlay relative z-[2] bg-[#e8e4d9] will-change-transform">
          <Bounded>
            <div className="py-20">
              <h1
                className={`${uncial.className} decotitle text-bold text-[clamp(72px,18vw,220px)] leading-none [text-shadow:0_4px_20px_rgba(0,0,0,0.4)]`}
              >
                deco.
              </h1>

              <div className="decocontainer grid grid-cols-1 md:grid-cols-2 gap-y-[20px] gap-x-[70px]">
                <div>
                  <p
                    className={`${raleway.className} deco text-[clamp(20px,4vw,32px)]`}
                  >
                    Our collection of select accommodations, designed with an
                    emphasis on comfort, style, and functionality, offers you a
                    unique stay.
                  </p>
                  <br />
                  <br />
                  <br />
                  <p
                    className={`${raleway.className} decopara1 text-[clamp(20px,4vw,32px)]`}
                  >
                    Whether you prefer the spaciousness of the Classic or the
                    compact luxury of the Mini in Patras, or the serenity of the
                    Village Family Home in Vartholomio, each choice guarantees
                    an unforgettable stay.
                  </p>
                </div>

                <div>
                  <p
                    className={`${raleway.className} decopara2 text-[clamp(20px,4vw,32px)]`}
                  >
                    With modern decor, earthy tones, and all the amenities you
                    need, our properties are ideal for families, couples, or
                    groups of friends. Relax, enjoy your space, and discover the
                    area at your own pace.
                  </p>
                  <br />
                  <br />
                  <div className="flex justify-center items-center gap-5 md:flex-row lg:flex-row flex-col pt-10">
                    {[
                      {
                        label: "Classic",
                        img: "/jason-mavrommatis-w8fxphMz6Zs-unsplash.jpg",
                      },
                      {
                        label: "Mini",
                        img: "/jason-mavrommatis-pF1cl6h6Y2c-unsplash.jpg",
                      },
                      {
                        label: "Village",
                        img: "/jason-mavrommatis-wpPi6_IIf-0-unsplash.jpg",
                      },
                    ].map(({ label, img }, i) => (
                      <button
                        key={i}
                        className={`${raleway.className} decobuttons relative rounded-full cursor-pointer w-50 h-20 md:w-44 overflow-hidden text-white text-3xl tracking-wide opacity-0`}
                        style={{
                          backgroundImage: `url(${img})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        {/* dark overlay */}
                        <div className="absolute inset-0 bg-black/60"></div>
                        <span className="relative z-10">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="gallerycontainer">
                <div className="flex color-dark flex-col md:flex-row-reverse justify-between items-start md:items-center mb-6 gap-4">
                  <h3
                    className={`${uncial.className} gallerytitle text-bold text-[clamp(65px,15vw,200px)] [text-shadow:0_4px_20px_rgba(0,0,0,0.4)] `}
                  >
                    gallery.
                  </h3>
                  <div className="items-center flex flex-wrap gap-3 sm:gap-5 text-2xl">
                    <a
                      href=""
                      className={`${raleway.className} text-[clamp(20px,4vw,32px)] hover:opacity-70 transition-opacity`}
                    >
                      Classic
                    </a>
                    <a
                      href=""
                      className={`${raleway.className} text-[clamp(20px,4vw,32px)] hover:opacity-70 transition-opacity`}
                    >
                      Village
                    </a>
                    <a
                      href=""
                      className={`${raleway.className} text-[clamp(20px,4vw,32px)] hover:opacity-70 transition-opacity`}
                    >
                      Mini
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    "/jason-mavrommatis-w8fxphMz6Zs-unsplash.jpg",
                    "/jason-mavrommatis-kAOyHb6lagg-unsplash.jpg",
                    "/jason-mavrommatis-pF1cl6h6Y2c-unsplash.jpg",
                    "/jason-mavrommatis-pF1cl6h6Y2c-unsplash.jpg",
                    "/jason-mavrommatis-wpPi6_IIf-0-unsplash.jpg",
                    "/jason-mavrommatis-w8fxphMz6Zs-unsplash.jpg",
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="group relative overflow-hidden rounded-2xl lg:rounded-3xl aspect-[4/5] cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                    >
                      <Image
                        className="gallery-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={src}
                        width={1200}
                        height={1500}
                        alt="img"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              data-color="#ffffff"
              data-textcolor="#070707"
              className="color-light colorchange py-32 min-h-screen flex flex-col justify-center items-center"
            >
              <h1
                className={`${uncial.className} [text-shadow:0_4px_20px_rgba(0,0,0,0.4)] amenitiestitle text-[clamp(72px,18vw,220px)] text-center`}
              >
                amenities
              </h1>
              <p
                className={`${raleway.className} flex justify-center items-center text-2xl -mt-8 mb-16 text-center`}
              >
                Each accommodation offers a distinct experience.
              </p>

              <div className="grid grid-cols-4 grid-rows-2 mx-auto  w-full max-w-[1400px] h-[700px]">
                {[
                  { icon: "📶", label: "Internet access" },
                  { icon: "❄️", label: "Air conditioning" },
                  { icon: "🌡️", label: "Heating" },
                  { icon: "🍴", label: "Kitchen" },
                  { icon: "📺", label: "Flat TV" },
                  { icon: "🏠", label: "Balcony" },
                  { icon: "🏖️", label: "Beach access" },
                  { icon: "🧺", label: "Washing machine" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex flex-col justify-center items-center py-10 px-4 text-center relative 
                  ${i < 4 ? "border-b border-black" : ""} 
                  ${(i + 1) % 4 !== 0 ? "border-r border-black" : ""}`}
                  >
                    <div className="text-5xl mb-3">{item.icon}</div>
                    <h1
                      className={`${raleway.className} text-xl font-medium capitalize`}
                    >
                      {item.label}
                    </h1>
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center">
                <button
                  className={`${raleway.className} cursor-pointer bg-black text-white text-2xl rounded-full w-64 h-20 mt-40 mb-20`}
                  onClick={() => setShowModal(true)}
                >
                  Book now
                </button>
              </div>
            </div>

            {/* Booking modal */}
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                  ref={modalBgRef}
                  className="absolute inset-0 bg-black/60"
                  onClick={() => {
                    // animate out then hide
                    if (modalRef.current && modalBgRef.current) {
                      gsap.to(modalRef.current, {
                        y: 20,
                        opacity: 0,
                        scale: 0.98,
                        duration: 0.28,
                        ease: "power2.in",
                      });
                      gsap.to(modalBgRef.current, {
                        opacity: 0,
                        duration: 0.2,
                        onComplete: () => setShowModal(false),
                      });
                    } else {
                      setShowModal(false);
                    }
                  }}
                />

                <div
                  ref={modalRef}
                  className="relative bg-white rounded-xl w-full max-w-lg p-6 mx-4 shadow-lg"
                >
                  <h2 className={`${uncial.className} text-3xl mb-2`}>
                    Book a room
                  </h2>
                  <p className={`${raleway.className} mb-4 text-sm`}>
                    Please enter your details and preferred room style.
                  </p>

                  {submitted ? (
                    <div className="p-4 bg-green-50 text-green-800 rounded">
                      Thank you! Your booking request was received.
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        // simple validation
                        const newErrors = {};
                        if (!form.name.trim())
                          newErrors.name = "Name is required";
                        if (!form.surname.trim())
                          newErrors.surname = "Surname is required";
                        if (!form.contact.trim())
                          newErrors.contact = "Contact number is required";
                        if (!form.email.trim())
                          newErrors.email = "Email is required";
                        else if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            form.email
                          )
                        )
                          newErrors.email = "Enter a valid email";

                        setErrors(newErrors);
                        if (Object.keys(newErrors).length === 0) {
                          // Simulate submission
                          console.log("Booking request:", form);
                          setSubmitted(true);
                          setTimeout(() => {
                            setShowModal(false);
                            setSubmitted(false);
                            setForm({
                              name: "",
                              surname: "",
                              email: "",
                              contact: "",
                              roomStyle: "Classic",
                            });
                          }, 1500);
                        }
                      }}
                    >
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <label className="block text-sm">Name</label>
                          <input
                            className="w-full border rounded px-3 py-2 mt-1"
                            value={form.name}
                            onChange={(e) =>
                              setForm({ ...form, name: e.target.value })
                            }
                          />
                          {errors.name && (
                            <div className="text-sm text-red-600">
                              {errors.name}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm">Surname</label>
                          <input
                            className="w-full border rounded px-3 py-2 mt-1"
                            value={form.surname}
                            onChange={(e) =>
                              setForm({ ...form, surname: e.target.value })
                            }
                          />
                          {errors.surname && (
                            <div className="text-sm text-red-600">
                              {errors.surname}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm">Email</label>
                          <input
                            className="w-full border rounded px-3 py-2 mt-1"
                            value={form.email}
                            onChange={(e) =>
                              setForm({ ...form, email: e.target.value })
                            }
                            type="email"
                          />
                          {errors.email && (
                            <div className="text-sm text-red-600">
                              {errors.email}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm">
                            Contact number
                          </label>
                          <input
                            className="w-full border rounded px-3 py-2 mt-1"
                            value={form.contact}
                            onChange={(e) =>
                              setForm({ ...form, contact: e.target.value })
                            }
                          />
                          {errors.contact && (
                            <div className="text-sm text-red-600">
                              {errors.contact}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm">Room style</label>
                          <select
                            className="w-full border rounded px-3 py-2 mt-1"
                            value={form.roomStyle}
                            onChange={(e) =>
                              setForm({ ...form, roomStyle: e.target.value })
                            }
                          >
                            <option>Classic</option>
                            <option>Mini</option>
                            <option>Village</option>
                          </select>
                        </div>

                        <div className="flex justify-end gap-3 mt-2">
                          <button
                            type="button"
                            className="px-4 py-2 rounded bg-gray-200"
                            onClick={() => {
                              if (modalRef.current && modalBgRef.current) {
                                gsap.to(modalRef.current, {
                                  y: 20,
                                  opacity: 0,
                                  scale: 0.98,
                                  duration: 0.28,
                                  ease: "power2.in",
                                });
                                gsap.to(modalBgRef.current, {
                                  opacity: 0,
                                  duration: 0.2,
                                  onComplete: () => setShowModal(false),
                                });
                              } else {
                                setShowModal(false);
                              }
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 rounded bg-black text-white"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </Bounded>
        </div>

        <footer className="content absolute inset-0 h-screen flex flex-col justify-center items-center bg-black text-white text-center z-[1]">
          <h1 className="text-6xl font-bold mb-4">Footer</h1>
          <p className="max-w-xl text-lg">i am tired; but gotta make bank</p>
          <p>open on desktop for better experience</p>
        </footer>
      </div>
    </section>
  );
};

export default About;
