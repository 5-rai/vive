export default function RecentPosts() {
  return (
    <div className="w-[208px] h-[276px] rounded-lg flex-col justify-start items-start inline-flex">
      <div className="h-[178px] relative bg-gradient-to-b from-black to-black rounded-tl-lg rounded-tr-lg border-r border-[#ededed]">
       {/* 유튜브 썸네일 추가  */}
        <div className="left-[8px] top-[146px] absolute justify-start items-end gap-3 inline-flex">
          <div className="w-6 h-6 justify-center items-center flex">
            <img className="w-6 h-6" src="" />
          </div>
          <div className="text-[#6c6c6c] text-sm font-medium font-['Pretendard'] leading-snug">
            avatar
          </div>
        </div>
      </div>
      <div className="self-stretch h-[98px] p-2 bg-white rounded-bl-lg rounded-br-lg border-l border-r border-b border-[#ededed] flex-col justify-start items-start gap-2 flex">
        <div className="self-stretch text-[#222222] text-base font-semibold font-['Pretendard'] uppercase leading-[30px]">
          이무진 - 청춘만화
        </div>
        <div className="self-stretch text-[#c8c8c8] text-sm font-normal font-['Pretendard'] uppercase leading-snug">
          해당 음원 유튜브 영상 제목 포스트 해당 음원 유튜브 영상 제목 ...
        </div>
      </div>
    </div>
  );
}
