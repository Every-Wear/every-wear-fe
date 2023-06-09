import { get_my_matching } from "@/api/modules/matching";
import { Layout } from "@/components/serverComponents/index";
import ProfileList from "@/components/serverComponents/profileList";
import {
  BadgeWrapper,
  DetailWrapper,
  MatchingBadge,
  NewBadge,
} from "@/styles/server/serverStyled";
import { ServerMatchingInfoInterface } from "@/types/serverType";
import { MATCHING_STATUS_TYPE } from "@/types/types";
import { isAxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CurrentStatus() {
  const [currentStatusList, setCurrentStatusList] = useState<
    ServerMatchingInfoInterface[]
  >([]);

  const getCurrentStatusList = async () => {
    try {
      const { data } = await get_my_matching();
      if (data) setCurrentStatusList(data.matching);
    } catch (err) {
      if (isAxiosError(err)) {
        alert(err.response?.data.error);
      }
    }
  };

  useEffect(() => {
    getCurrentStatusList();
  }, []);

  const matchingList = currentStatusList.filter(
    list => list.statusType === MATCHING_STATUS_TYPE.매칭중,
  );

  const completeList = currentStatusList.filter(
    list => list.statusType === MATCHING_STATUS_TYPE.매칭완료,
  );

  const ongoingList = currentStatusList.filter(
    list => list.statusType === MATCHING_STATUS_TYPE.진행중,
  );

  const curretStatusListTemplate = (
    lists: ServerMatchingInfoInterface[],
    type: string,
  ) => {
    if (lists.length > 0) {
      return (
        <>
          <BadgeWrapper margin="26px 0px 0px 16px">
            {type.includes("매칭") ? (
              <MatchingBadge>
                {type} {lists.length}
              </MatchingBadge>
            ) : (
              <NewBadge>
                {type} {lists.length}
              </NewBadge>
            )}
          </BadgeWrapper>
          {lists.map((list, idx) => {
            return (
              <>
                <Link
                  href={{
                    pathname: `/server/currentStatus/detail`,
                    query: { uuid: list.uuid },
                  }}
                  as={`/server/currentStatus/detail`}
                  key={idx}
                >
                  <ProfileList profile={list} />
                </Link>
                {idx !== lists.length - 1 && <hr />}
              </>
            );
          })}
          <hr className="bold" />
        </>
      );
    }
  };
  return (
    <Layout>
      <DetailWrapper>
        {currentStatusList.length === 0 && <div>매칭 현황이 없습니다</div>}
        {curretStatusListTemplate(matchingList, MATCHING_STATUS_TYPE.매칭중)}
        {curretStatusListTemplate(completeList, MATCHING_STATUS_TYPE.매칭완료)}
        {curretStatusListTemplate(ongoingList, MATCHING_STATUS_TYPE.진행중)}
      </DetailWrapper>
    </Layout>
  );
}
