import { instance } from "@/api/instance";

import { FormValues } from "@/pages";

export const get_ping = async () => {
  const response = await instance({
    method: "get",
    url: `ping`,
  });

  return response;
};

export const post_login = async (userInfo: FormValues) => {
  const response = await instance({
    method: "post",
    url: "user/login",
    data: {
      userId: userInfo.id,
      password: userInfo.password,
    },
  });

  return response;
};
