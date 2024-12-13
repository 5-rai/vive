import { useAllUserStore } from "../store/allUserStore";
import { useAuthStore } from "../store/authStore";
import { userStore } from "../store/userStore";
import { axiosInstance } from "./axios";

export const getAllUsers = async () => {
  const setUsers = useAllUserStore.getState().setUsers;

  try {
    const { data } = await axiosInstance.get<User[]>("/users/get-users");
    setUsers(data);
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (
  selectedImage: SelectedImage,
  fullName: string
) => {
  try {
    const token = useAuthStore.getState().accessToken;
    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    // 프로필 이미지 업데이트
    if (selectedImage?.file) {
      const formData = new FormData();
      formData.append("isCover", "false");
      formData.append("image", selectedImage?.file);

      await axiosInstance.post("/users/upload-photo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    // 이름 업데이트
    if (fullName) {
      await axiosInstance.put("/settings/update-user", { fullName });

      const { fetchUserProfile } = userStore.getState();
      await fetchUserProfile(); // 업데이트된 프로필 정보 가져오기
    }
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};
