"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const { lang, t } = useLanguage();
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".hero-heading", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.3
    })
      .from(".hero-cta", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.8")
      .from(".hero-stats", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6");

    gsap.fromTo(".video-content",
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".video-content",
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2
      }
    );
  }, { scope: container });

  return (
    <div ref={container} className={`flex flex-col items-stretch w-full ${lang === 'en' ? 'font-sans' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Section 1: Main Hero */}
      <div
        id="hero"
        className="flex flex-col items-stretch w-full relative min-h-screen"
        style={{
          background:
            "linear-gradient(180deg, #0B3231 0%, rgba(11, 50, 49, 0.00) 24%), url('https://api.builder.io/api/v1/image/assets/TEMP/3e5fadc9b2ad2812a49426e945931ae68df6c879?width=3068') lightgray 50% / cover no-repeat",
        }}
      >
        {/* Top Content */}
        <div className="flex w-full px-4 md:px-[92px] pt-[180px] md:pt-[208px] pb-32 md:pb-[100px] flex-col items-center">
          <div className="flex w-full max-w-[1350px] px-2 md:px-[15px] flex-col items-center">
            <div className="flex w-full max-w-[1320px] flex-col items-center">
              {/* Heading */}
              <div className="hero-heading flex w-full max-w-[896px] pb-8 md:pb-10 flex-col items-center">
                <p
                  className={`text-[#0B3231] text-center font-thmanyahsans text-[32px] md:text-[48px] font-bold ${lang === 'ar' ? 'leading-[1.4] md:leading-[101.2px]' : 'leading-[1.4] md:leading-[1.4]'}`}
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {t("hero.title")}
                </p>
              </div>

              {/* CTA Button */}
              <div className="hero-cta flex pb-1 justify-center items-center w-full">
                <a
                  href="https://luma.com/arabsInBlockchain"
                  className="flex w-auto md:w-full max-w-[267px] h-[50px] md:h-[62px] py-1.5 md:py-2 pl-1.5 md:pl-2 pr-4 md:pr-5 items-center justify-between rounded-xl bg-[#C6FF77] overflow-hidden gap-3 md:gap-[18px] cursor-pointer no-underline transition-all cta-button-interactive mx-auto"
                >
                  {/* Button Text */}
                  <div className="flex justify-center items-center flex-1">
                    <span className="text-[#0B3231] text-center font-thmanyahsans text-[16px] md:text-[22px] font-bold leading-[1.2] md:leading-[21.6px] transition-colors">
                      {t("hero.joinBtn")}
                    </span>
                  </div>
                  {/* Arrow Icon Box */}
                  <div className="flex w-[38px] md:w-[46px] h-[38px] md:h-[46px] justify-center items-center rounded-lg md:rounded-[10px] bg-[#0B3231] overflow-hidden shrink-0 arrow-icon-box">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="arrow-svg w-4 h-4 md:w-[18px] md:h-[18px]"
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

            {/* Stats Section */}
            <div className="hero-stats flex pt-16 md:pt-[112px] flex-col items-center w-full">
              <div className="flex flex-col md:flex-row w-full max-w-[1320px] justify-between items-start md:items-center gap-6 md:gap-0">
                {/* Right side in RTL: Counter + Year */}
                <div className="flex items-center gap-[18px]">
                  <div className="flex items-center overflow-hidden gap-4">
                    <img src="/star.png" alt="Star" className="w-[45px] h-[45px] object-contain" />
                    <p className="text-[#0B3231] font-thmanyahsans text-[28px] md:text-[33px] font-bold leading-[1.2] md:leading-[60px]">
                      {t("hero.since")} {t("hero.year")}
                    </p>
                  </div>
                </div>

                {/* Left side in RTL: Description */}
                <div
                  className={`w-full md:w-[380px] text-[#0B3231] ${lang === 'ar' ? 'text-right' : 'text-left'} font-thmanyahsans text-[20px] md:text-[24px] font-bold`}
                  style={{ lineHeight: "1.4" }}
                >
                  {t("hero.desc")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Video Section */}
      <div
        id="events"
        className="w-full h-[733px] overflow-hidden relative"
        style={{
          background:
            "url('https://api.builder.io/api/v1/image/assets/TEMP/bd0ee3405eda6da0fc29903abd0f4315e4c89461?width=3068') lightgray 50% / cover no-repeat",
        }}
      >
        {/* Gradient Overlay */}
        <div
          className="w-full h-[705px] absolute left-0 bottom-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11, 50, 49, 0.00) 0%, #0B3231 100%)",
          }}
        />

        {/* Play Button - Center */}
        <a
          href="https://www.youtube.com/channel/UC_5orftfcZkLNn5LmIPodAA"
          target="_blank"
          rel="noopener noreferrer"
          className="video-content flex w-20 h-11 justify-center items-center rounded-[10px] bg-[#2E2E2E] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer border-none hover:bg-[#444] transition-colors z-10"
          style={{ padding: "7.66px 18px 11.54px 18px" }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_play)">
              <path
                d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44Z"
                fill="#2E2E2E"
              />
              <path
                d="M12.2793 33.2857V10.3946C12.2793 9.19377 13.5724 8.43749 14.619 9.02617L34.9666 20.4717C36.0337 21.0719 36.0337 22.6083 34.9666 23.2085L14.619 34.654C13.5724 35.2427 12.2793 34.4864 12.2793 33.2857Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_play">
                <rect width="44" height="44" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </a>

        {/* Bottom Content */}
        <div className="video-content absolute bottom-[40px] md:bottom-[60px] left-0 right-0 flex flex-col md:flex-row justify-between items-center md:items-end px-4 md:px-[43px] z-10 gap-6 md:gap-0">
          {/* Right side (RTL): Description Text */}
          <div
            className={`w-full md:w-[380px] h-auto md:h-[81px] text-white text-center ${lang === 'ar' ? 'md:text-right' : 'md:text-left'} font-thmanyahsans text-[18px] md:text-[24px] font-bold`}
            style={{ lineHeight: "1.5" }}
          >
            {t("hero.eventsDesc")}
          </div>

          {/* Left side (RTL): CTA Button */}
          <a
            href="https://luma.com/arabsInBlockchain"
            className="flex w-full md:w-[267px] h-[62px] py-2 pl-2 pr-5 items-center justify-between rounded-xl bg-[#C6FF77] overflow-hidden gap-[18px] no-underline cursor-pointer transition-all cta-button-interactive"
          >
            {/* Arrow Icon Box */}
            <div className="flex w-[46px] h-[46px] justify-center items-center rounded-[10px] bg-[#0B3231] overflow-hidden shrink-0 arrow-icon-box">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="arrow-svg"
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
            {/* Button Text */}
            <div className="flex justify-center items-center flex-1">
              <span className="text-[#0B3231] text-center font-thmanyahsans text-[20px] md:text-[22px] font-bold leading-[21.6px] capitalize transition-colors">
                {t("hero.eventsBtn")}
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
