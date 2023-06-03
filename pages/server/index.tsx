import { useEffect, useState } from "react";
import Link from "next/link";
import { MATCHING_STATUS_TYPE, get_matchings } from "@/api/modules/matching";
import { MatchingInfoInterface } from "@/types/types";
import { Layout } from '@/components/clientComponents';

export default function ServerHome() {
  const [matchingLists, setMatchingLists] = useState<MatchingInfoInterface[]>(
    [],
  );

  const getMatchingLists = async () => {
    const { data } = await get_matchings(MATCHING_STATUS_TYPE.매칭대기중);
    const temp: MatchingInfoInterface[] = [];
    if (!data || !data.matchings) return;
    data.matchings.forEach((list: MatchingInfoInterface) => {
      temp.push(list);
    });
    setMatchingLists(temp);
  };

  useEffect(() => {
    getMatchingLists();
  }, []);

  return (
    <Layout>
      <div>
        {matchingLists.map((list, idx) => {
          if (!matchingLists) return <div>현재 매칭 리스트가 없습니다.</div>;
          return (
            <ul key={idx}>
              <li>지역: {list.preferPlace}</li>
              <li>용도: {list.clothesType}</li>
              <li>선호 성별: {list.preferGender}</li>
              <Link
                href={{
                  pathname: `/server/detail`,
                  query: { uuid: list.uuid },
                }}
                as={`/server/detail`}
              >
                더보기
              </Link>
            </ul>
          );
        })}
      </div>
    </Layout>
  );
}
