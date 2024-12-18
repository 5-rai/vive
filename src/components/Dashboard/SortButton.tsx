import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import DropdownArrowIcon from "../../assets/DropdownArrowIcon";
import Dropdown from "../common/Dropdown";

type SortOption = {
  id: string;
  name: string;
};

const SORT_OPTIONS: SortOption[] = [
  { id: "latest", name: "최신순" },
  { id: "popular", name: "인기순" },
  { id: "comments", name: "댓글순" },
];

interface SortButtonProps {
  onSortChange: (option: string) => void;
}

export default function SortButton({ onSortChange }: SortButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SortOption>(
    SORT_OPTIONS[0]
  ); // 기본값: 최신순
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

  const handleOptionClick = (option: SortOption) => {
    setSelectedOption(option);
    onSortChange(option.id);
    setIsOpen(false);
  };

  return (
    <section ref={ref} className="w-40 relative">
      <button
        type="button"
        className="flex w-full rounded-lg border border-gray-c8 dark:border-gray-c8/50 py-1 pl-3 pr-1 justify-between bg-white dark:bg-gray-22"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        <p className={twMerge("text-gray-22 dark:text-gray-ee")}>
          {selectedOption.name}
        </p>
        <DropdownArrowIcon />
      </button>
      <Dropdown
        className="w-full p-3 top-10"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ul>
          {SORT_OPTIONS.filter((option) => option.id !== selectedOption.id).map(
            (option) => (
              <li key={option.id} className="w-full">
                <button
                  type="button"
                  onClick={() => handleOptionClick(option)}
                  className="hover:bg-secondary py-1 w-full text-left px-2 rounded-md hover:dark:text-gray-22"
                >
                  {option.name}
                </button>
              </li>
            )
          )}
        </ul>
      </Dropdown>
    </section>
  );
}
