import HollySite from "@/components/holly-site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact & Hours | Nail Salon in Cheyenne, WY",
  description: "Contact Holly Nails & Spa at (307) 342-3689 or visit us at 2316 Dell Range Blvd, Ste B1, Cheyenne, WY 82009.",
  path: "/contact",
});

export default function ContactPage() {
  return <HollySite page="contact" />;
}
