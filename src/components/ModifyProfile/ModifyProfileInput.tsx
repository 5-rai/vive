import { useState } from "react";
import { twMerge } from "tailwind-merge";

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
  const [isEmpty, setIsEmpty] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmpty(e.target.value.trim() === "");
  };

  return (
    <div className="flex flex-col gap-[10px] mb-5">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={handleChange}
        className="w-[400px] h-10 rounded-[50px] border-gray-c8 dark:border-gray-c8/50 border text-sm text-gray-22 focus:border-primary pl-[25px]"
      />
      <p
        className={twMerge(
          "text-xs text-red-accent h-4",
          !isEmpty && "text-transparent select-none"
        )}
      >
        {message}
      </p>
    </div>
  );
}
