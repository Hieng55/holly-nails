import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Holly Nails & Spa | Cheyenne, Wyoming",
  description: "Elevated nail care, spa pedicures and signature nail artistry in Cheyenne, Wyoming.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
