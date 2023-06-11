import { useEffect, useState } from "react";
import styled from "styled-components";

import { get_matchings } from "@/api/modules/matching";

import {
  Layout,
  HistoryBackButton,
  ClientText,
  BottomButtonLayout,
  IntroLabel,
} from "@/components/clientComponents/index";

import { ClientMatchingInfoInterface } from "@/types/clientType";
import { MATCHING_STATUS_TYPE } from "@/types/types";
import { clientFonts, colors } from "@/styles/theme";

const MypageTitle = styled.div`
  padding: 50px 16px;
  width: 100%;
`;

const MatchedList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
  gap: 5px;
  background-color: ${colors.gray};
  font-size: ${clientFonts.sm};
  color: ${colors.white};
  margin: 0 20px;
  margin-bottom: 20px;
  border-radius: 3px;
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
      <div style={{ paddingBottom: "110px" }}>
        <IntroLabel labelText="에브리웨어 이전 매칭 내역입니다. 스크롤을 이동하여 예전 매칭내역을 확인하실수 있습니다." />
        <MypageTitle>
          <ClientText>
            이전 매칭 내역을
            <br /> 확인하세요
          </ClientText>
        </MypageTitle>
        <div>
          {matchedList.length > 0 &&
            matchedList.map(matched => (
              <MatchedList key={matched._id}>
                {matched.preferStyle} <br /> {matched.clothesType} 들을 <br />
                구매 했었어요
              </MatchedList>
            ))}
        </div>
      </div>
      <BottomButtonLayout>
        <HistoryBackButton border={false} text="홈으로" />
      </BottomButtonLayout>
    </Layout>
  );
};

export default Mypage;
