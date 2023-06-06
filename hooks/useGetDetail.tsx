import { get_matching_detail } from "@/api/modules/matching";
import { ServerMatchingInfoInterface } from "@/types/serverType";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useGetDetail(uuid?: string | string[]) {
  const router = useRouter();
  const [detailInfo, setDetailInfo] = useState<ServerMatchingInfoInterface>();

  useEffect(() => {
    (async () => {
      if (uuid !== "" && typeof uuid === "string") {
        try {
          const { data } = await get_matching_detail(uuid);
          if (data) setDetailInfo(data.matching);
        } catch (err) {
          if (isAxiosError(err)) {
            alert(err.response?.data.error);
          }
        }
      }
    })();
  }, [uuid, router]);

  return detailInfo;
}
