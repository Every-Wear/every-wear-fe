import { ReactElement } from "react";
import styled from "styled-components";

import { Header } from "@/components/comonComponents/index";
import { colors } from "@/styles/theme";

interface LayoutType {
  children: ReactElement;
}

const LayoutWrap = styled.div`
  background-color: ${colors.black};
  height: 100vh;
`;

export default function Layout({ children }: LayoutType) {
  return (
    <LayoutWrap>
      <Header />
      {children}
    </LayoutWrap>
  );
}
