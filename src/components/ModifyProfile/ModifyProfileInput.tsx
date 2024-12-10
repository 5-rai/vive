import { useState } from "react";

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
        className="w-[400px] h-10 rounded-[50px] border-gray-c8 border text-sm text-gray-22 focus:border-primary placeholder:text-gray-c8 pl-[25px]"
      />
      {isEmpty && <p className="text-xs text-red-accent">{message}</p>}
    </div>
  );
}
