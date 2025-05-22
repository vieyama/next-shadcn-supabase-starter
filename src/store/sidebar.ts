import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type SidebarStore = {
  isOpen: boolean // sidebar state
  toggle: () => void // toggle sidebar state        
  open: () => void // open sidebar state
  close: () => void // close sidebar state
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set, get) => ({
      isOpen: true,
      toggle: () => set({ isOpen: !get().isOpen }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: 'sidebar-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)