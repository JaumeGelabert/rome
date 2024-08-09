import { create } from "zustand";

export interface useUserStoreInterface {
  userId: string | null;
}

export const useUserStore = create((set) => ({
  userId: null,
  updateUserId: (userId: string) => set({ userId }),
  reset: () => set({ userId: null }),
}));
