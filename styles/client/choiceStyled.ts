import styled from "styled-components";
import { clientFonts, colors } from "@/styles/theme";

export const FormWrap = styled.div`
  width: 100%;
  padding: 50px 16px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-bottom: 250px;
`;

export const ChoiceInput = styled.input`
  width: 100%;
  background-color: #303239;
  padding: 26px 24px;
  font-weight: bold;
  color: ${colors.white};
  font-size: ${clientFonts.md};

  &:focus {
    border: 2px solid ${colors.blue};
    outline: none;
  }
`;

export const ApplicationButton = styled.button`
  width: 100%;
  padding: 32px 0;
  text-align: center;
  font-weight: bold;
  font-size: ${clientFonts.md};
  color: ${colors.white};
`;

export const PurposeButtonWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 10px;
`;

export const GenderButtonWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
