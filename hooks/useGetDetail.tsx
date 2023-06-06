import { get_matching_detail } from "@/api/modules/matching";
import { ServerMatchingInfoInterface } from "@/types/serverType";
import { useEffect, useState } from "react";

export default function useGetDetail(uuid?: string | string[]) {
  const [detailInfo, setDetailInfo] = useState<ServerMatchingInfoInterface>();

  useEffect(() => {
    (async () => {
      if (typeof uuid === "string") {
        const { data } = await get_matching_detail(uuid);
        if (!data) return;
        setDetailInfo(data.matching);
      }
    })();
  }, [uuid]);

  return detailInfo;
}
