import { ClientText, ClientSubText } from "@/components/clientComponents";
import styled from "styled-components";

import { IntroLabel } from "@/components/clientComponents";
import { changeButtonText } from "@/utils/stringFormat";

export const MatchingInfoListWrap = styled.section`
  width: 100%;
`;

export const InfoText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px 16px;
  gap: 5px;

  &:not(:last-child) {
    border-bottom: 1px solid #b3b3b3;
  }
`;

interface MatchingFormListInterface {
  time: string;
  location: string;
  purpose: string;
  gender: string;
}

const MatchingFormList = ({
  time,
  location,
  purpose,
  gender,
}: MatchingFormListInterface) => {
  const matchingList = [
    {
      title: "구매 날짜",
      content: time.includes("일")
        ? time
        : time.slice(0, 4) +
            "년 " +
            time.slice(4, 6) +
            "월 " +
            time.slice(6, 8) +
            "일" ?? "",
    },
    { title: "구매 장소", content: location ?? "" },
    { title: "구매 목적", content: purpose ?? "" },
    { title: "코디네이터 성별", content: gender ?? "" },
  ];

  return (
    <MatchingInfoListWrap>
      <IntroLabel labelText="매칭신청서입니다. 아래로 스크롤을 통해 정보를 확인해주신후 맞다면 제출해주세요" />
      {matchingList.map(matching => (
        <InfoText key={matching.title}>
          <ClientSubText>{matching.title}</ClientSubText>
          <ClientText>{changeButtonText(matching.content)}</ClientText>
        </InfoText>
      ))}
    </MatchingInfoListWrap>
  );
};

export default MatchingFormList;
