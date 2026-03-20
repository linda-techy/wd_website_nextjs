import React from "react";
import { Metadata } from "next";
import AIInteriorDesigner360 from "@/components/Tools/AIInteriorDesigner360";

export const metadata: Metadata = {
  title: "AI Interior Designer 360° | Walldot Builders",
  description: "Design your interiors with AI. Upload your room photo and visualize design options in 360° — free tool by Walldot Builders, Kerala.",
  keywords: ["AI interior designer", "360 interior design", "room visualizer", "Kerala home design", "Walldot Builders"],
  openGraph: {
    title: "AI Interior Designer 360° | Walldot Builders",
    description: "Design your interiors with AI. Upload your room photo and visualize design options in 360°.",
    type: "website",
  },
};

export default function Page() {
  return (
    <section className="!pt-40 pb-20">
      <AIInteriorDesigner360 />
    </section>
  );
}


