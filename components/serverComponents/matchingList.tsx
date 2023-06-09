import {
  BadgeWrapper,
  MatchingBadge,
  NewBadge,
} from "@/styles/server/serverStyled";
import { colors, serverFonts } from "@/styles/theme";
import { ServerMatchingInfoInterface } from "@/types/serverType";
import { changeWord } from "@/utils/formatting";
import Link from "next/link";
import styled from "styled-components";

const MatchingTitle = styled.div`
  color: ${colors.white};
  font-size: ${serverFonts.sm};
  font-weight: bold;
  margin: 10px 0;
`;

const SubTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const SubText = styled.div`
  font-size: ${serverFonts.xsm};
  color: ${colors.gray200};
`;

interface MatchingListInterface {
  list: ServerMatchingInfoInterface;
}

export default function MatchingList({ list }: MatchingListInterface) {
  const createTime = new Date(list.createdAt);
  const currentTime = new Date();
  const createAfter30Minutes = new Date(createTime.getTime() + 30 * 60000);

  return (
    <Link
      href={{
        pathname: `/server/detail/${list.uuid}`,
      }}
    >
      <BadgeWrapper>
        <MatchingBadge size="sm">대기중</MatchingBadge>
        {createTime < currentTime && currentTime < createAfter30Minutes && (
          <NewBadge>NEW</NewBadge>
        )}
      </BadgeWrapper>
      <MatchingTitle>
        {list.preferPlace}에서
        <br /> {list.clothesType}을 구해요
      </MatchingTitle>
      <SubTextWrapper>
        <SubText>코디 의뢰자</SubText>
        <SubText>
          {list.publishUserId} {changeWord(list.preferGender)}
        </SubText>
      </SubTextWrapper>
      <SubTextWrapper>
        <SubText>구매 예정일</SubText>
        <SubText>{list.preferTime}</SubText>
      </SubTextWrapper>
    </Link>
  );
}
