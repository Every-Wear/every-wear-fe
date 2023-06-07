import { ReactElement } from "react";
import styled from "styled-components";
import BottomNavBar from "./bottomNavBar";
import { Header } from "../commonComponents";
import { colors } from "@/styles/theme";
import BottomButton from "./bottomButton";

interface LayoutType {
  children: ReactElement | ReactElement[];
  noNavBar?: boolean;
}

const LayoutWrapper = styled.div`
  /* background-color: ${colors.black}; */
  height: 100vh;
`;

export default function Layout({ children, noNavBar }: LayoutType) {
  return (
    <LayoutWrapper>
      <Header />
      {children}
      {!noNavBar && <BottomNavBar />}
    </LayoutWrapper>
  );
}
