import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface ModifyProfileInputProps {
  label: string;
  type: string;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  message: string;
}

export default function ModifyProfileInput({
  label,
  type,
  id,
  value,
  onChange,
  placeholder,
  message,
}: ModifyProfileInputProps) {
  const [isEmpty, setIsEmpty] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 부모에서 전달받은 onChange를 호출하여 부모 컴포넌트의 상태를 업데이트
    if (onChange) {
      onChange(e);
    }

    // 필드가 비어있는지 체크
    setIsEmpty(e.target.value.trim() === "");
  };

  return (
    <div className="flex flex-col gap-[10px] mb-5">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={handleChange} // handleChange로 변경
        className="w-[400px] h-10 rounded-[50px] border-gray-c8 dark:border-gray-c8/50 border text-sm text-gray-22 focus:border-primary pl-[25px]"
      />
      {/* message가 있을 때만 text-red-accent로 표시 */}
      <p
        className={twMerge(
          "text-xs text-red-accent h-4",
          message === "" && "text-transparent select-none" // message가 없으면 투명하게 처리
        )}
      >
        {message}
      </p>
    </div>
  );
}
