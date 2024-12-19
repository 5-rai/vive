import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type ArrowButtonProps = ComponentPropsWithoutRef<"button">;

export default function ArrowButton({ className, ...props }: ArrowButtonProps) {
  return (
    <button
      type="button"
      className={twMerge(
        "absolute z-10 top-1/2 transform -translate-y-1/2 rounded-full bg-white/90 drop-shadow-lg",
        !props.disabled && "hover:bg-secondary ",
        className
      )}
      {...props}
    >
      {props.children}
    </button>
  );
}
