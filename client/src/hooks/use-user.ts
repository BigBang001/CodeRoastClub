import { create } from "zustand";
import { apiRequest } from "@/lib/queryClient";

interface UserState {
  username: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  fetchMe: () => Promise<void>;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  username: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  fetchMe: async () => {
    try {
      set({ loading: true, error: null });
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const user = await res.json();
        set({ username: user.username, isLoggedIn: true, loading: false });
      } else {
        set({ username: null, isLoggedIn: false, loading: false });
      }
    } catch (e: any) {
      set({ loading: false, error: e?.message || "Failed to fetch user" });
    }
  },
  login: async (username: string, password: string) => {
    try {
      set({ loading: true, error: null });
  const res = await apiRequest("POST", "/api/auth/login", { username, password });
      const user = await res.json();
      set({ username: user.username, isLoggedIn: true, loading: false });
      return true;
    } catch (e: any) {
      set({ loading: false, error: e?.message || "Login failed" });
      return false;
    }
  },
  register: async (username: string, password: string) => {
    try {
      set({ loading: true, error: null });
  const res = await apiRequest("POST", "/api/auth/register", { username, password });
      const user = await res.json();
      set({ username: user.username, isLoggedIn: true, loading: false });
      return true;
    } catch (e: any) {
      set({ loading: false, error: e?.message || "Registration failed" });
      return false;
    }
  },
  logout: async () => {
    try {
      set({ loading: true, error: null });
      await apiRequest("POST", "/api/auth/logout");
    } finally {
      set({ username: null, isLoggedIn: false, loading: false });
    }
  },
}));
