import classNames from "classnames";
import React from "react";
import { MushroomGills } from "../atoms";

const Footer = ({ className }: { className?: string }) => {
  return (
    <footer
      className={classNames(
        "flex min-h-[120px] flex-col items-center justify-center gap-3 bg-slate-900 text-white",
        className
      )}
    >
      <MushroomGills color="white" />
      <div className="text-detail">
        Created by{" "}
        <span className="text-slate-300 underline">Dimas Pangestu</span>
      </div>
    </footer>
  );
};

export default Footer;
