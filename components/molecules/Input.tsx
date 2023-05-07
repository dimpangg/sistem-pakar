"use client";
import { cn } from "@/utils";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  eye?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, eye, ...props }, ref) => {
    const [typeInput, setTypeInput] = React.useState(type);
    return (
      <>
        <input
          type={typeInput}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-transparent py-2 pl-3 pr-7 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          placeholder={
            type === "password" && !props.placeholder
              ? "••••••••"
              : props.placeholder
          }
          {...props}
        />
        {eye ? (
          <div className="relative">
            {typeInput === "password" ? (
              <Eye
                className="absolute -top-7 right-2 h-4 w-4 cursor-pointer select-none text-muted-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  setTypeInput("text");
                }}
              />
            ) : typeInput === "text" ? (
              <EyeOff
                className="absolute -top-7 right-2 h-4 w-4 cursor-pointer select-none text-muted-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  setTypeInput("password");
                }}
              />
            ) : null}
          </div>
        ) : null}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
