import { createSelectors } from "@/store/createSelectors";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthenticationSlice, createAuthenticationSlice } from "./auth.slice";
import { ProfileSlice, createProfileSlice } from "./profile.slice";

type GlobalStore = ProfileSlice & AuthenticationSlice;

const useGlobalStoreObj = create<GlobalStore>()(
  persist(
    (...a) => ({
      ...createProfileSlice(...a),
      ...createAuthenticationSlice(...a),
    }),
    {
      name: "global-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isSignedIn: state.isSignedIn,
      }),
    }
  )
);

export const useGlobalStore = createSelectors(useGlobalStoreObj);
