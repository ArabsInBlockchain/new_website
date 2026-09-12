"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturedProjects() {
  const { lang, t } = useLanguage();
  const container = useRef(null);
  const projects = [
    {
      num: "01",
      title: t("projects.list.0.title"),
      desc: t("projects.list.0.desc"),
      img: "https://res.cloudinary.com/dcig9rsj0/image/upload/f_auto,q_auto/gpp-flyer-cmonm2teb0002ky0403c6c595_n87kgx",
    },
    {
      num: "02",
      title: t("projects.list.1.title"),
      desc: t("projects.list.1.desc"),
      img: "https://images.lumacdn.com/event-covers/f7/10e0a90b-0749-44b3-9f6d-98a71a1dd834.png",
    },
    {
      num: "03",
      title: t("projects.list.2.title"),
      desc: t("projects.list.2.desc"),
      img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
        setFade(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [projects.length]);

  useGSAP(() => {
    gsap.fromTo(".projects-header", 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".projects-header",
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }
    );

    gsap.fromTo(".project-card", 
      { y: 60, opacity: 0, scale: 0.95 },
      {
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      }
    );
  }, { scope: container });

  return (
    <div ref={container} className={`w-full min-h-[850px] py-20 relative overflow-hidden flex flex-col justify-center items-center bg-[#0B3231] ${lang === 'en' ? 'font-sans' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Background Images with Layer Rotations and Overlay Gradient */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage: `url("https://api.builder.io/api/v1/image/assets/TEMP/6d18417d42333b1094601b57f75b0a7b7e3995d8?width=1500")`,
            filter: "brightness(0.35)",
          }}
        />
        {/* Figma Design gradient overlays */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(11, 50, 49, 0.85) 0%, rgba(11, 50, 49, 0.60) 38%, rgba(11, 50, 49, 0.85) 100%)"
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-[1350px] mx-auto px-4 z-10 flex flex-col items-center">
        {/* Title */}
        <div className="projects-header pt-12 pb-8 text-center">
          <h2 className="text-white font-thmanyahsans text-[42px] md:text-[52px] font-bold leading-[1.2] ">
            {t("projects.title")}
          </h2>
        </div>

        {/* Dynamic Project Card */}
        <div className="flex items-center w-full max-w-[700px] justify-center px-2 md:px-0">
          {/* Project Box - Fixed Dimensions to prevent shifting */}
          <div className="project-card w-full max-w-[531px] min-h-auto md:min-h-[640px] bg-[#EEF2F5] rounded-xl p-6 md:p-8 flex flex-col items-center shrink-0 shadow-xl">
            {/* Steps index - No spaces between numbers and slash (e.g. 01/03) */}
            <div className="flex items-center text-[#0B3231]/80 font-manrope text-[18px] md:text-[20px] font-medium tracking-tight pb-4">
              <span>{projects[currentIndex].num}</span>
              <span className="opacity-50 mx-[2px]">/</span>
              <span>03</span>
            </div>

            {/* Title */}
            <div className="h-auto md:h-16 flex items-center justify-center text-center pb-6 md:pb-4">
              <h3 className="text-[#0B3231] font-thmanyahsans text-[20px] md:text-[24px] font-bold leading-[1.4] md:leading-[30px]">
                {projects[currentIndex].title}
              </h3>
            </div>

            {/* Image Box - Perfect square 320px by 320px with transition */}
            <div className="w-[260px] md:w-[320px] h-[260px] md:h-[320px] rounded-xl overflow-hidden mb-8 md:mb-12 relative border border-[#B6C2C1]/20 shadow-sm shrink-0">
              <img
                src={projects[currentIndex].img}
                alt={projects[currentIndex].title}
                className={`w-full h-full object-cover transition-all duration-500 transform ${
                  fade ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-95 -rotate-1"
                }`}
              />
            </div>

            {/* Description */}
            <div className="text-center px-0 md:px-2 flex-1 flex items-center justify-center">
              <p className="text-[#0B3231]/90 font-thmanyahsans text-[15px] font-medium leading-[1.6] md:leading-[24px]">
                {projects[currentIndex].desc}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Explorer CTA Button */}
        <div className="pt-10 w-full flex justify-center">
          <a
            href="#projects-directory"
            className="flex w-full md:w-[267px] max-w-[267px] h-[62px] py-2 pr-5 pl-2 items-center justify-between rounded-xl bg-[#C6FF77] overflow-hidden gap-[18px] no-underline cursor-pointer transition-all cta-button-interactive"
          >
            {/* Button Text */}
            <div className="flex justify-center items-center flex-1">
              <span className="text-[#0B3231] text-center font-thmanyahsans text-[18px] md:text-[18px] font-bold leading-[21.6px] transition-colors">
                {t("projects.btn")}
              </span>
            </div>
            {/* Arrow Icon Box */}
            <div className="flex w-[46px] h-[46px] justify-center items-center rounded-[10px] bg-[#0B3231] overflow-hidden shrink-0 arrow-icon-box">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="arrow-svg"
                style={{ transform: lang === "ar" ? "scaleX(-1)" : "none" }}
              >
                <path
                  d="M1.48633 16.1911L12.3591 5.31836"
                  stroke="white"
                  strokeWidth="1.91321"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.375 4.33984L12.2114 4.75707C12.5789 4.77576 12.8964 5.09334 12.9151 5.46076L13.3323 14.2972"
                  stroke="white"
                  strokeWidth="1.91321"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
