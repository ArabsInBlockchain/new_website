"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const { lang, t } = useLanguage();
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".footer-column", 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".footer-column",
          start: "top 90%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      }
    );

    gsap.fromTo(".footer-social", 
      { y: 20, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".footer-social",
          start: "top 95%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }
    );
  }, { scope: container });
  const mainPages = [
    { label: t("footer.mainPages.links.0"), href: "#" },
    { label: t("footer.mainPages.links.1"), href: "#about" },
    { label: t("footer.mainPages.links.2"), href: "#contact" },
    { label: t("footer.mainPages.links.3"), href: "#blog" },
    { label: t("footer.mainPages.links.4"), href: "#news" },
  ];

  const community = [
    { label: t("footer.community.links.0"), href: "#team" },
    { label: t("footer.community.links.1"), href: "#developers" },
    { label: t("footer.community.links.2"), href: "#projects" },
    { label: t("footer.community.links.3"), href: "#project-details" },
  ];

  const resources = [
    { label: t("footer.resources.links.0"), href: "#workshops" },
    { label: t("footer.resources.links.1"), href: "#changelog" },
    { label: t("footer.resources.links.2"), href: "#guide" },
    { label: t("footer.resources.links.3"), href: "#faq" },
    { label: t("footer.resources.links.4"), href: "#terms" },
  ];

  const socials = [
    { label: t("footer.socials.0"), href: "https://luma.com/arabsInBlockchain" },
    { label: t("footer.socials.1"), href: "https://t.me/ArabsInBlockchain" },
    { label: t("footer.socials.2"), href: "https://www.linkedin.com/company/arabs-in-blockchain/" },
    { label: t("footer.socials.3"), href: "https://x.com/ArabsInBC" },
    { label: t("footer.socials.4"), href: "https://github.com/ArabsInBlockchain" },
  ];

  return (
    <footer ref={container} className={`w-full bg-[#0B3231] overflow-hidden relative z-20 ${lang === 'en' ? 'font-sans' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-[1350px] mx-auto px-4 md:px-8 pt-[120px] pb-[60px]">

        {/* Main Content Grid */}
        <div className="border border-[#546F6F] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* Links Columns (3 columns) */}
            <div className="col-span-1 lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 p-8 md:p-10 gap-10 lg:border-l border-b lg:border-b-0 border-[#546F6F]">
              
              {/* Column 1 - Main Pages */}
              <div className="footer-column flex flex-col">
                <h3 className="text-white font-thmanyahsans text-[22px] md:text-[24px] font-semibold leading-[1.2]  mb-8">
                  {t("footer.mainPages.title")}
                </h3>
                <div className="flex flex-col gap-7">
                  {mainPages.map((link, idx) => (
                    <a key={idx} href={link.href} className="text-white/80 font-thmanyahsans text-[18px] font-normal leading-[1] hover:text-[#C6FF77] transition-colors duration-300">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Column 2 - Community */}
              <div className="footer-column flex flex-col">
                <h3 className="text-white font-thmanyahsans text-[22px] md:text-[24px] font-semibold leading-[1.2]  mb-8">
                  {t("footer.community.title")}
                </h3>
                <div className="flex flex-col gap-7">
                  {community.map((link, idx) => (
                    <a key={idx} href={link.href} className="text-white/80 font-thmanyahsans text-[18px] font-normal leading-[1] hover:text-[#C6FF77] transition-colors duration-300">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Column 3 - Resources */}
              <div className="footer-column flex flex-col">
                <h3 className="text-white font-thmanyahsans text-[22px] md:text-[24px] font-semibold leading-[1.2]  mb-8">
                  {t("footer.resources.title")}
                </h3>
                <div className="flex flex-col gap-7">
                  {resources.map((link, idx) => (
                    <a key={idx} href={link.href} className="text-white/80 font-thmanyahsans text-[18px] font-normal leading-[1] hover:text-[#C6FF77] transition-colors duration-300">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Subscribe & Contact Column */}
            <div className="footer-column col-span-1 lg:col-span-5 p-8 md:p-10 flex flex-col justify-between gap-10">
              {/* Subscribe */}
              <div className="flex flex-col">
                <h3 className={`text-white font-thmanyahsans text-[22px] md:text-[24px] font-bold leading-[1]  mb-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  {t("footer.subscribe.title")}
                </h3>
                <div className="w-full h-[62px] bg-[#1A4744] border border-[#1A4744] flex items-center px-5">
                  <input
                    type="email"
                    placeholder={t("footer.subscribe.placeholder")}
                    className={`w-full bg-transparent text-white font-thmanyahsans text-[14px] font-bold ${lang === 'ar' ? 'text-right' : 'text-left'} outline-none placeholder:text-white/60`}
                  />
                </div>
              </div>

              {/* Contact */}
              <div className={`flex items-center ${lang === 'ar' ? 'justify-between' : 'justify-between'}`}>
                <span className={`text-white font-thmanyahsans text-[22px] md:text-[24px] font-semibold leading-[1.2] direction-ltr`}>
                  (966) 5XX XXX XXXX
                </span>
                <span className="text-white/80 font-thmanyahsans text-[18px] font-bold">
                  {t("footer.subscribe.contactNow")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Bar */}
        <div className="border border-[#546F6F] border-t-0 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-5">
            {socials.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className="footer-social group flex items-center justify-between py-7 px-6 md:px-8 border-l border-[#546F6F] last:border-l-0 hover:bg-[#546F6F]/20 transition-colors duration-300"
              >
                <span className="text-[#C6FF77] font-thmanyahsans text-[18px] font-bold">
                  {social.label}
                </span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]" style={{ transform: lang === "ar" ? "scaleX(-1)" : "none" }}>
                  <path d="M4.50781 13.7889L13.7674 4.5293" stroke="#C6FF77" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.11523 3.69629L13.6407 4.05161C13.9536 4.06752 14.224 4.33799 14.2399 4.65089L14.5953 12.1763" stroke="#C6FF77" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border border-[#546F6F] border-t-0 overflow-hidden">
          <div className={`flex flex-col sm:flex-row items-center ${lang === 'ar' ? 'justify-between' : 'justify-between'} py-7 px-6 md:px-8 gap-4`}>
            <span className="text-white/80 font-thmanyahsans text-[16px] md:text-[18px] font-normal text-center sm:text-right">
              {t("footer.copyright.rights")} <span className="font-semibold">{t("footer.copyright.org")}</span> | <span className="font-semibold">{t("footer.copyright.terms")}</span>
            </span>
            <span className="text-white/80 font-thmanyahsans text-[16px] md:text-[18px] font-normal text-center sm:text-left">
              {t("footer.copyright.madeBy")} <span className="font-semibold text-[#C6FF77]">{t("footer.copyright.community")}</span>
            </span>
          </div>
        </div>

      </div>

      {/* Large Watermark Logo */}
      <div className="w-full flex justify-center items-center pb-10 opacity-[0.06]">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/3f798ee810ee5529d76d9a8669d7418bcf2ab135?width=2788" 
          alt="" 
          className="w-[90%] max-w-[1400px] h-auto object-contain"
        />
      </div>
    </footer>
  );
}
