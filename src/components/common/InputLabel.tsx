import { twMerge } from "tailwind-merge";
import Input, { InputProps } from "./Input";

interface InputLabelProps extends InputProps {
  label: string;
  id: string;
  message: string;
  isWarning?: boolean;
}
export default function InputLabel({
  label,
  id,
  message,
  isWarning,
  ...props
}: InputLabelProps) {
  return (
    <fieldset>
      <label htmlFor={id} className="text-sm text-gray-80">
        {label}
      </label>
      <Input id={id} placeholder={message} {...props} />
      <p
        className={twMerge(
          "text-xs leading-7",
          isWarning ? "text-red-accent" : "text-transparent select-none"
        )}
      >
        {message}
      </p>
    </fieldset>
  );
}
