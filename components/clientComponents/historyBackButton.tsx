import { useRouter } from "next/router";
import styled from "styled-components";

import { colors, clientFonts } from "@/styles/theme";

const BackButton = styled.button`
  width: 100%;
  height: 110px;
  box-sizing: border-box;
  text-align: center;
  font-weight: bold;
  font-size: ${clientFonts.md};
  background-color: ${colors.gray};
  color: ${colors.white};
  border-top: ${(props: { border: boolean }) =>
    props.border && `1px solid ${colors.white}`};
`;

const HistoryBackButton = ({
  border = true,
  text = "뒤로가기",
}: {
  border?: boolean;
  text?: string;
}) => {
  const router = useRouter();

  return (
    <BackButton
      border={border}
      onClick={() => router.push("/client")}
      aria-label="홈으로 이동하시려면 버튼을 클릭해주세요"
    >
      {text}
    </BackButton>
  );
};

export default HistoryBackButton;
