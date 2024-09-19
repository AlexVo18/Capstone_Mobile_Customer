import { create } from "zustand";

interface TestState {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

export const useTestStore = create<TestState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  login: (user: string) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
