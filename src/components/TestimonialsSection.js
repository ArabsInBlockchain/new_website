"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TestimonialsSection() {
  const { lang, t } = useLanguage();
  const container = useRef(null);
  const testimonials = [
    {
      name: t("testimonials.list.0.name"),
      role: t("testimonials.list.0.role"),
      image: "/balfaqih.jpg",
      rating: 5,
      text: t("testimonials.list.0.text"),
    },
    {
      name: t("testimonials.list.1.name"),
      role: t("testimonials.list.1.role"),
      image: "https://github.com/adham-ahmed.png",
      rating: 5,
      text: t("testimonials.list.1.text"),
    },
    {
      name: t("testimonials.list.2.name"),
      role: t("testimonials.list.2.role"),
      image: "https://github.com/yousefalqadi.png",
      rating: 5,
      text: t("testimonials.list.2.text"),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(696);
  const [gapSize, setGapSize] = useState(32);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlideWidth(window.innerWidth - 32); // Full width minus padding
        setGapSize(16);
      } else {
        setSlideWidth(696);
        setGapSize(32);
      }
    };

    // Set initial size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === testimonials.length - 1;

  const handlePrev = () => {
    if (!isFirst) setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!isLast) setCurrentIndex((prev) => prev + 1);
  };

  useGSAP(() => {
    gsap.fromTo(".testimonials-header",
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".testimonials-header",
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }
    );

    gsap.fromTo(".testimonials-carousel",
      { scale: 0.95, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".testimonials-carousel",
          start: "top 80%",
        },
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className={`w-full bg-[#0B3231] py-16 md:py-[150px] relative overflow-hidden ${lang === 'en' ? 'font-sans' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-[1350px] mx-auto px-4 md:px-8">

        {/* Section Heading */}
        <div className="testimonials-header flex flex-col items-center text-center mb-10 md:mb-16">
          <h2 className="text-white font-thmanyahsans text-[28px] md:text-[52px] font-medium leading-[1.4] md:leading-[1.2] max-w-[700px]">
            {t("testimonials.title")}
          </h2>
        </div>
      </div>

      {/* Carousel Track */}
      <div className="testimonials-carousel w-full overflow-hidden px-4 md:px-8">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            gap: `${gapSize}px`,
            transform: `translateX(${currentIndex * (slideWidth + gapSize)}px)`,
            width: `${testimonials.length * (slideWidth + gapSize)}px`,
            marginRight: `calc(50% - ${slideWidth / 2}px)`,
          }}
        >
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="shrink-0 transition-all duration-500"
              style={{
                width: `${slideWidth}px`,
                opacity: idx === currentIndex ? 1 : 0.4,
                transform: idx === currentIndex ? "rotate(0deg)" : idx > currentIndex ? "rotate(2deg)" : "rotate(-2deg)",
              }}
            >
              <div className="bg-[#EEF2F5] rounded-[12px] p-6 md:p-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-[75px] h-[75px] rounded-full border border-[#B6C2C1] overflow-hidden shrink-0">
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-[#0B3231] font-thmanyahsans text-[22px] md:text-[24px] font-semibold leading-[1.2] ">
                        {testimonial.name}
                      </h3>
                      <span className="text-[#0B3231]/70 font-thmanyahsans text-[16px] md:text-[18px] font-medium mt-2">
                        {testimonial.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-[#B6C2C1] mb-10" />

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#C6FF77" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                </div>

                {/* Text */}
                <p className="text-[#0B3231] font-thmanyahsans text-[17px] md:text-[18px] font-medium leading-[1.5] ">
                  {testimonial.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-4 mt-16">
        <button
          onClick={handlePrev}
          disabled={isFirst}
          className={`w-[70px] h-[70px] rounded-[12px] flex items-center justify-center transition-colors duration-300 cursor-pointer ${isFirst ? 'bg-[#EEF2F5]/30 cursor-not-allowed' : 'bg-[#EEF2F5] hover:bg-[#C6FF77]'}`}
          aria-label="السابق"
        >
          <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip_prev2)">
              <path d="M1.25 11.25H23.075" stroke="#0B3231" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.0391 1.25L23.4891 10.5375C23.8391 10.925 23.8391 11.5625 23.4891 11.95L15.0391 21.2375" stroke="#0B3231" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <clipPath id="clip_prev2">
                <rect width="25" height="23" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <button
          onClick={handleNext}
          disabled={isLast}
          className={`w-[70px] h-[70px] rounded-[12px] flex items-center justify-center transition-colors duration-300 cursor-pointer ${isLast ? 'bg-[#EEF2F5]/30 cursor-not-allowed' : 'bg-[#EEF2F5] hover:bg-[#C6FF77]'}`}
          aria-label="التالي"
        >
          <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip_next2)">
              <path d="M23.7527 11.25H1.92773" stroke="#0B3231" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.96249 1.25L1.5125 10.5375C1.1625 10.925 1.1625 11.5625 1.5125 11.95L9.96249 21.2375" stroke="#0B3231" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <clipPath id="clip_next2">
                <rect width="25" height="23" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </section>
  );
}
