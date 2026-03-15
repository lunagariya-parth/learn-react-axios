import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  email: string;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, accessToken: string, refreshToken: string) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      login: (email, accessToken, refreshToken) =>
        set({
          user: { email },
          accessToken,
          refreshToken,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: "auth-store",
      onRehydrateStorage: () => () => {
        console.log("hydrated");
      },
    },
  ),
);
