import React from "react";
import { Metadata } from "next";
import AIInteriorDesigner360 from "@/components/Tools/AIInteriorDesigner360";

export const metadata: Metadata = {
  title: "AI Interior Designer 360 | Walldot builders",
};

export default function Page() {
  return (
    <section className="!pt-40 pb-20">
      <AIInteriorDesigner360 />
    </section>
  );
}


