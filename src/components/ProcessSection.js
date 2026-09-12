"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProcessSection() {
  const { lang, t } = useLanguage();
  const container = useRef(null);

  useGSAP(() => {
    // Header
    gsap.fromTo(".process-header", 
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".process-header",
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }
    );

    const stepsElements = gsap.utils.toArray(".process-step");

    // First step triggers naturally when section enters
    gsap.fromTo(stepsElements[0], 
      { opacity: 0, y: 40 },
      {
        scrollTrigger: {
          trigger: ".process-steps-container",
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }
    );

    // Initial state for the rest of the steps
    if (stepsElements.length > 1) {
      gsap.set(stepsElements.slice(1), { opacity: 0, y: 40 });
    }

    // Scroll-tied scrub timeline for the line and remaining steps
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top", 
        end: "bottom bottom", 
        scrub: 1,
      }
    });

    // Translate the track horizontally (to the right, for RTL) to reveal hidden items
    tl.to(".scroll-track", { x: 500, duration: 5, ease: "none" }, 0);

    // Draw the horizontal line from right to left
    tl.to(".timeline-line", { scaleX: 1, duration: 5, ease: "none" }, 0);

    // Make steps appear sequentially as the line is drawn
    if (stepsElements.length > 1) {
      tl.to(stepsElements[1], { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.5);
    }
    if (stepsElements.length > 2) {
      tl.to(stepsElements[2], { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 1.5);
    }
    if (stepsElements.length > 3) {
      tl.to(stepsElements[3], { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 2.5);
    }
    if (stepsElements.length > 4) {
      tl.to(stepsElements[4], { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 3.5);
    }

  }, { scope: container });
  const steps = [
    {
      num: t("process.steps.0.num"),
      title: t("process.steps.0.title"),
      desc: t("process.steps.0.desc"),
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
    },
    {
      num: t("process.steps.1.num"),
      title: t("process.steps.1.title"),
      desc: t("process.steps.1.desc"),
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
    },
    {
      num: t("process.steps.2.num"),
      title: t("process.steps.2.title"),
      desc: t("process.steps.2.desc"),
      img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80",
    },
    {
      num: t("process.steps.3.num"),
      title: t("process.steps.3.title"),
      desc: t("process.steps.3.desc"),
      img: "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?auto=format&fit=crop&q=80",
    },
    {
      num: t("process.steps.4.num"),
      title: t("process.steps.4.title"),
      desc: t("process.steps.4.desc"),
      img: "https://images.unsplash.com/photo-1516245834210-c4c14271731e?auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div ref={container} className={`w-full bg-[#EEF2F5] h-[250vh] relative z-10 ${lang === 'en' ? 'font-sans' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center py-10 md:py-20">
      {/* Decorative Star Background (Watermark / Static) */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/6d18417d42333b1094601b57f75b0a7b7e3995d8?width=910"
        alt="Decorative Star"
        className="absolute left-[-150px] top-[200px] w-[500px] h-[480px] pointer-events-none rotate-[70deg] z-0 opacity-15"
      />

      <div className="max-w-[1350px] mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="process-header flex flex-col-reverse md:flex-row justify-between items-center pt-16 md:pt-24 pb-10 md:pb-20 border-b border-[#B6C2C1]/30 gap-6 md:gap-0">
          {/* Right: Text heading */}
          <div className="max-w-[667px]">
            <h2 className={`text-[#0B3231] ${lang === 'ar' ? 'text-center md:text-right' : 'text-center md:text-left'} font-thmanyahsans text-[22px] md:text-[30px] font-bold leading-[1.6] md:leading-[44px]`}>
              {t("process.header")}
            </h2>
          </div>
          {/* Left: Star Icon */}
          <div className="w-[80px] md:w-[116px] h-[80px] md:h-[110px] flex justify-center items-center shrink-0">
            <svg className="spin-slow w-full h-full" viewBox="0 0 113 118" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.22656 38.8553L17.3703 20.571L48.3452 43.4884L56.1789 3.52952L75.0913 8.83705L65.6401 48.2769L102.559 44.6083L104.144 66.1768L67.0847 67.9423L82.1859 105.42L64.252 113.433L50.6751 75.2067L23.3581 102.087L10.6515 85.4813L39.2275 60.1029L7.22656 38.8553Z"
                fill="#0B3231"
              />
            </svg>
          </div>
        </div>

        {/* Process Steps Timeline - Horizontal Scroll Container */}
        <div className="w-full overflow-x-auto pt-10 md:pt-16 pb-4 scrollbar-none" style={{ WebkitOverflowScrolling: "touch", overflowX: "hidden" }}>
          <div className="scroll-track min-w-[1200px] md:min-w-[1500px] relative pb-10 px-4 md:px-10">
            
            {/* 1. Continuous Solid Horizontal Timeline Line */}
            <div className="absolute top-[200px] left-10 right-10 h-[1.6px] bg-[#0B3231]/20 z-0">
              {/* Animated Timeline Line (draws from right to left) */}
              <div className="timeline-line absolute inset-0 h-full bg-[#0B3231] origin-right" style={{ transform: "scaleX(0)" }}></div>
            </div>

            {/* Steps Container */}
            <div className="process-steps-container grid grid-cols-5 gap-6 relative z-10">
              {steps.map((step, index) => {
                const isEven = index % 2 === 1;
                return (
                  <div key={index} className="process-step flex flex-col items-center relative">
                    
                    {/* Top Section Content (Info Text or Image Card) */}
                    <div className="w-full h-[180px] flex flex-col justify-end items-center text-center pb-2">
                      {!isEven ? (
                        <>
                          <span className="text-[#0B3231] font-thmanyahsans text-xl font-bold block mt-1">
                            {step.title}
                          </span>
                          <p className="pt-2 text-[#0B3231]/80 font-thmanyahsans text-[15px] font-medium leading-[22px] px-1">
                            {step.desc}
                          </p>
                        </>
                      ) : (
                        <div className="w-[180px] h-[180px] flex justify-center items-center">
                          <span 
                            className="text-[#C6FF77] font-thmanyahsans text-[80px] md:text-[90px] font-bold"
                            style={{ WebkitTextStroke: '2px #0B3231' }}
                          >
                            {step.num}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 2. Vertical Solid Connection Block */}
                    <div className="w-full h-[40px] relative flex justify-center items-center">
                      {/* Vertical line connecting center line to elements (Solid) */}
                      <div 
                        className={`absolute w-[1.6px] border-l border-[#0B3231]/40 ${
                          !isEven 
                            ? 'top-[20px] bottom-0'  // Links text down to center point
                            : 'top-0 bottom-[20px]'  // Links image down to center point
                        }`}
                      ></div>
                      
                      {/* Interactive dot node positioned exactly on the horizontal center line */}
                      <div className="w-[16px] h-[16px] rounded-full bg-[#0B3231] border-4 border-[#EEF2F5] z-10 shadow-sm transition-transform hover:scale-125 cursor-pointer"></div>
                    </div>

                    {/* Bottom Section Content (Image Card or Info Text) */}
                    <div className="w-full h-[180px] flex flex-col justify-start items-center text-center pt-2">
                      {!isEven ? (
                        <div className="w-[180px] h-[180px] flex justify-center items-center">
                          <span 
                            className="text-[#C6FF77] font-thmanyahsans text-[80px] md:text-[90px] font-bold"
                            style={{ WebkitTextStroke: '2px #0B3231' }}
                          >
                            {step.num}
                          </span>
                        </div>
                      ) : (
                        <>
                          <span className="text-[#0B3231] font-thmanyahsans text-xl font-bold block mt-1">
                            {step.title}
                          </span>
                          <p className="pt-2 text-[#0B3231]/80 font-thmanyahsans text-[15px] font-medium leading-[22px] px-1">
                            {step.desc}
                          </p>
                        </>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
