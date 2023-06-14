import { colors, serverFonts } from "../theme";
import styled from "styled-components";

export const BadgeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin: ${(props: { margin: string }) => (props.margin ? props.margin : "0")};
`;

export const NewBadge = styled.div<{ size?: string }>`
  background: #ffc700;
  color: ${colors.black};
  font-size: ${(props: { size: string }) => (props.size === "sm" ? 5 : 12)}px;
  font-weight: 500;
  padding: 3px 8px;
  line-height: 1.5;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

export const MatchingBadge = styled(NewBadge)`
  background: #3290ff;
  font-size: ${(props: { size: string }) => (props.size === "sm" ? 8 : 12)}px;
  color: ${colors.white};
`;

export const DetailWrapper = styled.div`
  padding-bottom: 80px;
  > hr.bold {
    border: 4px solid ${colors.gray};
  }
  > hr {
    border: 1px solid ${colors.gray100};
  }
`;

export const DetailTitle = styled.div`
  margin: 24px 16px 8px 16px;
  display: flex;
  justify-content: space-between;
  font-size: ${serverFonts.sm};
  color: ${colors.gray100};
`;

export const DetailText = styled.div`
  color: ${colors.white};
  font-weight: ${colors.white};
  font-size: 16px;
  font-weight: bold;
  margin: 0px 16px 24px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MemoTextarea = styled.textarea`
  width: calc(100% - 48px);
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto 0px auto;
  height: 354px;
  resize: none;
  background-color: transparent;
  border-radius: 4px;
  padding: 13px;
  color: ${colors.white};
`;

export const TextLength = styled.div`
  width: calc(100% - 48px);
  text-align: right;
  margin: 8px auto;
  color: ${colors.gray100};
  margin-bottom: 120px;
  font-size: ${serverFonts.sm};
`;

export const NoMatchingListTitle = styled.div`
  color: ${colors.gray200};
  font-size: ${serverFonts.md};
  text-align: center;
`;
