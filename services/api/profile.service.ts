import { IPOSTRequestProfile, IProfile } from "@/schema/profile.schema";
import axios from "axios";

export const fetchProfileService = async (walletAddress: string) =>
  axios
    .get<IProfile>(`/api/profile?walletAddress=${walletAddress}`)
    .then((res) => res.data.user);

export const registerProfileService = async (payload: IPOSTRequestProfile) => {
  return axios.post<IProfile>("/api/profile", payload).then((res) => res.data);
};
