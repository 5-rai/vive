export default function AdBanner() {
  return (
    <div>
      <div className="w-[952px] h-[312px] px-[297px] py-[50px] bg-[#1c0c42] flex-col justify-start items-center gap-[18px] inline-flex">
        <img
          className="w-[65px] h-[65px]"
          src="https://via.placeholder.com/65x65"
        />
        <div className="self-stretch h-[69px] flex-col justify-center items-center gap-1 flex">
          <div className="text-right text-white text-2xl font-semibold font-['Pretendard'] leading-[38.88px]">
            수코딩과 함께 코딩 천재로 거듭나세요
          </div>
          <div className="self-stretch text-center text-white text-base font-normal font-['Pretendard'] leading-relaxed">
            수코딩 | 누구나 쉽게 배우는 온라인 코딩 스쿨
          </div>
        </div>
        <div className="justify-start items-start gap-7 inline-flex">
          <div className="px-[18px] py-2 bg-[#6530e3] rounded justify-center items-center gap-2.5 flex">
            <div className="text-white text-base font-semibold font-['Pretendard'] leading-relaxed">
              수코딩 사이트 바로가기
            </div>
          </div>
          <div className="px-[18px] py-2 bg-[#ff0133] rounded justify-center items-center gap-2.5 flex">
            <div className="text-white text-base font-semibold font-['Pretendard'] leading-relaxed">
              수코딩 유튜브 바로가기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
