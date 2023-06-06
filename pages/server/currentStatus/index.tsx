import { get_my_matching } from "@/api/modules/matching";
import { Layout } from "@/components/serverComponents/index";
import { ServerMatchingInfoInterface } from "@/types/serverType";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CurrentStatus() {
  const router = useRouter();

  const [currentStatusList, setCurrentStatusList] = useState<
    ServerMatchingInfoInterface[]
  >([]);

  const getCurrentStatusList = async () => {
    const { data } = await get_my_matching();
    if (!data) return;
    setCurrentStatusList(data.matching);
  };

  useEffect(() => {
    getCurrentStatusList();
  }, []);

  return (
    <Layout>
      {currentStatusList.length === 0 ? (
        <div>매칭 현황이 없습니다</div>
      ) : (
        currentStatusList.map((list, idx) => {
          return (
            <ul key={idx}>
              {list.statusType}
              <li>지역 : {list.preferPlace}</li>
              <li>날짜 : 2023/05/21</li>
              <li>시간 : 오후 3시</li>
              <Link
                href={{
                  pathname: `/server/currentStatus/detail`,
                  query: { uuid: list.uuid },
                }}
                as={`/server/currentStatus/detail`}
              >
                더보기
              </Link>
            </ul>
          );
        })
      )}
    </Layout>
  );
}
