import { NavLink } from "react-router";
import { twMerge } from "tailwind-merge";
import { useChannelStore } from "../../store/channelStore";

export default function ChannelList() {
  const channels = useChannelStore((state) => state.channels);

  return (
    <section className="h-fit">
      <h2 className="border-b border-gray-22 dark:border-gray-ee/50 py-2 mb-2.5 dark:text-gray-ee">
        카테고리
      </h2>
      <div className="flex flex-col gap-1">
        {channels.map((channel) => (
          <NavLink
            key={channel._id}
            to={`/channels/${channel.name}`}
            className={({ isActive }) =>
              twMerge(
                "flex items-center h-11 px-7 py-1 rounded-lg transition-colors",
                isActive
                  ? "bg-primary"
                  : "hover:bg-secondary dark:hover:text-gray-22"
              )
            }
          >
            {channel.name}
          </NavLink>
        ))}
      </div>
    </section>
  );
}
