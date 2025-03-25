"use client";

import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export function AppSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed top-0 left-0 h-screen w-4 hover:w-64 transition-all duration-300 ease-in-out bg-transparent"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 bg-white p-4 shadow-lg">
          <h2 className="text-lg font-semibold">Sidebar Menu</h2>
          <ul className="mt-4 space-y-2">
            <li className="text-gray-700 hover:text-black cursor-pointer">
              Dashboard
            </li>
            <li className="text-gray-700 hover:text-black cursor-pointer">
              Settings
            </li>
            <li className="text-gray-700 hover:text-black cursor-pointer">
              Profile
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
}
