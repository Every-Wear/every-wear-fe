import { instance } from "@/api/instance";
import { MatchingStatusType } from "@/types/types";

const MATCHING_STATUS_TYPE = {
  매칭대기중: "매칭대기중",
  매칭중: "매칭중",
  매칭완료: "매칭완료",
  진행중: "진행중",
  진행완료: "진행완료",
} as const;

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

export { MATCHING_STATUS_TYPE, get_matchings, get_matching_detail };
