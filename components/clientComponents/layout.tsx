import { ReactElement } from "react";
import styled from "styled-components";

import { Header } from "@/components/commonComponents/index";
import { colors } from "@/styles/theme";

interface LayoutType {
  children: ReactElement | ReactElement[];
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
