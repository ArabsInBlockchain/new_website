"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesSection() {
  const { lang, t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".services-text",
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".services-text",
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }
    );

    gsap.fromTo(".service-item",
      { x: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".services-list",
          start: "top 80%",
        },
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }
    );
  }, { scope: container });

  const services = [
    { title: t("services.list.smartContracts"), image: "https://images.lumacdn.com/event-covers/ia/d51dd7b2-1eda-4969-9f8b-fac0324821b2.png" },
    { title: t("services.list.training"), image: "https://images.lumacdn.com/event-covers/q9/4cf1a63c-cba0-4ba1-a9e0-0f4df80ed0f8" },
    { title: t("services.list.innovation"), image: "https://images.lumacdn.com/event-covers/qi/89ab2c16-4ee6-4a02-bd0b-def87d12a921" },
    { title: t("services.list.consulting"), image: "https://res.cloudinary.com/dcig9rsj0/image/upload/v1780234180/ABW-4-Black-Back_eejfex.png" },
    { title: t("services.list.community"), image: "https://res.cloudinary.com/dcig9rsj0/image/upload/v1780234420/image_axvghe.webp" }
  ];

  return (
    <section ref={container} className={`w-full relative overflow-hidden ${lang === 'en' ? 'font-sans' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[736px]">

        {/* Text Half - Right side in RTL (col-span-7) */}
        <div className="col-span-1 lg:col-span-6 bg-[#EEF2F5] flex flex-col justify-center py-16 lg:py-24 pr-4 md:pr-8 lg:pr-[max(2rem,calc((100vw-1350px)/2))] pl-4 md:pl-8 lg:pl-16">
          <div className="services-text w-full max-w-[700px] flex flex-col items-start">

            <div className="px-5 py-2.5 rounded-full border border-[#B6C2C1] mb-6 inline-flex">
              <span className="text-[#0B3231] font-thmanyahsans text-[16px] font-bold">
                {t("services.tag")}
              </span>
            </div>

            <h2 className={`text-[#0B3231] font-thmanyahsans text-[36px] md:text-[52px] font-bold leading-[1.2] mb-6 w-full ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              {t("services.title")}
            </h2>

            <p className={`text-[#0B3231]/80 font-thmanyahsans text-[18px] font-medium leading-[1.5] mb-12 w-full ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              {t("services.desc")}
            </p>

            <div className="services-list w-full border-t border-[#B6C2C1]">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="service-item group flex items-center justify-between py-6 border-b border-[#B6C2C1] cursor-pointer transition-all duration-300 bg-transparent"
                >
                  <h3 className="text-[#0B3231] font-thmanyahsans text-[20px] font-bold transition-colors duration-300 group-hover:text-[#8CB8B6]">
                    {service.title}
                  </h3>
                  <div className="w-6 h-6 flex justify-center items-center overflow-hidden">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300" style={{ transform: lang === "ar" ? "scaleX(-1)" : "none" }}>
                      <path d="M5.00977 15.3216L15.2982 5.0332" className="stroke-[#0B3231] group-hover:stroke-[#8CB8B6] transition-colors duration-300" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6.79688 4.10645L15.1584 4.50126C15.5061 4.51894 15.8066 4.81946 15.8243 5.16712L16.2191 13.5286" className="stroke-[#0B3231] group-hover:stroke-[#8CB8B6] transition-colors duration-300" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image Half - Left side in RTL (col-span-5) */}
        <div className="col-span-1 lg:col-span-6 relative min-h-[400px] lg:min-h-full overflow-hidden bg-[#0B3231]">
          {services.map((service, idx) => (
            <img
              key={idx}
              src={service.image}
              alt={service.title}
              className={`absolute inset-0 w-full h-full object-fill transition-all duration-700 ${hoveredIndex === idx || (hoveredIndex === null && idx === 0) ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
            />
          ))}
          {/* Gradient Overlay & Edge Shadow */}
          <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_120px_50px_rgba(11,50,49,1)]" />
          <div className="absolute inset-0 pointer-events-none z-10" style={{ background: "radial-gradient(circle, transparent 40%, rgba(11,50,49,0.6) 100%)" }} />
          <div className={`absolute inset-0 transition-colors duration-700 pointer-events-none z-10 ${hoveredIndex !== null ? 'bg-gradient-to-t from-[#C6FF77]/40 via-[#0B3231]/40 to-transparent' : 'bg-gradient-to-t from-[#0B3231] via-[#0B3231]/30 to-transparent opacity-80'}`} />

          {/* Overlay Text */}
          <div className="absolute bottom-10 left-0 w-full flex flex-col items-center justify-center pointer-events-none z-10 transition-transform duration-500">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-white font-thmanyahsans text-[34px] font-bold">01</span>
              <span className="text-white font-thmanyahsans text-[34px] font-bold">-</span>
              <span className="text-white font-thmanyahsans text-[34px] font-bold">05</span>
            </div>
            <span className="text-white/90 font-thmanyahsans text-[18px] font-medium">
              {t("services.allServices")}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
