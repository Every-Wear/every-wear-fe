import { useRouter } from "next/router";
import styled from "styled-components";

const BackButton = styled.button`
  width: 100%;
  border: 1px solid #fff;
  padding: 20px 0;
  font-size: 20px;
`;

const HistoryBackButton = () => {
  const router = useRouter();

  return <BackButton onClick={() => router.back()}>뒤로가기</BackButton>;
};

export default HistoryBackButton;
