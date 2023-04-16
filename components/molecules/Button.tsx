import classNames from "classnames";
import React, { forwardRef } from "react";
import { LoadingSpinner } from "../atoms";

type ButtonProps = {
  buttonType?: "default" | "with-icon-right" | "with-icon-left";
  icon?: React.ReactNode;
  isLoading?: boolean;
} & React.ComponentProps<"button">;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      isLoading,
      buttonType = "default",
      icon,
      ...rest
    }: ButtonProps,
    ref
  ) => {
    return (
      <button
        disabled={isLoading || rest.disabled}
        className={classNames(
          "rounded-[10px] bg-emerald-400 px-4 py-2 text-body-medium text-white hover:bg-emerald-400/80 disabled:bg-emerald-400/50",
          isLoading && "flex items-center justify-center gap-2",
          buttonType === "with-icon-right" &&
            "flex items-center justify-between",
          buttonType === "with-icon-left" &&
            "flex items-center justify-between",
          className
        )}
        {...rest}
        ref={ref}
      >
        {isLoading && <LoadingSpinner />}
        {buttonType === "with-icon-left" && icon}
        {children}
        {buttonType === "with-icon-right" && icon}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
