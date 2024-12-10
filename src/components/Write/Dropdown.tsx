import { useEffect, useRef, useState } from "react";
import { CHANNEL } from "../../constants/channel";
import { twMerge } from "tailwind-merge";
import DropdownArrowIcon from "../../assets/DropdownArrowIcon";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(!false);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (channel: string) => {
    setSelected(channel);
    setIsOpen(false);
  };

  return (
    <section ref={ref} className="w-40 relative">
      <button
        type="button"
        className="flex w-full rounded-lg border border-gray-c8 py-1 pl-3 pr-1 justify-between bg-white"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p className={twMerge(!selected && "text-[#777]")}>
          {selected ?? "카테고리"}
        </p>
        <DropdownArrowIcon />
      </button>
      {isOpen && (
        <ul className="flex flex-col py-3 px-3 absolute bg-white w-full rounded-lg border border-gray-c8 top-10">
          {CHANNEL.map((channel) => (
            <li key={channel} className="w-full">
              <button
                type="button"
                onClick={() => handleOptionClick(channel)}
                className="hover:bg-secondary py-1 w-full text-left px-2 rounded-md"
              >
                {channel}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
