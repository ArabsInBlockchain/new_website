"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ValuesSection() {
  const { lang, t } = useLanguage();
  const container = useRef(null);
  const images = [
    "/images/values/value1.png",
    "/images/values/value2.png",
    "/images/values/value3.png",
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  useGSAP(() => {
    gsap.fromTo(".values-header", 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".values-header",
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }
    );

    gsap.fromTo(".values-image", 
      { scale: 0.95, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".values-image",
          start: "top 80%",
        },
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }
    );

    gsap.fromTo(".values-card", 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".values-cards-container",
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className={`w-full bg-white py-24 relative overflow-hidden ${lang === 'en' ? 'font-sans' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-[1350px] mx-auto px-4 md:px-8">
        
        {/* Section Heading */}
        <div className="values-header flex flex-col items-center text-center mb-16">
          <h2 className="text-[#0B3231] font-thmanyahsans text-[36px] md:text-[52px] font-bold leading-[1.2]  max-w-[800px]">
            {t("values.title")}
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          
          {/* Image & Paragraph Column */}
          <div className="values-image flex flex-col gap-6 w-full relative">
            <div className="relative w-full group">
              <div className="relative w-full rounded-[20px] overflow-hidden">
                {images.map((img, idx) => (
                  <img 
                    key={idx}
                    src={img} 
                    alt={`Community Values ${idx + 1}`} 
                    className={`w-full h-[350px] md:h-[480px] object-cover transition-all duration-700 ${idx === selectedIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 absolute inset-0'}`}
                  />
                ))}
                {/* Floating Avatars */}
                <div className="absolute bottom-6 left-6 p-2 rounded-[33px] border border-white/50 bg-white/20 backdrop-blur-md flex items-center shadow-lg z-10">
                  {images.map((img, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setSelectedIndex(idx)}
                      className={`w-[55px] h-[55px] rounded-full overflow-hidden relative cursor-pointer transition-all duration-300 ${idx > 0 ? '-mr-4' : ''} ${idx === selectedIndex ? 'border-[3px] border-[#C6FF77] scale-110 z-20' : 'border-2 border-white/70 hover:scale-105'}`}
                    >
                      <img src={img} alt={`User ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cards Column */}
          <div className="flex flex-col gap-6 w-full h-full">
            <div className="values-cards-container grid grid-cols-1 sm:grid-cols-2 gap-6 w-full h-full">
            
            {/* Card 1 */}
            <div className="values-card flex flex-col items-center text-center bg-[#EEF2F5] rounded-[12px] pt-14 px-8 pb-4 h-full justify-between transition-all hover:-translate-y-1 hover:shadow-md min-h-[382px]">
              <div className="flex flex-col items-center">
                <h3 className="text-[#0B3231] font-thmanyahsans text-[26px] md:text-[28px] font-bold leading-[1.2] mb-6">
                  {t("values.card1.title")}
                </h3>
                <p className="text-[#0B3231]/80 font-thmanyahsans text-[16px] font-medium leading-[1.5]">
                  {t("values.card1.desc")}
                </p>
              </div>
              <a href="https://t.me/ArabsInBlockchain" className="mt-auto flex w-full items-center justify-center px-8 py-3 h-[62px] rounded-full border border-[#B6C2C1] hover:bg-[#0B3231] hover:text-[#C6FF77] hover:border-[#0B3231] text-[#0B3231] font-thmanyahsans text-[18px] font-bold transition-all cursor-pointer">
                {t("values.card1.btn")}
              </a>
            </div>

            {/* Card 2 */}
            <div className="values-card flex flex-col items-center text-center bg-[#EEF2F5] rounded-[12px] p-4 h-full justify-between transition-all hover:-translate-y-1 hover:shadow-md min-h-[382px]">
              <div className="w-full h-[200px] rounded-[12px] overflow-hidden mb-6 bg-gray-200">
                <img src="/images/values/decentralized_future.png" alt="Decentralized Future" className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
              </div>
              <h3 className="text-[#0B3231] font-thmanyahsans text-[24px] font-bold leading-[1.2] mb-4">
                {t("values.card2.title")}
              </h3>
              
              <a href="#projects" className="group mt-auto flex items-center justify-between pl-2 pr-5 w-full h-[62px] rounded-[12px] bg-[#C6FF77] hover:bg-[#0B3231] transition-colors duration-300 cursor-pointer">
                <span className="text-[#0B3231] group-hover:text-[#C6FF77] font-thmanyahsans text-[18px] font-bold transition-colors">
                  {t("values.card2.btn")}
                </span>
                <div className="flex w-[46px] h-[46px] justify-center items-center rounded-[10px] bg-[#0B3231] group-hover:bg-[#C6FF77] overflow-hidden transition-colors duration-300 shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-transform duration-300" style={{ transform: lang === "ar" ? "scaleX(-1)" : "none" }}>
                    <path d="M4.50781 13.7888L13.7673 4.5293" className="stroke-white group-hover:stroke-[#0B3231] transition-colors duration-300" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.11523 3.69629L13.6407 4.05161C13.9536 4.06752 14.224 4.33799 14.2399 4.65088L14.5953 12.1763" className="stroke-white group-hover:stroke-[#0B3231] transition-colors duration-300" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </a>
            </div>

            </div>
            
            <p className="text-[#0B3231]/80 font-thmanyahsans text-[18px] font-medium leading-[1.5]  mt-2">
              {t("values.footerDesc")}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
