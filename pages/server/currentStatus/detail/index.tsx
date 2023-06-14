import { change_matching_to_complete } from "@/api/modules/matchingStatus";
import BottomButton from "@/components/serverComponents/bottomButton";
import Calendar from "@/components/serverComponents/calendar";
import { Layout, Modal } from "@/components/serverComponents/index";
import ProfileList from "@/components/serverComponents/profileList";
import useGetDetail from "@/hooks/useGetDetail";
import useSetMatchingId from "@/hooks/useSetMatchingId";
import {
  BadgeWrapper,
  DetailText,
  DetailTitle,
  DetailWrapper,
  MatchingBadge,
} from "@/styles/server/serverStyled";
import { colors, serverFonts } from "@/styles/theme";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import MemoTextarea from "@/components/serverComponents/memoTextarea";
import { formattingTime } from "@/utils/formatting";
import DaumPostcode from "react-daum-postcode";
import { MATCHING_STATUS_TYPE } from "@/types/types";
import { get_matching_detail } from "@/api/modules/matching";

const PixiComponentWithNoSSR = dynamic(
  () => import("@/components/serverComponents/timePicker"),
  {
    ssr: false,
  },
);

export default function CurrentStatusDetail() {
  const CURRENT_STATUS_STEP = {
    DETAIL: "DETAIL",
    CALENDAR: "CALENDAR",
    TIME: "TIME",
    MEMO: "MEMO",
    ADDRESS: "ADDRESS",
  };
  const matchingId = useSetMatchingId();
  const { detailInfo: currentStatusInfo, setDetailInfo: setCurrentStatusInfo } =
    useGetDetail(matchingId);
  const [currentStatusStep, setCurrentStatusStep] = useState<string>(
    CURRENT_STATUS_STEP.DETAIL,
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [textValue, setTextValue] = useState<string>("");
  const [valueGroups, setValueGroups] = useState<{
    hour: string;
    minutes: string;
  }>({
    hour: "12",
    minutes: "00",
  });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const handleChange = (name: string, value: string) => {
    setValueGroups({
      ...valueGroups,
      [name]: value,
    });
  };

  const confirmMatching = async () => {
    try {
      if (currentStatusInfo) {
        await change_matching_to_complete(matchingId, currentStatusInfo);
        const { data } = await get_matching_detail(matchingId);
        if (data) setCurrentStatusInfo(data.matching);
      }
    } catch (e) {
      return alert("매칭 오류");
    }
    window.scrollTo(0, 0);
  };

  const changeMatchingInfo = (name: string, value: string, type: string) => {
    currentStatusInfo &&
      setCurrentStatusInfo({
        ...currentStatusInfo,
        [name]: value,
      });
    setCurrentStatusStep(type);
  };

  const onCompletePost = (data: any) => {
    changeMatchingInfo("preferPlace", data.address, CURRENT_STATUS_STEP.DETAIL);
  };

  const confirmModalHandler = () => {
    setIsConfirmModalOpen(!isConfirmModalOpen);
  };

  const callUser = () => {
    location.href = "tel:" + "01031829254"; // 임시 번호
  };

  const SelectTitle = styled.h3`
    padding: 30px 0px 8px 16px;
    color: ${colors.white};
    font-weight: bold;
  `;

  const SelectSubText = styled.div`
    padding-left: 16px;
    color: ${colors.gray100};
  `;

  const goToCurrentStatusStep = (step: string) => {
    setCurrentStatusStep(step);
    window.scrollTo(0, 0);
  };

  selectedDate?.setHours(Number(valueGroups.hour));
  selectedDate?.setMinutes(Number(valueGroups.minutes));

  return (
    <Layout
      noPadding={currentStatusStep === CURRENT_STATUS_STEP.ADDRESS}
      noNavBar
    >
      <>
        {currentStatusStep === CURRENT_STATUS_STEP.DETAIL &&
          currentStatusInfo && (
            <>
              <DetailWrapper>
                <BadgeWrapper margin="26px 0px 0px 16px">
                  <MatchingBadge>{currentStatusInfo.statusType}</MatchingBadge>
                </BadgeWrapper>
                <ProfileList profile={currentStatusInfo} />
                <hr className="bold" />
                <DetailTitle>구매 예정 일시</DetailTitle>
                <DetailText>
                  {formattingTime(currentStatusInfo.preferTime)}
                  {currentStatusInfo.statusType ===
                    MATCHING_STATUS_TYPE.매칭중 && (
                    <Image
                      src="/assets/calendarIcon.svg"
                      alt="캘린더 버튼"
                      width={24}
                      height={24}
                      onClick={() =>
                        goToCurrentStatusStep(CURRENT_STATUS_STEP.CALENDAR)
                      }
                    />
                  )}
                </DetailText>
                <hr />
                <DetailTitle>구매 장소</DetailTitle>
                <DetailText>
                  {currentStatusInfo.preferPlace}
                  {currentStatusInfo.statusType ===
                    MATCHING_STATUS_TYPE.매칭중 && (
                    <Image
                      src="/assets/locationIcon.svg"
                      alt="장소 버튼"
                      width={24}
                      height={24}
                      onClick={() =>
                        goToCurrentStatusStep(CURRENT_STATUS_STEP.ADDRESS)
                      }
                    />
                  )}
                </DetailText>
                <DetailTitle style={{ marginTop: 48 }}>구매 목적</DetailTitle>
                <DetailText>{currentStatusInfo.clothesType}</DetailText>
                <hr />
                <DetailTitle>
                  메모
                  {currentStatusInfo.statusType ===
                    MATCHING_STATUS_TYPE.매칭중 && (
                    <Image
                      src="/assets/editIcon.svg"
                      alt="메모 버튼"
                      width={24}
                      height={24}
                      onClick={() =>
                        goToCurrentStatusStep(CURRENT_STATUS_STEP.MEMO)
                      }
                    />
                  )}
                </DetailTitle>
                <DetailText>{currentStatusInfo?.remark}</DetailText>
              </DetailWrapper>
              {currentStatusInfo.statusType === MATCHING_STATUS_TYPE.매칭중 && (
                <BottomButton
                  type="twoButton"
                  text={["전화", "매칭 확정"]}
                  onClick={[callUser, confirmModalHandler]}
                />
              )}
              {currentStatusInfo.statusType ===
                MATCHING_STATUS_TYPE.매칭완료 && (
                <BottomButton
                  type="oneButton"
                  text="전화하기"
                  onClick={callUser}
                />
              )}
              {isConfirmModalOpen && (
                <Modal
                  title="매칭 확정"
                  message={[
                    `[일시]${formattingTime(currentStatusInfo.preferTime)}`,
                    `[장소]${currentStatusInfo.preferPlace}`,
                    `의뢰자와 매칭을 확정하시겠습니까?`,
                  ]}
                  confirmText="확정"
                  cancelText="아니요"
                  confirmHandler={confirmMatching}
                  cancelHandler={confirmModalHandler}
                />
              )}
            </>
          )}
        {currentStatusStep === CURRENT_STATUS_STEP.CALENDAR && (
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
        {currentStatusStep === CURRENT_STATUS_STEP.TIME && (
          <>
            <SelectTitle>구매 시간 선택</SelectTitle>
            <SelectSubText>
              의뢰인과 협의하여 결정한
              <br /> 의상 구매 시작 시간을 선택해주세요.
            </SelectSubText>
            <PixiComponentWithNoSSR
              valueGroups={valueGroups}
              handleChange={handleChange}
            />
            <BottomButton
              type="oneButton"
              color={colors.yellow}
              text="완료"
              onClick={() =>
                changeMatchingInfo(
                  "preferTime",
                  String(formattingTime(selectedDate)),
                  CURRENT_STATUS_STEP.DETAIL,
                )
              }
            />
          </>
        )}
        {currentStatusStep === CURRENT_STATUS_STEP.ADDRESS && (
          <>
            <DaumPostcode
              autoClose={false}
              style={{
                width: "100%",
                height: "calc(100vh - 110px)",
              }}
              onComplete={onCompletePost}
            ></DaumPostcode>
          </>
        )}
        {currentStatusStep === CURRENT_STATUS_STEP.MEMO && (
          <>
            <SelectTitle>메모</SelectTitle>
            <SelectSubText>
              의뢰인과 협의하여 결정한
              <br /> 예산, 스타일, 요구사항, 소요시간 등을
              <br /> 작성해주시면 의상 구매에 큰 도움이 됩니다.
            </SelectSubText>
            <MemoTextarea
              textValue={textValue}
              onChange={e => setTextValue(e.target.value)}
            />
            <BottomButton
              type="oneButton"
              color={colors.yellow}
              disabled={textValue.length === 0}
              text="작성완료"
              onClick={() =>
                changeMatchingInfo(
                  "remark",
                  textValue,
                  CURRENT_STATUS_STEP.DETAIL,
                )
              }
            />
          </>
        )}
      </>
    </Layout>
  );
}
