import { change_matching_to_complete } from "@/api/modules/matchingStatus";
import BottomButton from "@/components/serverComponents/bottomButton";
import Calendar from "@/components/serverComponents/calendar";
import { Layout } from "@/components/serverComponents/index";
import TimePicker from "@/components/serverComponents/timePicker";
import useGetDetail from "@/hooks/useGetDetail";
import useSetMatchingId from "@/hooks/useSetMatchingId";
import { colors } from "@/styles/theme";
import { getRandomNumImg } from "@/utils/randomImg";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

export default function CurrentStatusDetail() {
  const CURRENT_STATUS_STEP = {
    DETAIL: "DETAIL",
    CALENDAR: "CALENDAR",
    TIME: "TIME",
  };
  const matchingId = useSetMatchingId();
  const currentStatusInfo = useGetDetail(matchingId);
  const [curresntStatusStep, setCurrentStatusStep] = useState<string>(
    CURRENT_STATUS_STEP.DETAIL,
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const confirmMatching = async () => {
    try {
      if (currentStatusInfo) {
        await change_matching_to_complete(matchingId, currentStatusInfo);
      }
    } catch (e) {
      return alert("매칭 오류");
    }
  };

  const DetailWrapper = styled.div`
    padding-bottom: 80px;
    > hr.bold {
      border: 4px solid rgba(44, 44, 44, 1);
    }
    > hr {
      border: 1px solid rgba(44, 44, 44, 1);
    }
  `;

  const StatusLabel = styled.div`
    background: #3290ff;
    color: ${colors.white};
    font-weight: bold;
    font-size: 14px;
    width: 55px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 26px 16px;
  `;

  const Profile = styled.div`
    display: flex;
    margin-left: 16px;
    margin-bottom: 36px;
  `;

  const ProfileTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 3px 16px;
  `;

  const UserInfoText = styled.span`
    color: ${colors.gray100};
    font-size: 14px;
    font-weight: bold;
  `;

  const ProfileTitleText = styled.span`
    color: ${colors.white};
    font-size: 18px;
    font-weight: bold;
  `;

  const SelectTitle = styled.h3`
    padding: 30px 0px 8px 16px;
    color: ${colors.white};
    font-weight: bold;
  `;

  const SelectSubText = styled.div`
    padding-left: 16px;
    color: ${colors.gray100};
  `;

  const DetailTitle = styled.div`
    margin: 24px 16px 8px 16px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    color: ${colors.gray100};
  `;

  const DetailText = styled.div`
    color: ${colors.white};
    font-weight: ${colors.white};
    font-size: 16px;
    font-weight: bold;
    margin: 0px 16px 24px 16px;
    display: flex;
    justify-content: space-between;
  `;

  return (
    <Layout noNavBar>
      <>
        {curresntStatusStep === CURRENT_STATUS_STEP.DETAIL && (
          <>
            <DetailWrapper>
              <StatusLabel>매칭중</StatusLabel>
              <Profile>
                <Image
                  src={`/assets/random-profile${getRandomNumImg()}.png`}
                  alt="요청한 시각장애인의 프로필사진"
                  width={48}
                  height={48}
                />
                <ProfileTextWrapper>
                  <UserInfoText>
                    OO대{" "}
                    {currentStatusInfo?.preferGender === "woman"
                      ? "여성"
                      : "남성"}
                  </UserInfoText>
                  <ProfileTitleText>
                    {currentStatusInfo?.preferPlace}에서{" "}
                    {currentStatusInfo?.clothesType}을 구해요
                  </ProfileTitleText>
                </ProfileTextWrapper>
              </Profile>
              <hr className="bold" />
              <DetailTitle>구매 예정 일시</DetailTitle>
              <DetailText>
                {currentStatusInfo?.preferTime}
                <Image
                  src="/assets/calendarIcon.svg"
                  alt="캘린더 버튼"
                  width={24}
                  height={24}
                  onClick={() =>
                    setCurrentStatusStep(CURRENT_STATUS_STEP.CALENDAR)
                  }
                />
              </DetailText>
              <hr />
              <DetailTitle>구매 장소</DetailTitle>
              <DetailText>
                {currentStatusInfo?.preferPlace}
                <Image
                  src="/assets/locationIcon.svg"
                  alt="장소 버튼"
                  style={{
                    marginBottom: 24,
                  }}
                  width={24}
                  height={24}
                />
              </DetailText>
              <DetailTitle>구매 목적</DetailTitle>
              <DetailText>{currentStatusInfo?.clothesType}</DetailText>
              <hr />
              <DetailTitle>
                메모
                <Image
                  src="/assets/editIcon.svg"
                  alt="메모 버튼"
                  width={24}
                  height={24}
                />
              </DetailTitle>
              {/* <button onClick={confirmMatching}>매칭 확정</button> */}
            </DetailWrapper>
            <BottomButton type="twoButton" text={["전화", "매칭 확정"]} />
          </>
        )}
        {curresntStatusStep === CURRENT_STATUS_STEP.CALENDAR && (
          <>
            <SelectTitle>구매 날짜 선택</SelectTitle>
            <SelectSubText>
              의뢰인과 협의하여 결정한
              <br /> 의상 구매 날짜를 선택해주세요.
            </SelectSubText>
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <BottomButton
              type="oneButton"
              color={colors.yellow}
              text="다음"
              onClick={() => setCurrentStatusStep(CURRENT_STATUS_STEP.TIME)}
              disabled={selectedDate === null}
            />
          </>
        )}
        {curresntStatusStep === CURRENT_STATUS_STEP.TIME && (
          <>
            <SelectTitle>구매 시간 선택</SelectTitle>
            <SelectSubText>
              의뢰인과 협의하여 결정한
              <br /> 의상 구매 시작 시간을 선택해주세요.
            </SelectSubText>
            <TimePicker />
          </>
        )}
      </>
    </Layout>
  );
}
