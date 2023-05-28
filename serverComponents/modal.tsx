import styled from "styled-components";

interface ModalType {
  message: string;
  confirmHandler: () => void;
  cancelHandler: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function Modal({
  message,
  confirmHandler,
  cancelHandler,
  confirmText = "확인",
  cancelText = "취소",
}: ModalType) {
  return (
    <div>
      {message}
      <button onClick={confirmHandler}>{confirmText}</button>
      <button onClick={cancelHandler}>{cancelText}</button>
    </div>
  );
}
