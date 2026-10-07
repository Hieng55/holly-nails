import HollySite from "@/components/holly-site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Nail Art Gallery in Cheyenne, WY",
  description: "Browse manicures, custom nail art and beautiful nail designs created by Holly Nails & Spa in Cheyenne, Wyoming.",
  path: "/gallery",
});

export default function GalleryPage() {
  return <HollySite page="gallery" />;
}
