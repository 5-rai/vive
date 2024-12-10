import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import ModifyProfileInput from "../components/ModifyProfile/ModifyProfileInput";
import Logo from "../assets/Logo";

export default function ModifyProfile() {
  const [preview, setPreview] = useState<JSX.Element>(<Logo />);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(
        <img
          src={imageUrl}
          alt="프로필 이미지"
          className="w-full h-full object-cover"
        />
      );
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageDelete = () => {
    setPreview(<Logo />);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <>
      <section className="flex flex-col items-center justify-items-center-center">
        {/* 프로필 이미지 수정 */}
        <div className="flex flex-col items-center">
          <div className="">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="flex items-center justify-center overflow-hidden w-[296px] h-[298px] mb-5 rounded-full border border-[#c8c8c8]">
              {preview}
            </div>
          </div>
          <div className="imgModifyBtn gap-5">
            <button
              type="button"
              className="w-[100px] h-[30px] mr-5 primary-btn rounded-[10px]  text-center text-xs"
              onClick={handleButtonClick}
            >
              이미지 선택
            </button>
            <button
              type="button"
              className="w-[100px] h-[30px] rounded-[10px] bg-[#E7E7E7] text-center text-xs"
              onClick={handleImageDelete}
            >
              이미지 삭제
            </button>
          </div>
        </div>
        {/* 프로필 정보 수정 */}
        <form className="mt-8">
          <ModifyProfileInput
            label="이름"
            type="text"
            id="username"
            placeholder="이름을 입력해주세요"
            message="이름을 입력해주세요."
          />
          <ModifyProfileInput
            label="비밀번호"
            type="password"
            id="userPassword"
            placeholder="비밀번호를 입력해주세요."
            message="비밀번호를 8자리 이상 입력해주세요."
          />
          <button
            type="submit"
            className="w-[400px] h-[40px] rounded-[50px] primary-btn"
            onClick={() => {
              navigate("/mypage");
            }}
          >
            수정
          </button>
        </form>
      </section>
    </>
  );
}
