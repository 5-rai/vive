import NotificationIcon from "../../assets/NotificationIcon";

export default function NotificationButton() {
  return (
    <button className="flex items-center justify-center w-[36px] h-[36px] rounded-full hover:bg-secondary transition-all duration-300 ease-in-out">
      <NotificationIcon className="w-[24px] h-[24px]" />
    </button>
  );
}
