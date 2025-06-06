import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DynamicCartProvider from "@/components/providers/DynamicCartProvider";

// Import the custom fonts from Google Fonts
const protestRiot = "https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap";
const poppins = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap";
const abyssinicaSIL = "https://fonts.googleapis.com/css2?family=Abyssinica+SIL&display=swap";

// Include the Geist and Geist_Mono fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Link the custom fonts */}
        <link href={protestRiot} rel="stylesheet" />
        <link href={poppins} rel="stylesheet" />
        <link href={abyssinicaSIL} rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          fontFamily: 'Poppins, sans-serif', // Default for body text
        }}
      >
        <DynamicCartProvider>
          {children}
        </DynamicCartProvider>
      </body>
    </html>
  );
}
