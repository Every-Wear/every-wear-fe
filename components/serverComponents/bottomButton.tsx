import styled from "styled-components";
import { colors } from "@/styles/theme";
import { ColorInterface } from "@/types/serverType";

const ButtonWrapper = styled.div<{ color: string }>`
  height: 64px;
  width: 100%;
  display: flex;
`;

const ButtonContainer = styled.button`
  background-color: ${(props: ColorInterface) =>
    props.color ? props.color : colors.white};
  color: ${colors.black};
  height: 64px;
  width: 100%;
  position: fixed;
  bottom: 0;
  font-size: 18px;
  font-weight: bold;
  filter: ${(props: { disabled: boolean }) =>
    props.disabled ? `brightness(1.9)` : `brightness(1)`};
`;

export default function BottomButton({ type, color, text, disabled }: any) {
  return (
    <>
      {type === "oneButton" ? (
        <ButtonContainer color={color} disabled={disabled}>
          {text}
        </ButtonContainer>
      ) : (
        <>
          <ButtonWrapper></ButtonWrapper>
        </>
      )}
    </>
  );
}
