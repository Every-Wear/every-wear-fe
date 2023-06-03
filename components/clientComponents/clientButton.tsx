import styled from "styled-components";
import { colors, clientFonts } from "@/styles/theme";

import { ColorType } from "@/styles/styledType";

interface ClientButtonInterfaca {
  children: string;
  border?: boolean;
  onClickHandler: () => void;
  bgColor?: keyof ColorType;
  fontColor?: keyof ColorType;
}

const ClientButtonWrap = styled.button`
  width: 100%;
  padding: 32px 0;
  text-align: center;
  font-size: ${clientFonts.md};
  border-top: ${(props: { border: boolean }) =>
    props.border && "1px solid #fff"};
`;

const ClientButton = ({
  children = "버튼 텍스트",
  onClickHandler,
  bgColor = "blue",
  fontColor = "white",
  border = false,
}: ClientButtonInterfaca) => {
  return (
    <ClientButtonWrap
      type="button"
      onClick={onClickHandler}
      border={border}
      style={{ background: colors[bgColor], color: colors[fontColor] }}
    >
      {children}
    </ClientButtonWrap>
  );
};

export default ClientButton;
