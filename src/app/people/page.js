"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import peopleData from "../../data/people.json";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PeoplePage() {
  const container = useRef(null);
  
  useGSAP(() => {
    gsap.fromTo(".page-header", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(".impact-maker-card", 
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out"
      }
    );
  }, { scope: container });

  return (
    <main ref={container} className="min-h-screen bg-[#0B3231] py-24 relative" dir="rtl">
      <div className="max-w-[1350px] mx-auto px-4 md:px-8">
        
        {/* Header Title */}
        <div className="page-header flex flex-col items-center justify-center text-center mb-14">
          <h1 className="text-[#C6FF77] font-thmanyahsans text-[42px] md:text-[64px] font-bold mb-4">
            صُنّاع الأثر
          </h1>
          <p className="text-white/80 font-thmanyahsans text-[18px] md:text-[22px] max-w-2xl">
            تعرف على جميع الأعضاء المساهمين في مجتمع البلوكتشين العربي والذين يصنعون الأثر الحقيقي كل يوم.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[...peopleData].sort((a, b) => {
            const aHasImg = a.image && a.image !== '' && a.image !== '/avatar-placeholder.png' ? 1 : 0;
            const bHasImg = b.image && b.image !== '' && b.image !== '/avatar-placeholder.png' ? 1 : 0;
            return bHasImg - aHasImg;
          }).map((member, idx) => (
            <div key={idx} className="impact-maker-card flex flex-col items-start group">
              {/* Image Box */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-5 bg-gray-300">
                <img 
                  src={member.image && member.image !== '' ? member.image : 'https://github.com/identicon.png'} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  onError={(e) => { e.target.src = 'https://github.com/identicon.png' }}
                />
                
                {/* Yellow Icon */}
                <div className="absolute bottom-4 left-4 w-8 h-8 rounded-md bg-[#C6FF77] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B3231" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </div>
              
              {/* Text Info */}
              <h3 className="text-white font-thmanyahsans text-[22px] font-bold mb-1 line-clamp-1 w-full" title={member.name}>
                {member.name}
              </h3>
              <p className="text-white/60 font-thmanyahsans text-[16px] font-medium line-clamp-1 w-full" title={member.role}>
                {member.role}
              </p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
