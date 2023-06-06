import { get_matching_detail } from "@/api/modules/matching";
import { change_matching_to_complete } from "@/api/modules/matchingStatus";
import { Layout } from "@/components/serverComponents/index";
import { ServerMatchingInfoInterface } from "@/types/serverType";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CurrentStatusDetail() {
  const router = useRouter();
  const [currentStatusInfo, setCurrentStatusInfo] =
    useState<ServerMatchingInfoInterface>();
  const [matchingId, setMatchingId] = useState<string>("");

  const getDetail = async (uuid: string) => {
    const { data } = await get_matching_detail(uuid);
    if (!data) return;
    setCurrentStatusInfo(data.matching);
  };

  const confirmMatching = async () => {
    try {
      if (currentStatusInfo) {
        const data = await change_matching_to_complete(
          matchingId,
          currentStatusInfo,
        );
      }
    } catch (e) {
      return alert("매칭 오류");
    }
  };

  useEffect(() => {
    const { uuid } = router.query;
    if (!uuid) router.push("/server");
    if (typeof uuid === "string") {
      getDetail(uuid);
      setMatchingId(uuid);
    }
  }, [router]);

  return (
    <Layout>
      <div>
        {currentStatusInfo?.preferPlace}
        <button>전화</button>
        <button onClick={confirmMatching}>매칭 확정</button>
      </div>
    </Layout>
  );
}
