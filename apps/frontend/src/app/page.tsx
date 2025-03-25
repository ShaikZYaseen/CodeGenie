import { AppSidebar } from "@/components/AppSidebar";
import { BackgroundBoxesDemo } from "@/components/BackgroundBoxesDemo";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";

export default function Home() {
  return (
  <div>
    
    <Navbar/>
    <div className="mt-[60px] w-full h-[100vh] flex items-center justify-center">
      <div className="w-[90%] h-[100%]">
    <BackgroundBoxesDemo/>


      </div>
    </div>

  </div>
  );
}
