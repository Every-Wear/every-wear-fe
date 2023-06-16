import { colors, serverFonts } from "@/styles/theme";
import styled from "styled-components";

interface ModalType {
  title: string;
  message: string[];
  confirmHandler: () => void;
  cancelHandler: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 20;
`;

const ModalInner = styled.div`
  width: 100%;
  padding-top: 24px;
  text-align: center;
  background-color: ${colors.white};
  border-radius: 2px;
`;

const ModalTitle = styled.p`
  width: 100%;
  color: ${colors.black};
  font-size: ${serverFonts.lg};
  font-weight: bold;
  margin-bottom: 10px;
`;

const ModalSubText = styled.p`
  width: 100%;
  color: #52575c;
  font-size: ${serverFonts.sm};
  margin-top: 5px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: grid;
  margin-top: 16px;
  grid-template-columns: 1fr 1fr;
`;

const ModalButton = styled.button`
  width: 100%;
  font-size: ${serverFonts.md};
  padding: 12px 24px;
  font-weight: 700;
  background-color: ${(props: { type: string }) =>
    props.type === "confirm" ? colors.yellow : colors.gray300};
  color: ${colors.black};
`;

export default function Modal({
  title,
  message,
  confirmHandler,
  cancelHandler,
  confirmText = "확인",
  cancelText = "취소",
}: ModalType) {
  return (
    <ModalWrapper onClick={cancelHandler}>
      <ModalInner>
        <ModalTitle>{title}</ModalTitle>
        {message.map(text => (
          <ModalSubText key={text}>{text}</ModalSubText>
        ))}
        <ButtonWrapper>
          <ModalButton onClick={cancelHandler}>{cancelText}</ModalButton>
          <ModalButton type="confirm" onClick={confirmHandler}>
            {confirmText}
          </ModalButton>
        </ButtonWrapper>
      </ModalInner>
    </ModalWrapper>
  );
}
