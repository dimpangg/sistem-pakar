"use client";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { DropdownHeader } from "./DropdownHeader";

const HeaderUser = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 bg-white text-primary transition-shadow duration-300 ease-in-out",
        scrolled ? "shadow-[0px_1px_20px_0px_#0000001A]" : ""
      )}
    >
      <div className="relative mx-auto flex w-full max-w-sm items-center justify-center bg-white px-4 py-[18px]">
        <DropdownHeader />
        <div className="text-h4">Sistem Pakar</div>
      </div>
    </header>
  );
};

export default HeaderUser;
