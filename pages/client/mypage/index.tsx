import { useEffect, useState } from "react";
import styled from "styled-components";

import { get_matchings } from "@/api/modules/matching";

import {
  Layout,
  HistoryBackButton,
  ClientText,
} from "@/components/clientComponents/index";

import { ClientMatchingInfoInterface } from "@/types/clientType";
import { MATCHING_STATUS_TYPE } from "@/types/types";
import { colors } from "@/styles/theme";

const MypageTitle = styled.div`
  padding: 50px 16px;
  width: 100%;
`;

const MatchedList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px 16px;
  gap: 5px;
  border-top: 1px solid ${colors.white};

  &:last-child {
    border-bottom: 1px solid ${colors.white};
  }
`;

const Mypage = () => {
  const [matchedList, setMatchedList] = useState<ClientMatchingInfoInterface[]>(
    [],
  );

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
      <MypageTitle>
        <ClientText>매칭 내역을 확인하세요</ClientText>
      </MypageTitle>
      <div>
        {matchedList.length > 0 &&
          matchedList.map(matched => (
            <MatchedList key={matched._id}>
              <ClientText>
                {matched.preferStyle} / {matched.clothesType}를 <br />
                구매 했었어요
              </ClientText>
            </MatchedList>
          ))}
      </div>
      <HistoryBackButton />
    </Layout>
  );
};

export default Mypage;
