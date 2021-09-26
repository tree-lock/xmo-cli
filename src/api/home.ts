import { AxiosResponse } from "axios";
import axiosInstance from ".";
import api from "./types";
import { RankingResponse } from "./response";

export const getRankingReq = async (question: string) => {
  const ans: AxiosResponse<RankingResponse> = await axiosInstance.get(
    api.ranking.replace("{{question}}", question)
  );
  return ans.data;
};
