import { StateCreator } from "zustand";

interface AuthenticationActions {
  resetAuthState: () => void;
  setLedger: (isLedger: boolean) => void;
  setSession: (session: any) => void;
  setStatus: (status: string) => void;
  setSignInSuccess: (signedIn: boolean) => void;
}

export interface AuthenticationSlice extends AuthenticationActions {
  isLedger: boolean;
  session: any;
  status: string;
  signedIn: boolean;
}

const initialState = {
  isLedger: false,
  session: null,
  status: "unauthenticated",
  signedIn: false,
};

export const createAuthenticationSlice: StateCreator<
  AuthenticationSlice,
  [],
  [],
  AuthenticationSlice
> = (set, get) => ({
  ...initialState,
  setLedger: (isLedger: boolean) => set({ isLedger }),
  setSession: (session: any) => set({ session }),
  setStatus: (status: string) => set({ status }),
  resetAuthState: () => set(() => initialState),
  setSignInSuccess: (signedIn: boolean) => set({ signedIn }),
});
