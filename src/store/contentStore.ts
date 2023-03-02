import { create } from "zustand";

interface ContentStore {
  content: string;
  setContent: (content: string) => void;
}

const useContentStore = create<ContentStore>()((set) => ({
  content: "",
  setContent: (content: string) => set({ content }),
}));

export default useContentStore;
