import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/nav/NavBar";
import Footer from "@/components/Footer";
import EdgeSoftOrbsTop from "@/components/EdgeSoftOrbsTop";
import AppDataBootstrap from "@/components/AppDataBootstrap";

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
        <AppDataBootstrap />
        <NavBar />
        {children}
        <EdgeSoftOrbsTop
          size={600}
          duration={56}
          intensity={0.45}
          blend="screen"
        />
        <Footer />
      </body>
    </html>
  );
}
