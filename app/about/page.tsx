import HollySite from "@/components/holly-site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Our Nail Salon in Cheyenne, WY",
  description: "Discover Holly Nails & Spa, a refined Cheyenne nail salon focused on sanitation, thoughtful service and personalized nail artistry.",
  path: "/about",
});

export default function AboutPage() {
  return <HollySite page="about" />;
}
