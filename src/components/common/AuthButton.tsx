import React from "react";
import { twMerge } from "tailwind-merge";

interface AuthButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  primary?: boolean;
}
export default function AuthButton({
  children,
  primary = false,
  ...props
}: AuthButtonProps) {
  return (
    <button
      className={twMerge(
        "primary-btn rounded-full py-2",
        primary ? "primary-btn" : "secondary-btn"
      )}
      {...props}
    >
      {children}
    </button>
  );
}
