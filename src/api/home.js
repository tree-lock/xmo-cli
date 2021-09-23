import axiosInstance from ".";
import api from "./types";

export const getRankingReq = async (question) => {
  const ans = await axiosInstance.get(
    api.ranking.replace("{{question}}", question)
  );
  return ans.data;
};
