import { useRouter } from "next/router";
import Modal from "@/serverComponents/modal";
import { useState } from "react";
import Layout from "@/serverComponents/layout";

export default function HomeDetail() {
  const router = useRouter();

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

  const confirmMatching = () => {
    // 매칭 로직
    matchingModalHandler();
    currentStatusModalHandler();
  };

  const confirmGoToCurrentStatus = () => {
    if (isCurrentStatusModalOpen) {
      router.push("currentStatus");
    }
  };

  return (
    <Layout>
      <div>
        <ul>
          <li>지역: 서울</li>
          <li>날짜: 2023/05/28</li>
          <li>시간: 오후 3시</li>
          <li>용도: 패션</li>
          <li>성별: 여자</li>
        </ul>
        <button onClick={matchingModalHandler}>매칭하기</button>
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
            cancelHandler={currentStatusModalHandler}
          />
        )}
      </div>
    </Layout>
  );
}
