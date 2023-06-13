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
  height: 100vh;
  height: -webkit-fill-available;
  height: fill-available;
`;

export default function Layout({ children }: LayoutType) {
  return (
    <>
      <Header />
      <LayoutWrap>{children}</LayoutWrap>
    </>
  );
}
