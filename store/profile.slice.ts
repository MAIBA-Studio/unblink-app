import { StateCreator } from "zustand";

export interface ProfileSlice {
  isSignedIn: boolean;
  setIsSignedIn: (isSignedIn: boolean) => void;
}

export const createProfileSlice: StateCreator<
  ProfileSlice,
  [],
  [],
  ProfileSlice
> = (set, get) => ({
  isSignedIn: false,
  setIsSignedIn: (isSignedIn: boolean) => set(() => ({ isSignedIn })),
});
