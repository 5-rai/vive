import SearchIcon from "../../assets/SearchIcon";

interface SearchButtonProps {
  onClick?: () => void;
}

export default function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button
      className="flex items-center justify-center w-[36px] h-[36px] rounded-full hover:bg-secondary dark:hover:bg-white/20 transition-all duration-300 ease-in-out"
      onClick={onClick}
    >
      <SearchIcon className="w-[19px] h-[19px]" />
    </button>
  );
}
