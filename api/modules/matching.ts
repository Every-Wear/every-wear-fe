import { instance } from "@/api/instance";

import { MatchingStatusType } from "@/types/clientType";

export const get_matchings = async (matchingsStatus: MatchingStatusType) => {
  const response = await instance({
    method: "get",
    url: `matchings?status=${matchingsStatus}`,
  });

  return response;
};

export const get_my_matching = async () => {
  const response = await instance({
    method: "get",
    url: `matching/my`,
  });

  return response;
};
