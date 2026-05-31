'use client';

import { useTranslations } from 'next-intl';

const SUPPORTERS = [
  { name: 'Chainlink',        logo: 'https://res.cloudinary.com/dcig9rsj0/image/upload/v1780236322/1eb3704d-359a-42db-bd33-7e5cf2013b2a_kvn1uz.png' },
  { name: '1inch',            logo: 'https://res.cloudinary.com/dcig9rsj0/image/upload/v1780236581/1inch-com-cover_rxjbir.png' },
  { name: 'Dune',             logo: 'https://res.cloudinary.com/dcig9rsj0/image/upload/v1780236631/image_1_ysovfa.png' },
  { name: 'Pravica',          logo: 'https://res.cloudinary.com/dcig9rsj0/image/upload/v1780236811/Pravica_H_Logo.png_y3litj.webp' },
  { name: 'Polkadot',         logo: 'https://res.cloudinary.com/dcig9rsj0/image/upload/v1780236633/image_2_iwvule.png' },
  { name: 'Polkadot Africa',  logo: 'https://res.cloudinary.com/dcig9rsj0/image/upload/v1780236634/Transparent-background_jqx8h0.png' },
  { name: 'Flow Blockchain',  logo: 'https://res.cloudinary.com/dcig9rsj0/image/upload/v1780236378/c5a26d43bc024c87894f5bb9971229a0_dnjvlq.png' },
  { name: 'zkVerify',         logo: 'https://res.cloudinary.com/dcig9rsj0/image/upload/v1780236801/images_cntwaq.png' },
  { name: 'Horizen',          logo: 'https://res.cloudinary.com/dcig9rsj0/image/upload/v1780236145/Untitled_design_21_1709311553vkVISsbKRI_wtqh7h.jpg' },
  { name: 'Cartesi',          logo: 'https://res.cloudinary.com/dcig9rsj0/image/upload/v1780236124/36a6c43523ed48fb99de8b493d06b870_wpem4o.png' },
  { name: 'Storj Institute',  logo: 'https://res.cloudinary.com/dcig9rsj0/image/upload/v1780236185/MvF5Dsk5_400x400_nadij9.jpg' },
  { name: 'PizzaDAO',         logo: 'https://res.cloudinary.com/dcig9rsj0/image/upload/v1780236205/Qmat9XV3y8UfFPixgyUkxNW6dLtyuzVhnnh95jVAN8Bqfh_bbcvbd.png' },
] as const;

const PARTNERS = [
  { name: 'Dev3pack',                     logo: 'https://res.cloudinary.com/dcig9rsj0/image/upload/v1780236221/sqfawjjm_400x400_v1irfw.jpg' },
  { name: 'startAD',                      logo: 'https://res.cloudinary.com/dcig9rsj0/image/upload/v1780236346/qFzlXwmKZewLPzGRh9Jt8CFMx_Pil0nnwfnPs3aRPajH3-iCX-4gHcvVvcCF9VFRI5hBzQ1DLR8_s900-c-k-c0x00ffffff-no-rj_xlfuw7.jpg' },
  { name: 'Egyptian Chinese University',  logo: 'https://res.cloudinary.com/dcig9rsj0/image/upload/v1780237070/ECU-Logo_xzz9ld.png' },
  { name: 'People of Data',               logo: 'https://res.cloudinary.com/dcig9rsj0/image/upload/v1780236729/images_wm9iok.png' },
  { name: 'ICP Egypt',                    logo: 'https://res.cloudinary.com/dcig9rsj0/image/upload/v1780236993/rlyezsjimugnhiyalaq6.png' },
  { name: 'Blokkat',                      logo: 'https://res.cloudinary.com/dcig9rsj0/image/upload/v1780237039/images_h61pjv.png' },
  { name: 'The GrEEk Camps',              logo: 'https://res.cloudinary.com/dcig9rsj0/image/upload/v1780237007/images_ro50sf.png' },
  { name: 'Mercatura Forum',              logo: 'https://res.cloudinary.com/dcig9rsj0/image/upload/v1780237099/image_ps8kgq.png' },
] as const;

type LogoItem = { name: string; logo: string };

function MarqueeRow({ items, speed = 35 }: { items: readonly LogoItem[]; speed?: number }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <div
        className="flex items-center gap-6"
        style={{ animation: `marquee ${speed}s linear infinite`, width: 'max-content' }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex h-16 w-36 shrink-0 items-center justify-center rounded-xl bg-white/90 px-4 opacity-60 shadow-sm transition-all duration-300 hover:opacity-100"
            aria-hidden={i >= items.length}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.logo}
              alt={i < items.length ? item.name : ''}
              className="h-8 w-auto max-w-[100px] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PartnersBar() {
  const t = useTranslations('home.partners');

  return (
    <section className="py-14" style={{ background: 'var(--gradient-card)' }}>
      <div className="flex flex-col gap-8">
        {/* Supporters */}
        <div>
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted">
            {t('supporters')}
          </p>
          <MarqueeRow items={SUPPORTERS} speed={40} />
        </div>

        {/* Partners */}
        <div>
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted">
            {t('partners')}
          </p>
          <MarqueeRow items={PARTNERS} speed={28} />
        </div>
      </div>
    </section>
  );
}
