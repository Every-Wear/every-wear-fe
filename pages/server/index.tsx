import { useEffect, useState } from "react";
import { get_matchings } from "@/api/modules/matching";
import Image from "next/image";
import styled from "styled-components";
import { Layout } from "@/components/serverComponents";
import { colors, serverFonts } from "@/styles/theme";
import MatchingList from "@/components/serverComponents/matchingList";
import { ServerMatchingInfoInterface } from "@/types/serverType";
import { MATCHING_STATUS_TYPE } from "@/types/types";
import { isAxiosError } from "axios";

export default function ServerHome() {
  const [matchingLists, setMatchingLists] = useState<
    ServerMatchingInfoInterface[]
  >([]);

  const getMatchingLists = async () => {
    try {
      const { data } = await get_matchings(MATCHING_STATUS_TYPE.매칭대기중);
      const temp: ServerMatchingInfoInterface[] = [];
      if (!data) return;
      data.matchings.forEach((list: ServerMatchingInfoInterface) => {
        temp.push(list);
      });
      setMatchingLists(temp);
    } catch (err) {
      if (isAxiosError(err)) {
        alert(err.response?.data.error);
      }
    }
  };

  useEffect(() => {
    getMatchingLists();
  }, []);

  const WelcomeCardWrapper = styled.div`
    width: 100%;
    height: 200px;
    position: relative;
    margin: auto;
    cursor: pointer;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url("/assets/welcomeBackground.png");
  `;

  const WelcomeTextWrapper = styled.div`
    padding-top: 49px;
    padding-left: 24px;
    color: ${colors.white};
    font-family: "KoddiUD OnGothic";
    text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
  `;

  const WelcomeCardMainText = styled.h2`
    position: absolute;
  `;

  const WelcomeCardSubText = styled.h3`
    margin-top: 38px;
    position: absolute;
  `;

  const MatchingSection = styled.section`
    padding: 40px 16px;
  `;

  const MatchingTextWrapper = styled.div`
    display: flex;
    justify-content: space-between;
  `;

  const MatchingTotalText = styled.div`
    color: ${colors.white};
    font-size: ${serverFonts.md};
    font-weight: bold;
  `;
  const MatchingOrderText = styled.div`
    color: ${colors.gray200};
    font-size: ${serverFonts.sm};
  `;
  return (
    <Layout>
      <WelcomeCardWrapper>
        <WelcomeTextWrapper>
          <WelcomeCardMainText>코디네이터 지침가이드</WelcomeCardMainText>
          <WelcomeCardSubText>시각장애인의 눈이 되는 법</WelcomeCardSubText>
        </WelcomeTextWrapper>
        <Image
          src="/assets/welcomeButton.svg"
          width={64}
          height={32}
          style={{
            position: "absolute",
            bottom: "14px",
            right: "24px",
          }}
          alt="코디네이터 지침가이드 버튼"
        />
      </WelcomeCardWrapper>
      <MatchingSection>
        <MatchingTextWrapper>
          <MatchingTotalText>{matchingLists.length}개 의뢰</MatchingTotalText>
          <MatchingOrderText>최신 신청순</MatchingOrderText>
        </MatchingTextWrapper>
        {matchingLists.map((list, idx) => {
          if (!matchingLists) return <div>현재 매칭 리스트가 없습니다.</div>;
          return <MatchingList list={list} key={idx} />;
        })}
      </MatchingSection>
    </Layout>
  );
}
