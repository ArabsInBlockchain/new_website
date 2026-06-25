import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Arabs in Blockchain — العرب × بلوكتشين';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0D0D1A 0%, #1e1640 55%, #0D0D1A 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Teal accent bar */}
        <div
          style={{
            width: 80,
            height: 4,
            background: '#00D4B4',
            borderRadius: 2,
            marginBottom: 40,
          }}
        />

        {/* Arabic title */}
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            color: '#F5A623',
            marginBottom: 12,
            letterSpacing: '-1px',
          }}
        >
          العرب × بلوكتشين
        </div>

        {/* English name */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 500,
            color: '#E8E6F0',
            marginBottom: 24,
          }}
        >
          Arabs in Blockchain
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: '#9B97B8',
            textAlign: 'center',
            maxWidth: 700,
          }}
        >
          Open · Borderless · Arab Web3 Community · Since 2020
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 44,
            fontSize: 18,
            color: '#00D4B4',
            opacity: 0.8,
          }}
        >
          arabsinblockchain.netlify.app
        </div>
      </div>
    ),
    { ...size },
  );
}
