import { Link } from "react-router";

export default function LogInButton() {
  return (
    <Link to="/login">
      <button className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[106px] h-10 relative gap-2.5 px-[25px] py-[5px] rounded-[50px] primary-btn">
        <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-center">
          로그인
        </p>
      </button>
    </Link>
  );
}
