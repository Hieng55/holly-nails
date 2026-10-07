import type { Metadata } from "next";
import { Forum, Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });
const forum = Forum({ weight: "400", subsets: ["latin"], variable: "--font-forum", display: "swap" });

export const metadata: Metadata = {
  title: "Holly Nails & Spa | Cheyenne, Wyoming",
  description: "Elevated nail care, spa pedicures and signature nail artistry in Cheyenne, Wyoming.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${jost.variable} ${forum.variable}`}>{children}</body></html>;
}
