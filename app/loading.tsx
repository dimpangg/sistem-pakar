import React from "react";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div
      style={{
        height: "calc(100vh - 64.8px - 120px )",
      }}
      className="flex items-center justify-center"
    >
      <div>
        <Loader2
          className="animate-spin text-emerald-400"
          height={64}
          width={64}
        />
      </div>
    </div>
  );
};

export default Loading;
