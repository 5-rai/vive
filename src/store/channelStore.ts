import { create } from "zustand";
import { axiosInstance } from "../api/axios";
import { createJSONStorage, persist } from "zustand/middleware";

interface ChannelStore {
  channels: Channel[];
  fetchChannels: () => void;
  getIdFromName: (name: string) => string | undefined;
  getNameFromId: (id: string) => string | undefined;
}

export const useChannelStore = create<ChannelStore>()(
  persist(
    (set, get) => ({
      channels: [],
      fetchChannels: async () => {
        try {
          const { data } = await axiosInstance.get("/channels");
          set({ channels: data });
        } catch (error) {
          console.error("채널 정보를 가져오는데 실패했습니다", error);
        }
      },
      getIdFromName: (name) => {
        const targetChannel = get().channels.find(
          (channel) => channel.name === name
        );
        return targetChannel?._id;
      },
      getNameFromId: (id) => {
        const targetChannel = get().channels.find(
          (channel) => channel._id === id
        );
        return targetChannel?.name;
      },
    }),
    {
      name: "channels",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
