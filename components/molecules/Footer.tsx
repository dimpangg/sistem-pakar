import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex min-h-[120px] flex-col items-center justify-center gap-3 bg-slate-900 text-white">
      <Image
        src="/mushroom-gills.svg"
        width={24}
        height={24}
        alt="Sistem Pakar Logo"
        color="white"
      />
      <div className="text-detail">
        Created by{" "}
        <span className="text-slate-300 underline">Dimas Pangestu</span>
      </div>
    </footer>
  );
};

export default Footer;
