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

const SubText = styled.div`
  font-size: ${serverFonts.sm};
  color: ${colors.gray200};
`;

interface MatchingListInterface {
  list: ServerMatchingInfoInterface;
}

export default function MatchingList({ list }: MatchingListInterface) {
  return (
    <div>
      <MatchingTitle>
        {list.preferPlace}에서
        <br /> {list.clothesType}을 구해요
      </MatchingTitle>
      <SubText>코디 의뢰자</SubText>
      <SubText>구매 예정일</SubText>
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
    </div>
  );
}
