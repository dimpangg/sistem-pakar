import classNames from "clsx";
import React from "react";
import { MushroomGills } from "../atoms";

const Footer = ({ className }: { className?: string }) => {
  return (
    <footer
      className={classNames("min-h-[120px] w-full text-white", className)}
    >
      <div className="mx-auto flex min-h-[120px] w-full max-w-sm flex-col items-center justify-center gap-3 bg-slate-900">
        <MushroomGills color="white" />
        <div className="text-detail">
          Created by{" "}
          <span className="text-slate-300 underline">Dimas Pangestu</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
