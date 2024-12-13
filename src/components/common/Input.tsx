import React from "react";

export type InputProps = React.ComponentPropsWithoutRef<"input">;

export default function Input({ ...props }: InputProps) {
  return (
    <input
      className="w-full py-2 px-6 w-full focus:border-primary text-sm rounded-full border border-gray-c8 dark:border-gray-c8/50"
      {...props}
    />
  );
}
