"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTAGreenSection() {
  const { lang, t } = useLanguage();
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".cta-green-content", 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".cta-green-content",
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
    <section ref={container} className={`w-full relative z-10 overflow-hidden bg-[#C6FF77] ${lang === 'en' ? 'font-sans' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="w-full min-h-[600px] md:min-h-[800px] lg:min-h-[986px] flex items-center justify-center">
        
        {/* Content */}
        <div className="cta-green-content relative z-10 flex flex-col items-center text-center px-4 md:px-8">
          <h2 className="text-[#0B3231] font-thmanyahsans text-[48px] md:text-[70px] lg:text-[85px] font-bold leading-[1.1]  mb-10 max-w-[900px]">
            {t("cta.title")}
          </h2>

          {/* CTA Button - Dark version */}
          <a 
            href="https://t.me/ArabsInBlockchain" 
            className="group flex items-center gap-4 pl-5 pr-2 py-2 rounded-[12px] bg-[#0B3231] hover:bg-[#0a2a29] transition-colors duration-300 cursor-pointer"
          >
            <span className="text-white font-thmanyahsans text-[18px] font-bold leading-[1.2] ">
              {t("cta.btn")}
            </span>
            <div className="flex w-[46px] h-[46px] justify-center items-center rounded-[10px] bg-[#C6FF77] overflow-hidden shrink-0">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]" style={{ transform: lang === "ar" ? "scaleX(-1)" : "none" }}>
                <path d="M4.5 13.7623L13.7418 4.52051" stroke="#0B3231" strokeWidth="1.62623" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.10547 3.68945L13.6164 4.0441C13.9287 4.05997 14.1987 4.32993 14.2146 4.64222L14.5692 12.1532" stroke="#0B3231" strokeWidth="1.62623" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
