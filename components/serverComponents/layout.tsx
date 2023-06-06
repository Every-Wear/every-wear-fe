import { ReactElement } from "react";
import styled from "styled-components";
import BottomNavBar from "./bottomNavBar";
import { Header } from "../commonComponents";
import { colors } from "@/styles/theme";

interface LayoutType {
  children: ReactElement | ReactElement[];
}

const LayoutWrapper = styled.div`
  background-color: ${colors.black};
  padding-top: 110px;
  min-height: calc(100vh - 110px);
  height: 100%;
  padding-bottom: 70px;
`;

export default function Layout({ children }: LayoutType) {
  return (
    <>
      <Header />
      <LayoutWrapper>
        {children}
        <BottomNavBar />
      </LayoutWrapper>
    </>
  );
}
