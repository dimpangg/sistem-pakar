import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { MushroomGills } from "../atoms";

const Header = ({ className }: { className?: string }) => {
  return (
    <header
      className={classNames(
        "px-4 py-[18px] text-h4 text-emerald-500",
        className
      )}
    >
      <Link href="/" className="flex items-center gap-2">
        <MushroomGills />
        Sistem Pakar
      </Link>
    </header>
  );
};

export default Header;
