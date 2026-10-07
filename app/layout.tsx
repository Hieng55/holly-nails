import type { Metadata } from "next";
import { Forum, Jost } from "next/font/google";
import { siteUrl, socialImage } from "@/lib/seo";
import "./globals.css";

const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });
const forum = Forum({ weight: "400", subsets: ["latin"], variable: "--font-forum", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Holly Nails & Spa | Nail Salon in Cheyenne, WY",
    template: "%s | Holly Nails & Spa",
  },
  description: "Holly Nails & Spa offers manicures, spa pedicures, acrylic, dip powder, Gel-X and custom nail art in Cheyenne, Wyoming.",
  applicationName: "Holly Nails & Spa",
  keywords: ["nail salon Cheyenne", "nails Cheyenne WY", "manicure Cheyenne", "pedicure Cheyenne", "Holly Nails and Spa"],
  authors: [{ name: "Holly Nails & Spa" }],
  creator: "Holly Nails & Spa",
  publisher: "Holly Nails & Spa",
  category: "Beauty Salon",
  icons: {
    icon: [{ url: socialImage, type: "image/jpeg" }],
    shortcut: socialImage,
    apple: [{ url: socialImage, type: "image/jpeg" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Holly Nails & Spa",
    title: "Holly Nails & Spa | Nail Salon in Cheyenne, WY",
    description: "Elevated manicures, spa pedicures and signature nail artistry in Cheyenne, Wyoming.",
    images: [{ url: socialImage, alt: "Holly Nails & Spa in Cheyenne, Wyoming" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Holly Nails & Spa | Nail Salon in Cheyenne, WY",
    description: "Elevated manicures, spa pedicures and signature nail artistry in Cheyenne, Wyoming.",
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "NailSalon",
  name: "Holly Nails & Spa",
  image: socialImage,
  url: siteUrl,
  telephone: "+1-307-342-3689",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2316 Dell Range Blvd, Ste B1",
    addressLocality: "Cheyenne",
    addressRegion: "WY",
    postalCode: "82009",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:30", closes: "18:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:30", closes: "16:30" },
  ],
  sameAs: [
    "https://www.facebook.com/profile.php?id=61585411765707",
    "https://www.instagram.com/hollynailsspawy82009",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${jost.variable} ${forum.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        {children}
      </body>
    </html>
  );
}
