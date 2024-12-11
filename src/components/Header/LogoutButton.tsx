export default function LogoutButton() {
  return (
    <button
      type="button"
      className="primary-btn rounded-full h-10 w-[106px] text-base font-medium"
      onClick={() => console.log("로그아웃!")}
    >
      로그아웃
    </button>
  );
}
