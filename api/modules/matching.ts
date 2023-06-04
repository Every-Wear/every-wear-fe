import { instance } from "@/api/instance";
import { MatchingStatusType } from "@/types/types";

const post_matching = async (
  time: string,
  location: string,
  purpose: string,
  gender: string,
) => {
  const response = await instance({
    method: "post",
    url: `matching`,
    data: {
      clothesType: "상의, 하의",
      limitPrice: 0,
      preferPlace: location,
      preferTime: time,
      preferStyle: purpose,
      preferGender: gender,
      remark: "비고",
    },
  });

  return response;
};

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

const delete_matching_detail = async (uuid: string, reason: string) => {
  const response = await instance({
    method: "delete",
    url: `matching/${uuid}`,
    data: {
      reason: reason,
    },
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

export {
  post_matching,
  get_matchings,
  get_matching_detail,
  get_my_matching,
  delete_matching_detail,
};
