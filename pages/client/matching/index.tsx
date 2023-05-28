import { useEffect, useState } from "react";
import { StatusButton } from "./index.styled";

export const Matching = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const getQrCode = async () => {
    console.log("get QrCode");
  };

  useEffect(() => {
    getQrCode();
  }, []);

  return (
    <div>
      <div>스탭버튼</div>
      <h2>신청형황</h2>
      <ul>
        <li>1월 31일 12:30</li>
        <li>영등포역</li>
        <li>면접장소</li>
      </ul>
      <div>진행상태 : 매칭중</div>
      <StatusButton>신청취소</StatusButton>
    </div>
  );
};

export default Matching;
