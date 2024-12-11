import SearchIcon from "../../assets/SearchIcon";

export default function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="flex items-center justify-center w-[36px] h-[36px] rounded-full hover:bg-secondary transition-all duration-300 ease-in-out"
      onClick={onClick}
    >
      <SearchIcon className="w-[19px] h-[19px]" />
    </button>
  );
}
