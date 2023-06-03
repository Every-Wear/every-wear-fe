import { post_geo_data } from "@/api/modules/data";

export const postGeoLocationData = (uuid: string) => {
  interface GeoInterface {
    coords: { latitude: number; longitude: number };
  }

  const onGeoOkay = (position: GeoInterface) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    post_geo_data(uuid, String(lat), String(lng));
    console.log(lat, lng);
  };

  function onGeoError() {
    console.log("geo 조회에 실패했습니다.");
  }

  navigator.geolocation.getCurrentPosition(onGeoOkay, onGeoError);
};
