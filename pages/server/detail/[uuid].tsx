import { useState } from "react";
import { useRouter } from "next/router";
import { change_waiting_to_matching } from "@/api/modules/matchingStatus";
import { Layout, Modal } from "@/components/serverComponents";
import useGetDetail from "@/hooks/useGetDetail";
import useSetMatchingId from "@/hooks/useSetMatchingId";
import {
  BadgeWrapper,
  DetailText,
  DetailTitle,
  DetailWrapper,
  MatchingBadge,
  NewBadge,
} from "@/styles/server/serverStyled";
import styled from "styled-components";
import BottomButton from "@/components/serverComponents/bottomButton";
import { colors } from "@/styles/theme";
import ProfileList from "@/components/serverComponents/profileList";
import { changeWord, formattingTime } from "@/utils/formatting";

export default function HomeDetail() {
  const router = useRouter();
  const matchingId = router.query.uuid;
  const { detailInfo: matchingInfo } = useGetDetail(matchingId);
  const [isMatchingModalOpen, setIsMatchingModalOpen] =
    useState<boolean>(false);
  const [isCurrentStatusModalOpen, setIsCurrentStatusModalOpen] =
    useState<boolean>(false);

  const matchingModalHandler = () => {
    setIsMatchingModalOpen(!isMatchingModalOpen);
  };

  const currentStatusModalHandler = () => {
    setIsCurrentStatusModalOpen(!isCurrentStatusModalOpen);
  };

  const confirmMatching = async () => {
    matchingModalHandler();
    try {
      if (typeof matchingId === "string") {
        await change_waiting_to_matching(matchingId);
      }
    } catch (e) {
      return alert("매칭 오류");
    }
    currentStatusModalHandler();
  };

  const confirmGoToCurrentStatus = () => {
    confirmMatching();
    router.push("/server/currentStatus");
  };

  const CustomBadgeWrapper = styled(BadgeWrapper)`
    margin: 26px 0px 16px 16px;
  `;

  const createTime = matchingInfo && new Date(matchingInfo.createdAt);
  const currentTime = new Date();
  const createAfter30Minutes =
    createTime && new Date(createTime.getTime() + 30 * 60000);

  return (
    <Layout noNavBar>
      <div>
        {matchingInfo && (
          <>
            <DetailWrapper>
              <CustomBadgeWrapper>
                <MatchingBadge>{matchingInfo.statusType}</MatchingBadge>
                {createTime &&
                  createTime < currentTime &&
                  createAfter30Minutes &&
                  currentTime < createAfter30Minutes && (
                    <NewBadge>NEW</NewBadge>
                  )}
              </CustomBadgeWrapper>
              <ProfileList profile={matchingInfo} />
              <hr className="bold" />
              <DetailTitle>구매 예정 일시</DetailTitle>
              <DetailText>{formattingTime(matchingInfo.preferTime)}</DetailText>
              <hr />
              <DetailTitle>구매 장소</DetailTitle>
              <DetailText>{matchingInfo.preferPlace}</DetailText>
              <hr />
              <DetailTitle>구매 목적</DetailTitle>
              <DetailText>{matchingInfo.clothesType}</DetailText>
              <hr />
              <DetailTitle>코디네이터 선호 성별</DetailTitle>
              <DetailText>{changeWord(matchingInfo.preferGender)}</DetailText>
            </DetailWrapper>
            <BottomButton
              type="oneButton"
              text={"매칭하기"}
              color={colors.yellow}
              onClick={matchingModalHandler}
            />
          </>
        )}
        {isMatchingModalOpen && (
          <Modal
            title="매칭하기"
            message={[
              "의뢰자와 매칭하시겠어요?",
              "의뢰자와의 매칭이 완료되면",
              "매칭 현황 페이지로 이동하게 됩니다.",
            ]}
            confirmText="매칭"
            cancelText="아니요"
            confirmHandler={confirmGoToCurrentStatus}
            cancelHandler={matchingModalHandler}
          />
        )}
      </div>
    </Layout>
  );
}
