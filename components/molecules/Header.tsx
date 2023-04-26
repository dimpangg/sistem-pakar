import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { MushroomGills } from "../atoms";

const Header = ({ className }: { className?: string }) => {
  return (
    <header className={classNames("text-h4 text-primary", className)}>
      <div className="mx-auto max-w-sm px-4 py-[18px]">
        <Link href="/" className="flex items-center gap-2">
          <MushroomGills />
          Sistem Pakar
        </Link>
      </div>
    </header>
  );
};

export default Header;
