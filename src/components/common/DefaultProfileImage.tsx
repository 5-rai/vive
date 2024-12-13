import { twMerge } from "tailwind-merge";
import Logo from "../../assets/Logo";

interface DefaultProfileImageProps {
  className: string;
}

export default function DefaultProfileImage({
  className,
}: DefaultProfileImageProps) {
  return (
    <div
      className={twMerge(
        "rounded-full flex items-center justify-center bg-primary/10",
        className
      )}
    >
      <Logo className="w-full h-full" />
    </div>
  );
}
