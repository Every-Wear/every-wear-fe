import { ClientText, ClientSubText } from "@/components/clientComponents";

import {
  MatchingInfoListWrap,
  InfoText,
} from "@/pages/client/matching/index.styled";

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
    { title: "구매 날짜", content: time ?? "" },
    { title: "구매 장소", content: location ?? "" },
    { title: "구매 목적", content: purpose ?? "" },
    { title: "코디네이터 성별", content: gender ?? "" },
  ];

  return (
    <MatchingInfoListWrap>
      {matchingList.map(matching => (
        <InfoText key={matching.title}>
          <ClientSubText>{matching.title}</ClientSubText>
          <ClientText>{matching.content}</ClientText>
        </InfoText>
      ))}
    </MatchingInfoListWrap>
  );
};

export default MatchingFormList;
