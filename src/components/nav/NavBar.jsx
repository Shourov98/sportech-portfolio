"use client";
import { useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Desktop */}
      <div className="hidden lg:block">
        <DesktopNav />
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        <MobileNav open={open} setOpen={setOpen} />
      </div>
    </header>
  );
}
