import styled from "styled-components";
import { colors, clientFonts } from "@/styles/theme";

import { ColorType } from "@/styles/styledType";

interface ClientButtonInterface {
  children: string;
  border?: boolean;
  onClickHandler: () => void;
  bgColor?: keyof ColorType;
  fontColor?: keyof ColorType;
  label: string;
  disable?: boolean;
}

const ClientButtonWrap = styled.button`
  width: 100%;
  padding: 32px 0;
  border-radius: 3px;
  text-align: center;
  font-weight: bold;
  font-size: ${clientFonts.md};
  border-top: ${(props: { border: boolean }) =>
    props.border && `1px solid ${colors.white}`};
`;

const ClientButton = ({
  children = "버튼 텍스트",
  onClickHandler,
  bgColor = "blue",
  fontColor = "white",
  border = false,
  label,
  disable = false,
}: ClientButtonInterface) => {
  return (
    <ClientButtonWrap
      type="button"
      onClick={onClickHandler}
      border={border}
      disabled={disable}
      style={{
        background: disable ? colors.gray100 : colors[bgColor],
        color: colors[fontColor],
      }}
      aria-label={label}
    >
      {children}
    </ClientButtonWrap>
  );
};

export default ClientButton;
