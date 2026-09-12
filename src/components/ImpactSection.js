"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function ImpactSection() {
  const { lang, t } = useLanguage();
  const points = [
    {
      title: t("impact.points.0.title"),
      desc: t("impact.points.0.desc"),
      icon: (
        // Clean Filled Standalone Lock Icon
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#0B3231" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="11" width="14" height="10" rx="2" ry="2" fill="#0B3231"/>
          <path d="M12 15v3" stroke="#EEF2F5" strokeWidth="2"/>
          <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
        </svg>
      ),
    },
    {
      title: t("impact.points.1.title"),
      desc: t("impact.points.1.desc"),
      icon: (
        // Clean Filled Users Group (Community)
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#0B3231" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill="#0B3231"/>
          <circle cx="9" cy="7" r="4" fill="#0B3231"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" fill="#0B3231"/>
          <circle cx="19" cy="8" r="3" fill="#0B3231"/>
        </svg>
      ),
    },
    {
      title: t("impact.points.2.title"),
      desc: t("impact.points.2.desc"),
      icon: (
        // Clean Filled Cube/Block (Web3 Innovation)
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#0B3231" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l9 5.2v10.4l-9 5.4-9-5.4V7.2L12 2z" fill="#0B3231"/>
          <polyline points="3 7.2 12 12.4 21 7.2" stroke="#C6FF77" strokeWidth="1.5"/>
          <line x1="12" y1="22.8" x2="12" y2="12.4" stroke="#C6FF77" strokeWidth="1.5"/>
        </svg>
      ),
    },
  ];

  return (
    <div id="impact" className={`w-full bg-white py-16 md:py-36 relative overflow-hidden ${lang === 'en' ? 'font-sans' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-[1350px] mx-auto px-4 md:px-[15px]">
        <div className="flex flex-col items-start w-full">
          
          {/* Header Title Section */}
          <div className="w-full max-w-[1200px] pb-10 md:pb-14">
            <h2 className={`text-[#0B3231] font-thmanyahsans text-[26px] md:text-[52px] font-bold leading-[1.4] md:leading-[1.2] ${lang === 'ar' ? 'text-center md:text-right' : 'text-center md:text-left'}`}>
              {t("impact.title")}
            </h2>
          </div>

          {/* CTA Button */}
          <div className="w-full pb-16 md:pb-24 flex justify-center md:justify-start">
            <a
              href="https://github.com/ArabsInBlockchain"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full md:w-[267px] max-w-[267px] h-[62px] py-2 pr-5 pl-2 items-center justify-between rounded-xl bg-[#0B3231] overflow-hidden gap-[18px] no-underline cursor-pointer transition-all cta-button-dark"
            >
              {/* Button Text */}
              <div className="flex justify-center items-center flex-1">
                <span className="text-white text-center font-thmanyahsans text-[18px] font-bold leading-[21.6px]">
                  {t("impact.btn")}
                </span>
              </div>
              {/* Arrow Icon Box */}
              <div className="flex w-[46px] h-[46px] justify-center items-center rounded-[10px] bg-[#C6FF77] overflow-hidden shrink-0 arrow-icon-box">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="arrow-svg"
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
            </a>
          </div>

          {/* Impact Cards Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 pt-10 border-t border-[#B6C2C1]/40">
            {points.map((point, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-5 ${lang === 'ar' ? 'text-center md:text-right' : 'text-center md:text-left'}`}>
                {/* Custom Icon Wrapper (Pushed down slightly with mt-2 on desktop) */}
                <div className="w-20 h-20 flex justify-center items-center rounded-xl bg-[#C6FF77] shrink-0 overflow-hidden shadow-sm md:mt-2">
                  {point.icon}
                </div>
                {/* Card Content */}
                <div className={`flex flex-col ${lang === 'ar' ? 'items-center md:items-start' : 'items-center md:items-start'}`}>
                  <h3 className="text-[#0B3231] font-thmanyahsans text-[22px] md:text-[20px] font-bold leading-[1.4] md:leading-[28px] mb-2">
                    {point.title}
                  </h3>
                  <p className="text-[#0B3231]/80 font-thmanyahsans text-[16px] font-medium leading-[1.6] md:leading-[27px]">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
