import { MATCHING_STATUS_TYPE } from "@/types/types";
import { instance } from "../instance";

const change_waiting_to_matching = async (uuid: string) => {
  const response = await instance({
    method: "patch",
    url: `matching/${uuid}?status=${MATCHING_STATUS_TYPE.매칭중}`,
  });

  return response;
};

export { change_waiting_to_matching };
