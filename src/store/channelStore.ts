import { create } from "zustand";

interface ChannelStore {
  channels: Channel[];
  setChannels: (channels: Channel[]) => void;
  getIdFromName: (name: string) => string | undefined;
  getNameFromId: (id: string) => string | undefined;
}

export const useChannelStore = create<ChannelStore>((set, get) => ({
  channels: [],
  setChannels: (channels) => set({ channels }),
  getIdFromName: (name) => {
    const targetChannel = get().channels.find(
      (channel) => channel.name === name
    );
    return targetChannel?._id;
  },
  getNameFromId: (id) => {
    const targetChannel = get().channels.find((channel) => channel._id === id);
    return targetChannel?.name;
  },
}));
