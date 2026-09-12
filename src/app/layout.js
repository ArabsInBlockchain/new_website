import "./globals.css";

export const metadata = {
  title: "Arab Blockchain Portfolio",
  description: "بوابة البلوكتشين العربية",
  icons: {
    icon: "/logo.png",
  },
};

import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <LanguageProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
