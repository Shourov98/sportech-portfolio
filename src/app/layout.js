import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav/NavBar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sportech",
  description: "Technology Serving Sports",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0f1111] text-white">
        {/* global translucent navbar */}
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
