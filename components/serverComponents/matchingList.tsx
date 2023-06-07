import { colors, serverFonts } from "@/styles/theme";
import { ServerMatchingInfoInterface } from "@/types/serverType";
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
`;

const SubText = styled.div`
  font-size: ${serverFonts.xsm};
  color: ${colors.gray200};
`;

const BadgeWrapper = styled.div`
  width: 100;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const NewBadge = styled.div`
  background: #ffc700;
  color: #000;
  font-size: 10px;
  font-weight: 500;
  padding: 3px 8px;
  line-height: 1.2;
`;
const MatchingBadge = styled(NewBadge)`
  background: #3290ff;
  color: #fff;
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
        pathname: `/server/detail`,
        query: { uuid: list.uuid },
      }}
      as={`/server/detail`}
    >
      <BadgeWrapper>
        <MatchingBadge>대기중</MatchingBadge>
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
        <SubText>{list.publishUserId}</SubText>
      </SubTextWrapper>
      <SubTextWrapper>
        <SubText>구매 예정일</SubText>
        <SubText>{list.preferTime}</SubText>
      </SubTextWrapper>
      <SubTextWrapper>
        <SubText>선호 성별:</SubText>
        <SubText>{list.preferGender}</SubText>
      </SubTextWrapper>
    </Link>
  );
}
