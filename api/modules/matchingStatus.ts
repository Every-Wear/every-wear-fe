import { MATCHING_STATUS_TYPE } from "@/types/types";
import { instance } from "../instance";
import { ServerMatchingInfoInterface } from "@/types/serverType";

const change_waiting_to_matching = async (uuid: string) => {
  const response = await instance({
    method: "patch",
    url: `matching/${uuid}?status=${MATCHING_STATUS_TYPE.매칭중}`,
  });
  return response;
};

const change_matching_to_complete = async (
  uuid: string,
  matchingInfo: ServerMatchingInfoInterface,
) => {
  const response = await instance({
    method: "patch",
    url: `matching/${uuid}?status=${MATCHING_STATUS_TYPE.매칭완료}`,
    data: matchingInfo,
  });

  return response;
};

const change_complete_to_ongoing = async (uuid: string) => {
  const response = await instance({
    method: "patch",
    url: `matching/${uuid}?status=${MATCHING_STATUS_TYPE.진행중}`,
  });

  return response;
};

const change_ongoing_to_finish = async (uuid: string, formData: FormData) => {
  const response = await instance({
    method: "post",
    url: `matching/${uuid}?status=${MATCHING_STATUS_TYPE.진행완료}`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

export {
  change_waiting_to_matching,
  change_matching_to_complete,
  change_complete_to_ongoing,
  change_ongoing_to_finish,
};
