import type { Metadata } from "next";
import "./globals.css";
import { abey } from "@/content/abey";
export const metadata: Metadata = {
  title: "Abey Maghari — A little space for me",
  description: abey.intro,
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
