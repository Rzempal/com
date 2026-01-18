"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TwoPillars from "@/components/TwoPillars";
import RetroHub from "@/components/RetroHub";
import { useState } from "react";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <main className="min-h-screen">
      <Navbar onSidebarToggle={handleSidebarToggle} sidebarOpen={sidebarOpen} />

      <Hero onScrollClick={() => {
        const nextSection = document.getElementById("twoPillarsSection");
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      }} />

      <TwoPillars id="twoPillarsSection" />

      {/* Retro-Future Hub (Page 3) */}
      <RetroHub />
    </main>
  );
}
