import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EditorSettingsStore {
  lineWrapping: boolean;
  setLineWrapping: (lineWrapping: boolean) => void;
}

const useEditorSettingsStore = create<EditorSettingsStore>()(
  persist(
    (set) => ({
      lineWrapping: false,
      setLineWrapping: (lineWrapping: boolean) => set({ lineWrapping }),
    }),
    {
      name: "editor-settings",
    }
  )
);

export default useEditorSettingsStore;
