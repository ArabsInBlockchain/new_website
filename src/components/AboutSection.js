"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const { lang, t } = useLanguage();
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".about-desc",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".about-desc",
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }
    );

    gsap.fromTo(".about-stat",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".about-stats-container",
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }
    );
  }, { scope: container });
  const partnersRow1 = [
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/e9821e1aaa3da7683d948897d717e7ff15ac8be8?width=168", alt: "Chainlink", w: "84px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/a596446cf7868ee3f83daf26e69abb45919651a2?width=114", alt: "1inch", w: "57px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/951648ba0a44688c15d2fee7044869f0349e7da3?width=114", alt: "Dune", w: "57px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/08e951a70072e1704e732fe4b67c159e9356b372?width=200", alt: "Pravica", w: "100px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/437f992b61abf305359fd86ad31cb8f9e77e6281?width=200", alt: "Polkadot", w: "100px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/f75bff06a4c7b4cd0d7ec3bd3057d2c80f29f0a5?width=64", alt: "Polkadot Africa", w: "32px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/5ec3e5fed38f2b9e90dc317c957e50e0fe432596?width=64", alt: "Flow Blockchain", w: "32px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/9d3a27ad5471409f2e7b32b3feb285087742a555?width=200", alt: "zkVerify", w: "100px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/2bf104e00299dad3e89acd128e4132504457c373?width=107", alt: "Horizen", w: "53px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/9f949c8d04bdcba3c50c0338a1f831b5532929df?width=64", alt: "Cartesi", w: "32px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/04312beed7ddc0607daaf70a51075bc02be79258?width=64", alt: "Storj Institute", w: "32px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/8d2b78866bb56885193eb6c84b27a93dc2aba603?width=111", alt: "PizzaDAO", w: "56px" },
  ];

  const partnersRow2 = [
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/1793725a8b2bcfe38ae92c46e874b9442e975e9e?width=64", alt: "Dev3pack", w: "32px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/ce361efb12630ed83dcdd3f62da6bb66b602839f?width=64", alt: "startAD", w: "32px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/114cc7a49f021b1831bf79267f80cb5c002970c9?width=154", alt: "Egyptian Chinese University", w: "77px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/6f767054d1e8f0b256e740c340ac9ad052a2dcc6?width=64", alt: "People of Data", w: "32px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/feb0b7a07f93d502bcf76527d2302b1ca0d8ea21?width=200", alt: "ICP Egypt", w: "100px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/43e3da750b3016d57d33a2ed5f05dbb282f9ea84?width=64", alt: "Blokkat", w: "32px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/f40b4863e894498dec9655dba60daba19fe0d58a?width=64", alt: "The GrEEk Camps", w: "32px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/41293b41b0ef7b6b86812d15c6197de98a57946b?width=169", alt: "Mercatura Forum", w: "84px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/1793725a8b2bcfe38ae92c46e874b9442e975e9e?width=64", alt: "Partner", w: "32px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/ce361efb12630ed83dcdd3f62da6bb66b602839f?width=64", alt: "Partner", w: "32px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/114cc7a49f021b1831bf79267f80cb5c002970c9?width=154", alt: "Partner", w: "77px" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/6f767054d1e8f0b256e740c340ac9ad052a2dcc6?width=64", alt: "Partner", w: "32px" },
  ];

  const stats = [
    { value: "11K+", label: t("about.stats.telegram"), href: "#" },
    { value: "2K+", label: t("about.stats.linkedin"), href: "#" },
    { value: "600+", label: t("about.stats.x"), href: "#" },
    { value: "1.5K+", label: t("about.stats.luma"), href: "#" },
  ];

  return (
    <div ref={container} className={`flex flex-col items-start w-full bg-white ${lang === 'en' ? 'font-sans' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* About Section Content */}
      <div className="flex pt-10 pb-10 md:pb-16 flex-col items-start w-full">
        {/* Partners Row 1 - Scrolling RTL */}
        <h3 className="w-full text-center text-[#0B3231]/70 font-thmanyahsans text-[18px] md:text-[20px] font-bold mb-4">{t("about.supporters")}</h3>
        <div id="partners" className="w-full max-w-[1528px] mx-auto h-16 marquee-container">
          <div className="marquee-track-right gap-4 md:gap-6">
            {[...partnersRow1, ...partnersRow1].map((partner, i) => (
              <div
                key={`row1-${i}`}
                className="flex w-28 md:w-36 h-12 md:h-16 px-4 justify-center items-center shrink-0 rounded-xl opacity-60"
                style={{
                  background: "rgba(255, 255, 255, 0.90)",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10)",
                }}
              >
                <img
                  src={partner.src}
                  alt={partner.alt}
                  className="h-6 md:h-8 shrink-0 overflow-hidden object-contain"
                  style={{ width: partner.w, maxWidth: "100px" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About "من نحن" Section */}
      <div id="about" className="flex pb-4 flex-col items-start shrink-0 bg-white w-full">
        <div className="flex py-0 px-4 md:px-[92px] flex-col items-start w-full">
          <div className="flex w-full max-w-[1350px] mx-auto flex-col items-center">
            {/* Description */}
            <div className="about-desc flex flex-col items-center w-full">
              <p
                className="text-[#0B3231] font-thmanyahsans text-[20px] md:text-[30px] font-bold text-center capitalize w-full leading-[1.6] md:leading-[46px]"
              >
                {t("about.desc")}
              </p>
            </div>

            {/* Stats Row */}
            <div className="about-stats-container flex pt-10 md:pt-[72px] flex-col items-center w-full">
              <div className="flex flex-col md:flex-row w-full items-center justify-center gap-8 md:gap-0">
                {stats.map((stat, i) => (
                  <div
                    key={`stat-${i}`}
                    className={`about-stat flex flex-1 flex-col items-center w-full md:w-auto relative ${i !== stats.length - 1 ? "md:after:content-[''] md:after:absolute md:after:left-0 md:after:top-0 md:after:bottom-0 md:after:w-[1px] md:after:bg-[#B6C2C1]" : ""
                      } ${i !== stats.length - 1 ? "after:content-[''] after:absolute after:bottom-[-16px] after:left-1/4 after:right-1/4 after:h-[1px] after:bg-[#B6C2C1] md:after:h-auto md:after:bottom-0 md:after:left-0 md:after:right-auto md:after:bg-[#B6C2C1]" : ""
                      }`}
                  >
                    {/* Counter Value */}
                    <div className="flex h-auto md:h-[42px] justify-center items-center w-full overflow-hidden">
                      <span className="text-[#0B3231] font-manrope text-[32px] md:text-[42px] font-medium leading-[1] md:leading-[42px] text-center">
                        {stat.value}
                      </span>
                    </div>
                    {/* Label */}
                    <div className="flex pt-1 md:pt-2.5 flex-col items-center w-full">
                      <a
                        href={stat.href}
                        className="text-[#0B3231] font-thmanyahsans text-base md:text-lg font-bold leading-[1.5] underline text-center cursor-pointer"
                      >
                        {stat.label}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Partners Row 2 - Scrolling LTR */}
        <h3 className="w-full text-center text-[#0B3231]/70 font-thmanyahsans text-[18px] md:text-[20px] font-bold mt-10 md:mt-16 mb-4">{t("about.partners")}</h3>
        <div className="w-full max-w-[1528px] mx-auto flex flex-col justify-end marquee-container pb-4">
          <div className="marquee-track-left gap-6">
            {[...partnersRow2, ...partnersRow2].map((partner, i) => (
              <div
                key={`row2-${i}`}
                className="flex w-36 h-16 px-4 justify-center items-center shrink-0 rounded-xl opacity-60"
                style={{
                  background: "rgba(255, 255, 255, 0.90)",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10)",
                }}
              >
                <img
                  src={partner.src}
                  alt={partner.alt}
                  className="h-8 shrink-0 overflow-hidden object-contain"
                  style={{ width: partner.w, maxWidth: "100px" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
