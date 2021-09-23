import { getRankingReq } from "@/api/home";
import { qList } from "@/config";

export const getRanking = async (question) => {
  const ans = (await getRankingReq(question)).results;
  return ans;
};

export const getRankingList = async () => {
  const ans = await Promise.all(qList.map((value) => getRanking(value)));
  return ans;
};
