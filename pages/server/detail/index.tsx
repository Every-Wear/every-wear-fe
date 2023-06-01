import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Modal, Layout } from "@/pages/components/serverComponents/index";
import { get_matching_detail } from "@/api/modules/matching";
import { MatchingInfoInterface } from "@/types/types";
import { change_waiting_to_matching } from "@/api/modules/matchingStatus";

export default function HomeDetail() {
  const router = useRouter();
  const [matchingId, setMatchingId] = useState<string>("");
  const [matchingInfo, setMatchingInfo] = useState<MatchingInfoInterface>();
  const [isMatchingModalOpen, setIsMatchingModalOpen] =
    useState<boolean>(false);
  const [isCurrentStatusModalOpen, setIsCurrentStatusModalOpen] =
    useState<boolean>(false);

  const getDetail = async (uuid: string) => {
    const { data } = await get_matching_detail(uuid);
    if (!data || !data.matching) return;
    setMatchingInfo(data.matching);
  };

  const matchingModalHandler = () => {
    setIsMatchingModalOpen(!isMatchingModalOpen);
  };

  const currentStatusModalHandler = () => {
    setIsCurrentStatusModalOpen(!isCurrentStatusModalOpen);
  };

  const closeStatusModal = () => {
    setIsCurrentStatusModalOpen(false);
    router.back(); // 매칭하기를 누른 디테일 페이지는 화면 상에서 사라져야하기 때문에 일단 뒤로가기로 해놨습니다
  };

  const confirmMatching = async () => {
    // 매칭 로직
    const data = await change_waiting_to_matching(matchingId);
    console.log(data);
    matchingModalHandler();
    currentStatusModalHandler();
  };

  const confirmGoToCurrentStatus = () => {
    if (isCurrentStatusModalOpen) {
      router.push("currentStatus");
    }
  };

  useEffect(() => {
    const { uuid } = router.query;
    if (!uuid) return;
    if (typeof uuid === "string") {
      getDetail(uuid);
      setMatchingId(uuid);
    }
  }, [router.query]);

  return (
    <Layout>
      <div>
        {matchingInfo && (
          <div>
            <ul>
              <li>지역: {matchingInfo.preferPlace}</li>
              <li>날짜: {matchingInfo.createdAt}</li>
              <li>종류: {matchingInfo.clothesType}</li>
              <li>선호 성별: {matchingInfo.preferGender}</li>
              <li>선호 스타일: {matchingInfo.preferStyle}</li>
              <li>예산: {matchingInfo.limitPrice}</li>
              <li>비고: {matchingInfo.remark}</li>
            </ul>
            <button onClick={matchingModalHandler}>매칭하기</button>
          </div>
        )}
        {isMatchingModalOpen && (
          <Modal
            message="매칭 하시겠습니까?"
            confirmHandler={confirmMatching}
            cancelHandler={matchingModalHandler}
          />
        )}
        {isCurrentStatusModalOpen && (
          <Modal
            message="매칭 현황 페이지로 이동할까요?"
            confirmHandler={confirmGoToCurrentStatus}
            cancelHandler={closeStatusModal}
          />
        )}
      </div>
    </Layout>
  );
}
