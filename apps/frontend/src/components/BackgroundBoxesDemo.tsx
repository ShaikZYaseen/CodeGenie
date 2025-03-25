"use client";
import React, { useState } from "react";
import { Boxes } from "./ui/background-boxes";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import { Forward } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { BACKEND_URL } from "@/config/config";

export function BackgroundBoxesDemo() {
  const [prompt, setPrompt] = useState<String>();
  const {getToken}  = useAuth()
  return (
    <div className="h-full relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-xl">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <div className="w-full">
            <p className="text-center text-white text-bold text-4xl">
            Turn Ideas into Apps with AI
            </p>
            <p className="text-center text-white text-xl mt-2">Describe your app, let AI do the rest &nbsp;:)</p>
            <div className="w-full flex justify-center items-center mt-8">
           
            <Textarea placeholder="Create a chess aplication.." onChange={(e)=>{setPrompt(e.target.value)}} className="w-1/2 text-white z-1000" />
            <Button onClick={async()=>{
              const token =await getToken();
            const res = await axios.post(`${BACKEND_URL}/projects`,{prompt},{
              headers: {
                "Authorization" : `Bearer ${token}`
              }
            })
            console.log(res.data)

            }} className="z-100 cursor-pointer hover:bg-white hover:text-black ml-2">
            <Forward  className=" hover:text-black"/>

                  </Button>
            {/* <Send className="ml-4 cursor-pointer"/> */}


            </div>
        </div>
    </div>
  );
}
