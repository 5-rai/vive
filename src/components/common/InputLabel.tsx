import { twMerge } from "tailwind-merge";
import Input, { InputProps } from "./Input";

interface InputLabelProps extends InputProps {
  label: string;
  id: string;
  errorMessage?: string;
  isWarning?: boolean;
}
export default function InputLabel({
  label,
  id,
  errorMessage,
  isWarning,
  ...props
}: InputLabelProps) {
  return (
    <fieldset>
      <label htmlFor={id} className="text-sm text-gray-22">
        {label}
      </label>
      <Input id={id} {...props} />
      <p
        className={twMerge(
          "text-xs h-4 mt-1",
          isWarning ? "text-red-accent" : "text-transparent select-none"
        )}
      >
        {errorMessage ?? props.placeholder}
      </p>
    </fieldset>
  );
}
