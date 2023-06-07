import styled from "styled-components";
import { colors } from "@/styles/theme";
import { ColorInterface } from "@/types/serverType";

const ButtonWrapper = styled.div`
  height: 64px;
  width: 100%;
  display: flex;
  bottom: 0;
  position: fixed;
`;

const OneButtonContainer = styled.button`
  background-color: ${(props: ColorInterface) =>
    props.color ? props.color : colors.white};
  color: ${colors.black};
  height: 64px;
  width: 100%;
  z-index: 99;
  position: fixed;
  bottom: 0;
  font-size: 18px;
  font-weight: bold;
  filter: ${(props: { disabled: boolean }) =>
    props.disabled ? `brightness(1.9)` : `brightness(1)`};
`;

const TwoButtonContainer = styled.button`
  width: 50%;
  font-size: 18px;
  font-weight: bold;
  color: ${colors.black};
  background-color: ${(props: { first?: boolean }) =>
    props.first ? colors.white : colors.yellow};
  border: none;
  outline: none;
`;

export default function BottomButton({
  type,
  color,
  text,
  onClick,
  disabled = false,
}: any) {
  return (
    <>
      {type === "oneButton" ? (
        <OneButtonContainer color={color} disabled={disabled} onClick={onClick}>
          {text}
        </OneButtonContainer>
      ) : (
        <>
          <ButtonWrapper>
            <TwoButtonContainer first>{text[0]}</TwoButtonContainer>
            <TwoButtonContainer>{text[1]}</TwoButtonContainer>
          </ButtonWrapper>
        </>
      )}
    </>
  );
}
