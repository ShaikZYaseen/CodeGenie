"use client";
import React from "react";
import { Boxes } from "./ui/background-boxes";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import { Forward } from "lucide-react";

export function BackgroundBoxesDemo() {
  return (
    <div className="h-full relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <div className="w-full">
            <p className="text-center text-white text-bold text-4xl">
            Turn Ideas into Apps with AI
            </p>
            <p className="text-center text-white text-xl mt-2">Describe your app, let AI do the rest</p>
            <div className="w-full flex justify-center items-center mt-8">
            <Textarea placeholder="Create a chess aplication.." className="w-1/2 text-white z-1000" />
            <Forward color="white" className="ml-4 cursor-pointer hover:text-white"/>
            {/* <Send className="ml-4 cursor-pointer"/> */}


            </div>
        </div>
    </div>
  );
}
