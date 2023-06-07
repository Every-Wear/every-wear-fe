import { useRouter } from "next/router";
import styled from "styled-components";

import { colors, clientFonts } from "@/styles/theme";

const BackButton = styled.button`
  width: 100%;
  padding: 32px 0;
  text-align: center;
  font-weight: bold;
  font-size: ${clientFonts.md};
  background-color: ${colors.black};
  color: ${colors.white};
  border-top: 1px solid ${colors.white};
`;

const HistoryBackButton = () => {
  const router = useRouter();

  return (
    <BackButton onClick={() => router.push("/client")}>뒤로가기</BackButton>
  );
};

export default HistoryBackButton;
