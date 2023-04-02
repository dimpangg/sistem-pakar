import Link from "next/link";
import React from "react";
import { MushroomGills } from "../atoms";

const Header = () => {
  return (
    <header className=" border-b border-slate-200 px-4 py-[18px] text-h4 text-slate-900">
      <Link href="/" className="flex items-center gap-2">
        <MushroomGills />
        Sistem Pakar
      </Link>
    </header>
  );
};

export default Header;
