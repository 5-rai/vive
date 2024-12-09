import React from "react";

export type InputProps = React.ComponentPropsWithoutRef<"input">;

export default function Input({ ...props }: InputProps) {
  return (
    <input
      className="w-full py-2 px-6 w-full placeholder:text-gray-50 focus:border-primary text-gray-100 text-sm rounded-full border-gray-50 border"
      {...props}
    />
  );
}
