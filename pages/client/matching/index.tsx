import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { get_matchings } from "@/api/modules/matching";
import { MatchingStatusType } from "@/api/modules/matching";

import { HistoryBackButton } from "@/components/clientComponents";
import { StatusButton } from "@/pages/client/matching/index.styled";

interface MatchingInfoInterface {
  _id: string;
  publishUserId: string;
  statusType: MatchingStatusType;
  clothesType: string; // 만약 백엔드 enum이 있다면 상수로 교체
  limitPrice: number;
  preferPlace: string;
  preferStyle: string; // 만약 백엔드 enum이 있다면 상수로 교체
  preferGender: "woman" | "man";
  remark: string;
  uuid: string;
  createdAt: string;
  qrCodeValue: string;
}

const Matching = () => {
  // 임시 state와 fn 이후 통 삭제 필요
  const [index, setIndex] = useState(0);
  const stepList = ["매칭대기중", "매칭중", "매칭완료", "진행중", "진행완료"];
  const [step, setStep] = useState(stepList[0]);
  const currentProgress = step;

  useEffect(() => {
    if (index === 2) alert("매칭되었습니다.");
    if (index === 5) alert("완료되었습니다.");
  }, [index]);
  // --------------
  const router = useRouter();

  const [matchingInfo, setMatchingInfo] = useState<MatchingInfoInterface>();
  const [qrCode, setQrCode] = useState<string>("");

  const getCurrentMatching = async () => {
    const { data } = await get_matchings("매칭대기중");
    setMatchingInfo(data.matchings[0]);
    setQrCode(data.matchings[0].qrCodeValue);
  };

  const getQrCode = async () => {
    const { data } = await get_matchings("매칭대기중");
  };

  /**
   * 이후 하나의 함수에서 awiat로 순차적 진행
   * getCurrentMatching 으로 uuid를 받은다음 해당 uuid에 QR코드를 가져옴
   * getCurrentMatching은 한번 콜 이후 1분마다 폴링방식으로 서버와 통신
   * 아니면 BE에서 현재 클라이언트 측에서 진행중인 매칭만 get 하는 API 필요
   */
  useEffect(() => {
    getCurrentMatching();
    getQrCode();
  }, []);

  /**
   * 얼리리턴을 스크린리더기가 어떻게 반응하는지 체크가 필요함
   * 만약 CSR에서 스크린리더기가 정상적으로 동작하지 않는다면?
   * 클라이언트 페이지 사이드는 SSR이 될 가능성이 높음
   */
  if (matchingInfo === null) {
    return (
      <div>
        <div>진행상황이 없습니다.</div>
        <HistoryBackButton />
      </div>
    );
  }

  const currentMatchingCancelHandler = () => {
    if (confirm("취소하시겠습니까?")) {
      alert("취소되었습니다.");
      router.push("/client");
    }
  };

  // const currentProgress = matchingInfo?.statusType;
  const currentMatchingInfo = {
    limitPrice: matchingInfo?.limitPrice,
    preferPlace: matchingInfo?.preferPlace,
    clothesType: matchingInfo?.clothesType,
    preferStyle: matchingInfo?.preferStyle,
    preferGender: matchingInfo?.preferGender,
    remark: matchingInfo?.remark,
  };

  return (
    <div>
      <div
        onClick={() => {
          console.log(index);
          setIndex(index + 1);
          setStep(stepList[index]);
        }}
      >
        스탭버튼
      </div>
      <h2>신청현황</h2>
      <ul>
        <li>장소 : {currentMatchingInfo["preferPlace"]}</li>
        <li>성별 : {currentMatchingInfo["preferGender"]}</li>
        <li>스타일 : {currentMatchingInfo["preferStyle"]}</li>
        <li>구매필요 : {currentMatchingInfo["clothesType"]}</li>
        <li>한도금액 : {currentMatchingInfo["limitPrice"]}</li>
        <li>비고 : {currentMatchingInfo["remark"]}</li>
        <li>진행상태 : {currentProgress}</li>
      </ul>
      {currentProgress === "매칭완료" && (
        <Image src={qrCode} alt="Picture of me" width={100} height={100} />
      )}
      {currentProgress !== "진행중" && currentProgress !== "진행완료" && (
        <StatusButton onClick={currentMatchingCancelHandler}>
          신청취소
        </StatusButton>
      )}
      {currentProgress === "진행완료" && <button>완료</button>}
      <HistoryBackButton />
    </div>
  );
};

export default Matching;
