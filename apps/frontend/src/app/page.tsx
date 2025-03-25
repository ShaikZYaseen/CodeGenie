import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
  <div>
    <Navbar/>
    <div className="mt-[60px] w-full h-[50vh] flex items-center justify-center">
    <Hero/>
    </div>

  </div>
  );
}
