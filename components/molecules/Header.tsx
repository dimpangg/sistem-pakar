import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="flex items-center gap-2 border-b border-slate-200 px-4 py-[18px] text-h4 text-slate-900">
      <Image
        src="/mushroom-gills.svg"
        width={24}
        height={24}
        alt="Sistem Pakar Logo"
      />
      Sistem Pakar
    </header>
  );
};

export default Header;
