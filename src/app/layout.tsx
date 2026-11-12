import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Abey Maghari — A little space for me",
  description: "Abey Maghari’s little corner of the internet. A portrait playground and a few favourite things, ready to make her own.",
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
