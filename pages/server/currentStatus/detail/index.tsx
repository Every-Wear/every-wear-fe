import { change_matching_to_complete } from "@/api/modules/matchingStatus";
import BottomButton from "@/components/serverComponents/bottomButton";
import Calendar from "@/components/serverComponents/calendar";
import { Layout } from "@/components/serverComponents/index";
import useGetDetail from "@/hooks/useGetDetail";
import useSetMatchingId from "@/hooks/useSetMatchingId";
import { colors } from "@/styles/theme";
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
  return (
    <Layout noNavBar>
      <>
        {curresntStatusStep === CURRENT_STATUS_STEP.DETAIL && (
          <div>
            <StatusLabel>매칭중</StatusLabel>
            <Image src="" />
            {currentStatusInfo?.preferPlace}
            <button>전화</button>
            <button onClick={confirmMatching}>매칭 확정</button>
          </div>
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
              color="rgba(252, 228, 68, 1)"
              text="다음"
              disabled={selectedDate === null}
            />
          </>
        )}
      </>
    </Layout>
  );
}
