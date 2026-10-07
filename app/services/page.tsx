import HollySite from "@/components/holly-site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Nail Services & Pricing in Cheyenne, WY",
  description: "Explore manicure, pedicure, acrylic, dip powder, Gel-X, builder gel, kids nail services, waxing and add-on pricing in Cheyenne.",
  path: "/services",
});

export default function ServicesPage() {
  return <HollySite page="services" />;
}
