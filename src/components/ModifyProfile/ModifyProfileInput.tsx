import { twMerge } from "tailwind-merge";

interface ModifyProfileInputProps
  extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  message?: string;
  isWarning?: boolean;
}

export default function ModifyProfileInput({
  label,
  message,
  isWarning = false,
  ...props
}: ModifyProfileInputProps) {
  return (
    <div className="flex flex-col gap-[10px] mb-5">
      <label htmlFor={props.id}>{label}</label>
      <input
        className="w-[400px] h-10 rounded-[50px] border-gray-c8 dark:border-gray-c8/50 border text-sm focus:border-primary pl-[25px]"
        {...props}
      />
      <p
        className={twMerge(
          "text-xs h-4",
          isWarning ? "text-red-accent" : "text-transparent select-none"
        )}
      >
        {message}
      </p>
    </div>
  );
}
