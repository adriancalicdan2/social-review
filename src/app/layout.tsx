import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://tmaker.com"),
  title: "TMaker — NFC Digital Profile Template Maker",
  description: "One Tap. Your Entire Digital Presence. Create, brand, and publish responsive digital profile pages linked to physical NFC business cards.",
  icons: {
    icon: "/image.png",
    apple: "/image.png",
  },
  openGraph: {
    title: "TMaker — NFC Digital Profile Studio",
    description: "One Tap. Your Entire Digital Presence. Create, brand, and publish responsive digital profile pages.",
    images: ["/image.png"],
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0814",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
