import { useAllUserStore } from "../store/allUserStore";
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
