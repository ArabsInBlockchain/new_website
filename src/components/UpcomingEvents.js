"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function UpcomingEvents() {
  const { lang, t } = useLanguage();
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".events-header", 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".events-header",
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }
    );

    gsap.fromTo(".event-main-card", 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".event-main-card",
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }
    );

    gsap.fromTo(".event-grid-card", 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".events-grid",
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
  const events = [
    // Highlighted big event (Top) - Upcoming/Active
    {
      type: t("events.list.0.type"),
      date: t("events.list.0.date"),
      title: t("events.list.0.title"),
      desc: t("events.list.0.desc"),
      img: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=1,anim=false,background=white,quality=75,width=1920,height=1920/uploads/dz/689775e0-33ed-4d98-995b-2e3b0e704c75.png",
      link: "https://luma.com/99k4lv46",
      readText: t("events.list.0.readText"),
      status: "past",
      statusText: t("events.list.0.statusText")
    },
    // Grid events (Bottom 3 items)
    {
      type: t("events.list.1.type"),
      date: t("events.list.1.date"),
      title: t("events.list.1.title"),
      desc: t("events.list.1.desc"),
      img: "https://images.lumacdn.com/event-covers/9e/c7d97d11-fdd9-4137-9fba-c68b964d6228.png",
      link: "https://lu.ma/55bt5n6o",
      readText: t("events.list.1.readText"),
      status: "past",
      statusText: t("events.list.1.statusText")
    },
    {
      type: t("events.list.2.type"),
      date: t("events.list.2.date"),
      title: t("events.list.2.title"),
      desc: t("events.list.2.desc"),
      img: "https://images.lumacdn.com/event-covers/ue/cc5b6c10-ecb9-4601-868a-02ff61a17c30.png",
      link: "https://luma.com/sys949qa",
      readText: t("events.list.2.readText"),
      status: "past",
      statusText: t("events.list.2.statusText")
    },
    {
      type: t("events.list.3.type"),
      date: t("events.list.3.date"),
      title: t("events.list.3.title"),
      desc: t("events.list.3.desc"),
      img: "https://images.lumacdn.com/event-covers/je/9734d7be-8cc6-49cc-965e-19ed140101ba.png",
      link: "https://lu.ma/38t8whsf",
      readText: t("events.list.3.readText"),
      status: "past",
      statusText: t("events.list.3.statusText")
    }
  ];

  return (
    <div ref={container} id="events" className={`w-full bg-white py-24 relative overflow-hidden ${lang === 'en' ? 'font-sans' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-[1350px] mx-auto px-[15px]">

        {/* Header Section */}
        <div className="events-header flex flex-col md:flex-row items-center justify-between gap-6 pb-16">
          
          <div className={`flex flex-col ${lang === 'ar' ? 'items-start' : 'items-start'} gap-4`}>
            {/* Badge */}
            <div className="flex px-4 py-1.5 justify-center items-center rounded-full bg-white border border-[#B6C2C1]/30">
              <span className="text-[#0B3231] font-manrope text-[14px] font-bold tracking-tight">
                {t("events.tag")}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-[#242426] font-thmanyahsans text-[48px] md:text-[64px] font-bold leading-[1.1] ">
              {t("events.title")}
            </h2>
            {/* Subtitle */}
            <p className="max-w-[540px] text-[#242426]/70 font-thmanyahsans text-[18px] font-bold leading-[27px]">
              {t("events.subtitle")}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto">
            <a href="https://luma.com/arabsInBlockchain" className="flex items-center justify-center px-6 py-3 h-[50px] rounded-xl bg-[#0B3231] hover:bg-[#154644] text-white font-thmanyahsans text-[18px] font-bold transition-all cursor-pointer">
              {t("events.btnAll")}
            </a>
            <a href="#sponsor" className="flex items-center justify-center px-6 py-3 h-[50px] rounded-xl bg-[#C6FF77] hover:bg-[#b8f55e] text-[#0B3231] font-thmanyahsans text-[18px] font-bold transition-all cursor-pointer">
              {t("events.btnSponsor")}
            </a>
          </div>

        </div>

        {/* Big Highlighted Featured Event */}
        <div className="event-main-card w-full flex flex-col md:flex-row bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EBEFF5] mb-10 min-h-[520px]">
          {/* Image Side */}
          <div className="w-full md:w-1/2 min-h-[360px] md:min-h-auto relative flex items-center justify-center">
            <div className="w-full h-full overflow-hidden relative group">
              <img
                src={events[0].img}
                alt={events[0].title}
                className="w-full h-full object-fill transition-transform duration-700 group-hover:scale-105"
              />
              {/* Status Badge Over Image */}
              <div className="absolute top-6 right-6">
                <div className={`flex px-4 py-1.5 items-center rounded-full shadow-lg backdrop-blur-md ${events[0].status === 'upcoming' ? 'bg-[#C6FF77] text-[#0B3231]' : 'bg-white/90 text-gray-700'}`}>
                  <div className={`w-2 h-2 rounded-full ml-2 ${events[0].status === 'upcoming' ? 'bg-[#0B3231] animate-pulse' : 'bg-gray-400'}`}></div>
                  <span className="font-thmanyahsans text-[14px] font-bold">
                    {events[0].statusText}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className={`w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between items-start ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className="w-full">
              {/* Category & Date Info */}
              <div className="w-full flex justify-between items-center pb-6 mb-6">
                <div className="flex px-4 py-1.5 items-center rounded-full bg-[#EBEFF5]">
                  <span className="text-[#242426] font-thmanyahsans text-[13px] font-medium">
                    {events[0].type}
                  </span>
                </div>
                <span className="text-[#242426]/50 font-thmanyahsans text-[15px] font-medium flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  {events[0].date}
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-[#242426] font-thmanyahsans text-[28px] md:text-[32px] font-bold leading-[1.3]  mb-4">
                {events[0].title}
              </h3>
              <p className="text-[#242426]/80 font-thmanyahsans text-[16px] font-medium leading-[26px]">
                {events[0].desc}
              </p>
            </div>

            {/* CTA action bottom bar */}
            <a href={events[0].link} className="group w-full pt-6 flex justify-between items-center mt-8 cursor-pointer border-t border-[#EBEFF5]">
              <span className="text-[#0B3231] font-thmanyahsans text-[16px] font-bold transition-colors">
                {events[0].readText}
              </span>
              <div className="flex w-[46px] h-[46px] justify-center items-center rounded-[10px] bg-[#C6FF77] group-hover:bg-[#0B3231] overflow-hidden transition-colors duration-300">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]" style={{ transform: lang === "ar" ? "scaleX(-1)" : "none" }}>
                  <path d="M4.50781 13.7888L13.7673 4.5293" className="stroke-[#0B3231] group-hover:stroke-[#C6FF77] transition-colors duration-300" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.11523 3.69629L13.6407 4.05161C13.9536 4.06752 14.224 4.33799 14.2399 4.65088L14.5953 12.1763" className="stroke-[#0B3231] group-hover:stroke-[#C6FF77] transition-colors duration-300" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* 3-Column Grid for other events */}
        <div className="events-grid w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.slice(1).map((event, index) => (
            <div key={index} className="event-grid-card flex flex-col bg-white rounded-[20px] border border-[#EBEFF5] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[560px] hover:-translate-y-2 transition-transform duration-300">
              {/* Event Image Box */}
              <div className="w-full h-[280px] shrink-0 overflow-hidden relative group">
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-full object-fill transition-transform duration-700 group-hover:scale-105"
                />
                {/* Status Badge Over Image */}
                <div className="absolute top-4 right-4">
                  <div className={`flex px-3 py-1 items-center rounded-full shadow-md backdrop-blur-md ${event.status === 'upcoming' ? 'bg-[#C6FF77] text-[#0B3231]' : 'bg-white/90 text-gray-700'}`}>
                    <span className="font-thmanyahsans text-[12px] font-bold">
                      {event.statusText}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Main Info */}
              <div className={`p-6 flex-1 flex flex-col justify-between items-start ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className="w-full">
                  {/* Category & Date */}
                  <div className="w-full flex justify-between items-center pb-4 mb-4 border-b border-[#EBEFF5]">
                    <div className="flex px-3 py-1 items-center rounded-full bg-[#f7f9fc]">
                      <span className="text-[#242426] font-thmanyahsans text-[12px] font-medium">
                        {event.type}
                      </span>
                    </div>
                    <span className="text-[#242426]/50 font-thmanyahsans text-[13px] font-medium flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      {event.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-[#35363B] font-thmanyahsans text-[20px] font-bold leading-[28px]  mb-3">
                    {event.title}
                  </h4>
                  {/* Brief description */}
                  <p className="text-[#242426]/80 font-thmanyahsans text-[14px] font-medium leading-[22px]">
                    {event.desc}
                  </p>
                </div>

                {/* Card Action footer bar */}
                <a href={event.link} className="group w-full pt-4 flex justify-between items-center mt-6 cursor-pointer">
                  <span className="text-[#242426]/50 font-thmanyahsans text-[14px] font-bold group-hover:text-[#0B3231] transition-colors">
                    {event.readText}
                  </span>
                  <div className="flex w-[40px] h-[40px] justify-center items-center rounded-[10px] bg-[#C6FF77] group-hover:bg-[#0B3231] overflow-hidden transition-colors duration-300">
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]" style={{ transform: lang === "ar" ? "scaleX(-1)" : "none" }}>
                      <path d="M4.50781 13.7888L13.7673 4.5293" className="stroke-[#0B3231] group-hover:stroke-[#C6FF77] transition-colors duration-300" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6.11523 3.69629L13.6407 4.05161C13.9536 4.06752 14.224 4.33799 14.2399 4.65088L14.5953 12.1763" className="stroke-[#0B3231] group-hover:stroke-[#C6FF77] transition-colors duration-300" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
