import NotificationIcon from "../../assets/NotificationIcon";

export default function NotificationButton() {
  return (
    <button className="notification-button group flex items-center justify-center p-0 relative w-[36px] h-[36px] rounded-full hover:bg-[#fbefbf] transition-all duration-300 ease-in-out">
      <NotificationIcon className="w-[24px] h-[24px]" />
    </button>
  );
}
