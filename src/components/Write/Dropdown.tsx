import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import DropdownArrowIcon from "../../assets/DropdownArrowIcon";
import { getAllChannels } from "../../api/write";

interface DropdownProps {
  channel?: Channel;
  setChannel: React.Dispatch<React.SetStateAction<Channel | undefined>>;
}

export default function Dropdown({ channel, setChannel }: DropdownProps) {
  const [channels, setChannels] = useState<Channel[]>();
  const [isOpen, setIsOpen] = useState(!false);
  const ref = useRef<HTMLElement>(null);

  const getChannels = async () => {
    const channels = await getAllChannels();
    setChannels(channels);
  };

  useEffect(() => {
    getChannels();
  }, []);

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

  const handleOptionClick = (channel: Channel) => {
    setChannel(channel);
    setIsOpen(false);
  };

  return (
    <section ref={ref} className="w-40 relative">
      <button
        type="button"
        className="flex w-full rounded-lg border border-gray-c8 dark:border-gray-c8/50 py-1 pl-3 pr-1 justify-between bg-white dark:bg-gray-22"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p
          className={twMerge(
            channel
              ? "text-gray-22 dark:text-gray-ee"
              : "text-[#777] dark:text-gray-c8"
          )}
        >
          {channel?.name ?? "카테고리"}
        </p>
        <DropdownArrowIcon />
      </button>
      {isOpen && (
        <ul className="flex flex-col py-3 px-3 absolute bg-white dark:bg-gray-22 w-full rounded-lg border border-gray-c8 dark:border-gray-c8/50 top-10">
          {channels?.slice(3).map((channel) => (
            <li key={`channels-${channel._id}`} className="w-full">
              <button
                type="button"
                onClick={() => handleOptionClick(channel)}
                className="hover:bg-secondary py-1 w-full text-left px-2 rounded-md hover:dark:text-gray-22"
              >
                {channel.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
