import HollySite from "@/components/holly-site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Holly Nails & Spa | Nail Salon in Cheyenne, WY",
  description: "Visit Holly Nails & Spa in Cheyenne, WY for manicures, spa pedicures, acrylic, dip powder, Gel-X and custom nail art.",
  path: "/",
});

export default function HomePage() {
  return <HollySite page="home" />;
}
