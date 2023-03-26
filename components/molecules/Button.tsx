import classNames from "classnames";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  buttonType?: "default" | "with-icon-right" | "with-icon-left";
  icon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={classNames(
        "rounded-md bg-slate-900 px-4 py-2 text-body-medium text-white hover:bg-slate-700",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
