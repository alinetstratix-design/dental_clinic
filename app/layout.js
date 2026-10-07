import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import site from "../config/site.json";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: `${site.clinicName} | Premier Dental Clinic in ${site.city}`,
  description: site.heroSub,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className} style={{ "--brand": site.brandColor || "#2563eb" }}>
        {children}
      </body>
    </html>
  );
}
