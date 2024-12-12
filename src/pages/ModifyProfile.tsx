import { useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import ModifyProfileInput from "../components/ModifyProfile/ModifyProfileInput";
import Logo from "../assets/Logo"; // 로고 이미지 컴포넌트
import { axiosInstance } from "../api/axios";
import { useAuthStore } from "../store/authStore";
import { userStore } from "../store/userStore";

export default function ModifyProfile() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // 컴포넌트 마운트 시 사용자 정보 불러오기
  useEffect(() => {
    const { fetchUserProfile } = userStore.getState();

    fetchUserProfile().then(() => {
      const { profileImage, fullName } = userStore.getState();

      if (profileImage) {
        setSelectedImage(profileImage);
      }

      if (fullName) {
        setFullName(fullName);
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
    console.log(file);
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      // 서버 전송은 하지 않고 미리 상태만 변경
      setSelectedImage(URL.createObjectURL(file)); // 로컬 이미지 미리 보기
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 이미지 삭제 핸들러 (logo.png로 설정)
  const handleImageDelete = () => {
    setSelectedImage("../assets/logo.png");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 프로필 수정 요청 함수 (수정 버튼 클릭 시만 서버에 반영)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = useAuthStore.getState().accessToken;
      if (!token) {
        console.error("User is not authenticated");
        return;
      }

      // 프로필 이미지 업데이트
      if (selectedImage === "/assets/logo.png") {
        // 기본 로고 이미지로 설정
        const formData = new FormData();
        const logoFile = new File([], "logo.png");
        formData.append("image", logoFile);

        await axiosInstance.post("/users/upload-photo", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else if (fileInputRef.current?.files?.[0]) {
        const file = fileInputRef.current.files[0];
        const formData = new FormData();
        formData.append("image", file);

        await axiosInstance.post("/users/upload-photo", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // 이름 업데이트
      await axiosInstance.put("/settings/update-user", { fullName });

      const { fetchUserProfile } = userStore.getState();
      await fetchUserProfile(); // 업데이트된 프로필 정보 가져오기

      navigate("/mypage");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
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
          <div className="flex items-center justify-center overflow-hidden w-[298px] h-[298px] mb-5 rounded-full border border-[#c8c8c8] bg-white/20">
            {selectedImage && selectedImage !== "../assets/logo.png" ? (
              <img
                src={selectedImage}
                alt="프로필 이미지"
                className="w-full h-full object-cover"
              />
            ) : (
              <Logo />
            )}
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
