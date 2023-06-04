import { instance } from "@/api/instance";
import { MatchingStatusType } from "@/types/types";

const get_matchings = async (matchingsStatus: MatchingStatusType) => {
  const response = await instance({
    method: "get",
    url: `matchings?status=${matchingsStatus}`,
  });

  return response;
};

const get_matching_detail = async (uuid: string) => {
  const response = await instance({
    method: "get",
    url: `matching/${uuid}`,
  });
  return response;
};

const get_my_matching = async () => {
  const response = await instance({
    method: "get",
    url: `matching/my`,
  });

  return response;
};

export { get_matchings, get_matching_detail, get_my_matching };
