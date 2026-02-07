import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: '--font-playfair',
  display: 'swap',
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: '--font-dancing-script',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Picphoto - Custom Travel Photobooks",
  description: "Create stunning personalized travel photobooks in minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfair.variable} ${dancingScript.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
