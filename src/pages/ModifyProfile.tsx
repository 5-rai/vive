import { useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import ModifyProfileInput from "../components/ModifyProfile/ModifyProfileInput";
import { userStore } from "../store/userStore";
import defaultProfileImg from "../assets/logo.png";
import { updateUser } from "../api/user";

export default function ModifyProfile() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage>();
  const [fullName, setFullName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const defaultImgRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // 컴포넌트 마운트 시 사용자 정보 불러오기
  useEffect(() => {
    const { fetchUserProfile } = userStore.getState();

    fetchUserProfile().then(() => {
      const { profileImage, fullName } = userStore.getState();
      if (fullName) {
        setFullName(fullName);
      }
      if (profileImage) {
        setSelectedImage({ src: profileImage, file: null });
      }
    });
  }, []);

  // 이름 변경 핸들러
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  // 이미지 업로드 핸들러 (미리 상태만 변경)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    setSelectedImage({ src: fileURL, file }); // 로컬 이미지 미리 보기
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 이미지 삭제 핸들러 (logo.png로 설정)
  const handleImageDelete = () => {
    selectDefaultImage();
  };

  const selectDefaultImage = async () => {
    const response = await fetch("/logo.png");
    const blob = await response.blob();
    const file = new File([blob], "default-profile.png", { type: blob.type });
    setSelectedImage({ src: defaultProfileImg, file });
  };

  // 프로필 수정 요청 함수 (수정 버튼 클릭 시만 서버에 반영)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) return;

    await updateUser(selectedImage, fullName);
    navigate("/mypage");
  };

  return (
    <section className="mx-auto flex flex-col items-center justify-center">
      {/* 프로필 이미지 수정 */}
      <div className="flex flex-col items-center">
        <div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <input
            ref={defaultImgRef}
            type="file"
            src={defaultProfileImg}
            hidden
          />
          <div className="flex items-center justify-center overflow-hidden w-[298px] h-[298px] mb-5 rounded-full border border-[#c8c8c8] bg-white/20">
            <img
              src={selectedImage?.src ?? defaultProfileImg}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="imgModifyBtn gap-5">
          <button
            type="button"
            className="w-[100px] py-1.5 mr-5 rounded-[10px] text-center text-xs primary-btn font-medium"
            onClick={handleButtonClick}
          >
            이미지 선택
          </button>
          <button
            type="button"
            className="w-[100px] py-1.5 rounded-[10px] bg-[#E7E7E7] hover:bg-gray-c8 text-center text-xs dark:text-gray-22 font-medium"
            onClick={handleImageDelete}
          >
            이미지 삭제
          </button>
        </div>
      </div>

      {/* 프로필 정보 수정 */}
      <form className="mt-8" onSubmit={handleSubmit}>
        <ModifyProfileInput
          label="이름"
          type="text"
          id="username"
          value={fullName}
          onChange={handleFullNameChange} // 이름 변경 핸들러 연결
          placeholder="이름을 입력해주세요"
          message="이름을 입력해주세요."
        />
        <button
          type="submit"
          className="w-[400px] h-[40px] rounded-[50px] primary-btn"
        >
          수정
        </button>
      </form>
    </section>
  );
}
