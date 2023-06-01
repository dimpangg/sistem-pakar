"use client";

import Image from "next/image";
import React from "react";

const Error = () => {
  return (
    <div
      style={{
        height: "calc(100vh - 64.8px - 120px )",
      }}
      className="mx-auto flex max-w-sm flex-col items-center justify-center gap-5"
    >
      <div className="text-h3 text-slate-900">OOPS!</div>
      <Image
        priority
        src="/undraw_warning.svg"
        alt="error"
        width={200}
        height={159.44}
      />
      <div className="text-center text-h3 text-slate-900">
        Something went wrong. Please try again later.
      </div>
    </div>
  );
};

export default Error;
