"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";
import { TypographyH4 } from "./ui/TypographyH4";

export function AppSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed left-0 top-0 h-screen w-4 text-black border-none hover:w-6 bg-transparent"
      onMouseEnter={() => setOpen(true)}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-64 bg-gray-900 border-none text-white"
          onMouseLeave={() => setOpen(false)}
        >
          <h2 className="text-lg mr-4 p-2 pt-4 text-center font-sans">CodeGenie</h2>
          <ul className="mt-2 space-y-1">
            <li className="cursor-pointer pl-4 text-sm py-2 hover:bg-gray-700">Settings</li>
            <li className="cursor-pointer pl-4 text-sm py-2 hover:bg-gray-700">Dashboard</li>
            <li className="cursor-pointer pl-4 text-sm py-2 hover:bg-gray-700">Profile</li>
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
}
