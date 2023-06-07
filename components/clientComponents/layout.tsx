import { ReactElement } from "react";
import styled from "styled-components";

import { Header } from "@/components/commonComponents/index";
import { colors } from "@/styles/theme";

interface LayoutType {
  children: ReactElement | ReactElement[];
}

const LayoutWrap = styled.div`
  background-color: ${colors.black};
  padding-top: 110px;
  min-height: calc(100vh - 110px);
  height: 100%;
`;

export default function Layout({ children }: LayoutType) {
  return (
    <>
      <Header />
      <LayoutWrap>{children}</LayoutWrap>
    </>
  );
}
