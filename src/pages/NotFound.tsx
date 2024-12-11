import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="screen-100vh mx-auto bg-white flex-col justify-center items-center gap-2.5 flex">
      <div className="text-center text-[#fcc404] text-[80px] font-extrabold uppercase leading-[121.60px]">
        404 ERROR
      </div>
      <div className="text-center text-[#222222] text-[40px] font-semibold leading-[30px]">
        요청하신 페이지를 찾을 수 없습니다.
      </div>
      <Link
        to="/"
        className="mt-[125px] w-[184px] h-[50px] px-[30px] py-2.5 font-semibold rounded-full justify-center items-center flex primary-btn"
      >
        홈으로 가기
      </Link>
    </div>
  );
}
