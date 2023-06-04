import styled from "styled-components";

export const MatchingProgressTitleWrap = styled.section`
  width: 100%;
  padding: 50px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 8px solid #2c2c2c;
`;

export const QRcodeBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 44px;
`;

export const MatchingInfoListWrap = styled.section`
  width: 100%;
`;

export const InfoText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px 16px;
  gap: 5px;

  &:not(:last-child) {
    border-bottom: 1px solid #b3b3b3;
  }
`;
