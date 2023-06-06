import { ReactElement } from "react";
import styled from "styled-components";
import BottomNavBar from "./bottomNavBar";
import { Header } from "../commonComponents";
import { colors } from "@/styles/theme";

interface LayoutType {
  children: ReactElement | ReactElement[];
}

const LayoutWrapper = styled.div`
  /* background-color: ${colors.black}; */
  height: 100vh;
`;

export default function Layout({ children }: LayoutType) {
  return (
    <LayoutWrapper>
      <Header />
      {children}
      <BottomNavBar />
    </LayoutWrapper>
  );
}
