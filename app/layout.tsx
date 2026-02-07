import type { Metadata } from "next";
import "./globals.css";

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
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
