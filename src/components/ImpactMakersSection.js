"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ImpactMakersSection() {
  const { lang, t } = useLanguage();
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".impact-maker-header", 
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".impact-maker-header",
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }
    );

    gsap.fromTo(".impact-maker-card", 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".impact-makers-grid",
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      }
    );
  }, { scope: container });

  const team = [
    {
      name: "Eman Herawy",
      role: t("impactMakers.founder"),
      image: "https://res.cloudinary.com/dcig9rsj0/image/upload/v1782404165/6984e2f11eae16e5970dcbf7_hack26-experts-02_neximh.jpg",
    },
    {
      name: "Fadi Amroush",
      role: t("impactMakers.coreContributor"),
      image: "https://res.cloudinary.com/dcig9rsj0/image/upload/v1782816274/Fadi-Amroush_vb8mds.jpg",
    },
    {
      name: "Abdulrahman Fiala",
      role: t("impactMakers.coreContributor"),
      image: "https://res.cloudinary.com/dcig9rsj0/image/upload/v1782824886/IMG_20260623_032121_673_-_Abdulrahman_Fiala_muun5w.jpg",
    },
    {
      isMoreCard: true,
      count: "100+",
      name: t("impactMakers.moreName"),
      role: t("impactMakers.moreRole"),
    },
  ];

  return (
    <section ref={container} className={`w-full bg-[#0B3231] py-24 relative overflow-hidden ${lang === 'en' ? 'font-sans' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-[1350px] mx-auto px-4 md:px-8">
        
        {/* Header Title */}
        <div className="impact-maker-header flex flex-col items-start mb-14">
          <h2 className="text-white font-thmanyahsans text-[36px] md:text-[42px] font-bold leading-[1.2]">
            {t("impactMakers.title")}
          </h2>
        </div>

        {/* Grid */}
        <div className="impact-makers-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member, idx) => (
            member.isMoreCard ? (
              <Link href="/people" key={idx}>
                <div className="impact-maker-card flex flex-col items-start group cursor-pointer h-full">
                  {/* Image Box */}
                  <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-5 bg-[#144746] flex flex-col items-center justify-center transition-all duration-500 group-hover:bg-[#1a5c5a]">
                    <span className="text-[#C6FF77] font-thmanyahsans text-[64px] font-bold">
                      {member.count}
                    </span>
                    
                    {/* Yellow Icon at Bottom Left in RTL */}
                    <div className={`absolute bottom-4 ${lang === 'ar' ? 'left-4' : 'right-4'} w-8 h-8 rounded-md bg-[#C6FF77] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B3231" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: lang === "ar" ? "scaleX(-1)" : "none" }}>
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Text Info */}
                  <h3 className="text-[#C6FF77] font-thmanyahsans text-[22px] font-bold mb-1">
                    {member.name}
                  </h3>
                  <p className="text-white/60 font-thmanyahsans text-[16px] font-medium">
                    {member.role}
                  </p>
                </div>
              </Link>
            ) : (
              <div key={idx} className="impact-maker-card flex flex-col items-start group cursor-pointer">
                {/* Image Box */}
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-5 bg-gray-300">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  
                  {/* Yellow Icon at Bottom Left in RTL */}
                  <div className={`absolute bottom-4 ${lang === 'ar' ? 'left-4' : 'right-4'} w-8 h-8 rounded-md bg-[#C6FF77] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B3231" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: lang === "ar" ? "scaleX(-1)" : "none" }}>
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </div>
                
                {/* Text Info */}
                <h3 className="text-white font-thmanyahsans text-[22px] font-bold mb-1">
                  {member.name}
                </h3>
                <p className="text-white/60 font-thmanyahsans text-[16px] font-medium">
                  {member.role}
                </p>
              </div>
            )
          ))}
        </div>

      </div>
    </section>
  );
}
