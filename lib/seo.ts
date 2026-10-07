import type { Metadata } from "next";

export const siteUrl = "https://hollynailsandspacheyenne.com";
export const socialImage = `${siteUrl}/wp-content/uploads/2026/10/holly.jpg`;

type PageMetadata = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({ title, description, path }: PageMetadata): Metadata {
  const canonical = path === "/" ? siteUrl : `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical,
      siteName: "Holly Nails & Spa",
      title,
      description,
      images: [{ url: socialImage, alt: "Holly Nails & Spa in Cheyenne, Wyoming" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
