"use client";
import { cn } from "@/utils";
import clsx from "clsx";
import React from "react";
import { equals } from "remeda";

type RadioBoxValue = { value: string; label: string };

type RadioBoxProps = {
  option: Array<RadioBoxValue>;
  containerClassName?: string;
  value?: RadioBoxValue | null;
  onChange?: (value: RadioBoxValue) => void;
};

const RadioBox = ({
  option,
  containerClassName,
  onChange,
  value,
}: RadioBoxProps) => {
  const [checked, setChecked] = React.useState<RadioBoxValue | null>(null);

  const controlledValue = React.useMemo(() => {
    return {
      value: value !== undefined ? value : checked,
      onChange: (value: RadioBoxValue) => {
        if (onChange !== undefined) onChange(value);
        else setChecked(value);
      },
    };
  }, [value, onChange, checked]);

  return (
    <div className={cn("flex flex-col gap-2", containerClassName)}>
      {option.map((item, index) => (
        <button
          onClick={() => controlledValue.onChange(item)}
          key={index}
          className={clsx(
            "flex select-none items-center gap-3 rounded-md border p-4",
            equals(controlledValue.value, item)
              ? "border-emerald-200 bg-emerald-50"
              : "border-slate-200 bg-white"
          )}
        >
          <div
            className={clsx(
              "h-4 w-4 rounded-full",
              equals(controlledValue.value, item)
                ? "border-4 border-emerald-500"
                : "border border-slate-200"
            )}
          ></div>
          <span className="text-left">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default RadioBox;
