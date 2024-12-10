import React from "react";

interface ModifyProfileInputProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  message: string;
}

export default function ModifyProfileInput({
  label,
  type,
  id,
  placeholder,
  message,
}: ModifyProfileInputProps) {
  return (
    <>
      <div className="flex flex-col gap-[10px] mb-5">
        <label htmlFor="{id}">{label}</label>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className="w-[400px] h-10 rounded-[50px] border border-[#fcc404]  text-sm text-gray-22 placeholder:text-[#c8c8c8] pl-[25px]"
        />
        <p className="text-xs text-[#FF2929]">{message}</p>
      </div>
    </>
  );
}
