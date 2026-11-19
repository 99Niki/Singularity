import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Singularity · A little less planning. A lot more exploring.",
  description: "Your colorful home for travel ideas, flexible itineraries, and shared adventures.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
