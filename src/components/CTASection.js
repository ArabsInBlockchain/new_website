"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTASection() {
  const { lang, t } = useLanguage();
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".cta-content", 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".cta-content",
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }
    );
  }, { scope: container });
  return (
    <section ref={container} className={`w-full sticky top-0 z-0 h-screen overflow-hidden ${lang === 'en' ? 'font-sans' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Background Image with Overlay */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* BG Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/1bfb36b9544493181b46d8cc4b52e5534dbab4e1?width=3068')",
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#0B3231]/50" />

        {/* Content */}
        <div className="cta-content relative z-10 flex flex-col items-center text-center px-4 md:px-8">
          <h2 className="text-white font-thmanyahsans text-[48px] md:text-[70px] lg:text-[85px] font-bold leading-[1.1]  mb-10 max-w-[900px]">
            {t("cta.title")}
          </h2>

          {/* CTA Button */}
          <a 
            href="https://t.me/ArabsInBlockchain" 
            className="group flex items-center gap-4 pl-5 pr-2 py-2 rounded-[12px] bg-[#C6FF77] hover:bg-[#b8f55e] transition-colors duration-300 cursor-pointer"
          >
            <span className="text-[#0F0707] font-thmanyahsans text-[18px] font-bold leading-[1.2] ">
              {t("cta.btn")}
            </span>
            <div className="flex w-[46px] h-[46px] justify-center items-center rounded-[10px] bg-[#0B3231] overflow-hidden shrink-0">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]" style={{ transform: lang === "ar" ? "scaleX(-1)" : "none" }}>
                <path d="M4.5 13.7623L13.7418 4.52051" stroke="#F9FFF0" strokeWidth="1.62623" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.10547 3.68945L13.6164 4.0441C13.9287 4.05997 14.1987 4.32993 14.2146 4.64222L14.5692 12.1532" stroke="#F9FFF0" strokeWidth="1.62623" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
