import { instance } from "@/api/instance";

export const get_ping = async () => {
  const response = await instance({
    method: "get",
    url: `ping`,
  });

  return response;
};
