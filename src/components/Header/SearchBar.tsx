import { useEffect, useRef, useState } from "react";
import SearchIcon from "../../assets/SearchIcon";
import { useNavigate } from "react-router";

export default function SearchBar() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim() === "") return;
    navigate(`/search?keyword=${keyword.trim()}`);
  };

  return (
    <form
      className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[514px] h-[43px] gap-2.5 px-[25px] py-[5px] rounded-full border border-gray-22 dark:border-gray-c8/50 bg-white dark:bg-white/10"
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="이름 또는 키워드로 검색"
        className="w-full h-full pr-3 bg-transparent focus:outline-none dark:text-gray-ee"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className="flex items-center justify-center w-[36px] h-[36px]">
        <SearchIcon className="w-[19px] h-[19px]" />
      </button>
    </form>
  );
}
