import { instance } from "@/api/instance";

export type MatchingsStatusType =
  | "매칭대기중"
  | "매칭중"
  | "매칭완료"
  | "진행중"
  | "진행완료";

export const get_matchings = async (matchingsStatus: MatchingsStatusType) => {
  const response = await instance({
    method: "get",
    url: `matchings?status=${matchingsStatus}`,
  });

  return response;
};
