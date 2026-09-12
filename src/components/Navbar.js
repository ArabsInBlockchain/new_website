"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, { scope: navRef });

  const navLinks = [
    { label: t("nav.home"), href: "#hero", active: true },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.events"), href: "#events" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.values"), href: "#values" },
    { label: t("nav.projects"), href: "#projects" },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`flex w-full max-w-[1350px] h-[58px] px-4 md:px-[15px] justify-between items-center shrink-0 mx-auto absolute top-4 right-0 left-0 z-50 ${lang === 'en' ? 'font-sans' : ''}`}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        {/* Right side: Hamburger + Logo */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Hamburger Menu (Mobile Only) */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-black/20 text-white hover:bg-black/40 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {/* Logo */}
          <a href="#" className="flex w-[120px] md:w-[202px] h-10 flex-col items-start shrink-0 cursor-pointer">
            <img
              className="w-full h-auto shrink-0 overflow-hidden object-contain"
              src="https://api.builder.io/api/v1/image/assets/TEMP/214e62d2e51811aa322914eb9eb3a8842168677e?width=384"
              alt="Arab Blockchain Logo"
            />
          </a>
        </div>

        {/* Navigation Links - Center (Desktop Only) */}
        <div className="hidden md:flex w-[416px] flex-col items-start shrink-0">
          <div className="flex items-center gap-9 w-full">
            {navLinks.map((link, index) => (
              <a key={index} href={link.href} className="flex flex-col items-start cursor-pointer no-underline hover:opacity-80 transition-opacity whitespace-nowrap">
                <span className={`${link.active ? "text-[#C6FF77]" : "text-white"} font-thmanyahsans text-lg font-bold leading-[21.6px] capitalize whitespace-nowrap`}>
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* CTA Button & Lang Toggle - Left side */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center justify-center w-[40px] h-[40px] md:w-[46px] md:h-[46px] rounded-sm md:rounded-md bg-white hover:bg-[#C6FF77] text-[#0B3231] transition-colors text-sm font-bold uppercase cursor-pointer"
          >
            {lang === "ar" ? "EN" : "AR"}
          </button>
          <a
            href="https://t.me/ArabsInBlockchain"
            className="group flex h-[40px] md:h-[46px] py-2 px-4 md:px-6 items-center justify-center shrink-0 rounded-sm md:rounded-md bg-white overflow-hidden cursor-pointer no-underline hover:bg-[#C6FF77] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-center items-center gap-2">
              {/* Button Text */}
              <div className="flex justify-center items-center">
                <span className="text-[#0B3231] font-thmanyahsans text-[16px] md:text-[20px] font-bold leading-[1] capitalize">
                  {t("nav.join")}
                </span>
            </div>
            {/* Arrow Icon */}
            <div className="flex w-[14px] md:w-[16px] h-[14px] md:h-[16px] justify-center items-center transform group-hover:translate-x-[-3px] group-hover:translate-y-[-3px] transition-transform duration-300">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: lang === "ar" ? "scaleX(-1)" : "none" }}
              >
                <path
                  d="M4.50781 13.7908L13.7673 4.53125"
                  stroke="#0B3231"
                  strokeWidth="1.80692"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.11523 3.69727L13.6407 4.05259C13.9536 4.0685 14.224 4.33897 14.2399 4.65186L14.5953 12.1773"
                  stroke="#0B3231"
                  strokeWidth="1.80692"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </a>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[60] md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 ${lang === 'ar' ? 'right-0' : 'left-0'} h-full w-[280px] bg-[#0B3231] z-[70] transform transition-transform duration-300 ease-in-out md:hidden flex flex-col p-6 shadow-2xl ${isSidebarOpen ? "translate-x-0" : (lang === 'ar' ? "translate-x-full" : "-translate-x-full")} ${lang === 'en' ? 'font-sans' : ''}`}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <div className="flex justify-between items-center mb-10">
          <img
            className="w-[140px] h-auto object-contain"
            src="https://api.builder.io/api/v1/image/assets/TEMP/214e62d2e51811aa322914eb9eb3a8842168677e?width=384"
            alt="Logo"
          />
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center w-8 h-8 rounded-md bg-white hover:bg-[#C6FF77] text-[#0B3231] transition-colors text-xs font-bold uppercase cursor-pointer"
            >
              {lang === "ar" ? "EN" : "AR"}
            </button>
            <button
              onClick={() => setIsSidebarOpen(false)}
            className="text-white hover:text-[#C6FF77] transition-colors p-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center no-underline hover:translate-x-[-8px] transition-transform"
            >
              <span className={`${link.active ? "text-[#C6FF77]" : "text-white"} font-thmanyahsans text-[22px] font-bold`}>
                {link.label}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-auto pb-8">
          <a
            href="https://t.me/ArabsInBlockchain"
            onClick={() => setIsSidebarOpen(false)}
            className="flex w-full h-[54px] justify-center items-center rounded-xl bg-[#C6FF77] text-[#0B3231] font-thmanyahsans text-[22px] font-bold no-underline hover:bg-[#b5eb6a] transition-colors gap-2"
          >
            {t("nav.join")}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: lang === "ar" ? "scaleX(-1)" : "none" }}>
              <path d="M4.50781 13.7908L13.7673 4.53125" stroke="#0B3231" strokeWidth="1.80692" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.11523 3.69727L13.6407 4.05259C13.9536 4.0685 14.224 4.33897 14.2399 4.65186L14.5953 12.1773" stroke="#0B3231" strokeWidth="1.80692" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
