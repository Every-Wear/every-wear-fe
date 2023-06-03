import { instance } from "@/api/instance";

export const post_geo_data = async (
  uuid: string,
  latitude: string,
  longitude: string,
) => {
  const response = await instance({
    method: "get",
    url: `datas/geo/${uuid}`,
    data: {
      latitude: latitude,
      longitude: longitude,
    },
  });

  return response;
};
