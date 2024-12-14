
import { create } from 'zustand';

interface ChannelStore {
  channels: Channel[];
  setChannels: (channels: Channel[]) => void;
}

export const useChannelStore = create<ChannelStore>((set) => ({
  channels: [],
  setChannels: (channels) => set({ channels }),
}));