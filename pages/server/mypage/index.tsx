import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";

import { get_matchings } from "@/api/modules/matching";
import { Layout } from "@/components/serverComponents";
import { MATCHING_STATUS_TYPE } from "@/types/types";
import { colors } from "@/styles/theme";
import {
  BadgeWrapper,
  DetailWrapper,
  NewBadge,
} from "@/styles/server/serverStyled";
import ProfileList from "@/components/serverComponents/profileList";
import { ServerMatchingInfoInterface } from "@/types/serverType";

interface PaddingDivProps {
  marginPx?: string;
}

const PaddingDiv = styled.div`
  margin: ${(props: PaddingDivProps) => props.marginPx || "0rem"};
`;

const MatchedInfoDiv = styled.span`
  background-color: rgb(248 227 99);
  padding: 0.3rem;
  margin: 1rem;
`;

const MatchedList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 32px 16px;
  gap: 5px;
  align-items: center;
  border-bottom: 1px solid ${colors.gray100};
`;

const MatchedItem = styled.div`
  color: white;
  margin-left: 0.3rem;
`;

export default function Mypage() {
  const router = useRouter();
  const handleClick = (uuid: string) => {
    router.push(`/server/mypage/${uuid}`);
  };

  const [matchedList, setMatchedList] = useState<any[]>([]);

  const getAllMatching = async () => {
    try {
      const { data } = await get_matchings(MATCHING_STATUS_TYPE.진행완료);
      setMatchedList(data.matchings);
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    getAllMatching();
  }, []);

  return (
    <Layout>
      <DetailWrapper>
        <PaddingDiv marginPx="1.2rem 0 0 1rem">
          <BadgeWrapper>
            <NewBadge>코디완료 {matchedList.length}</NewBadge>
          </BadgeWrapper>
        </PaddingDiv>
        {matchedList.length > 0 &&
          matchedList.map(
            (matched: ServerMatchingInfoInterface, idx: number) => (
              <>
                <ProfileList
                  profile={matched}
                  onClick={() => handleClick(matched.uuid)}
                  key={idx}
                />
                <hr />
              </>
            ),
          )}
      </DetailWrapper>
    </Layout>
  );
}
