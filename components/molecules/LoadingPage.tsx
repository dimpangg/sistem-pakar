import { cn } from "@/utils";
import { Loader2 } from "lucide-react";
import React from "react";

const LoadingPage = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex h-[calc(100vh-64px-120px)] items-center justify-center",
        className
      )}
    >
      <div>
        <Loader2 className="animate-spin text-primary" height={64} width={64} />
      </div>
    </div>
  );
};

export default LoadingPage;
