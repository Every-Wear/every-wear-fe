import { ReactElement } from "react";
import styled from "styled-components";
import BottomNavBar from "./bottomNavBar";
import { Header } from "../commonComponents";
import { colors } from "@/styles/theme";
import BottomButton from "./bottomButton";

interface LayoutType {
  children: ReactElement | ReactElement[];
  noNavBar?: boolean;
  noPadding?: boolean;
}

const LayoutWrapper = styled.div`
  background-color: ${colors.black};
  padding-top: 110px;
  min-height: calc(100vh - 110px);
  height: 100%;
  padding-bottom: ${(props: { noPadding?: boolean }) =>
    props.noPadding ? "0px" : "70px"};
`;

export default function Layout({ children, noNavBar, noPadding }: LayoutType) {
  return (
    <LayoutWrapper noPadding={noPadding}>
      <Header />
      {children}
      {!noNavBar && <BottomNavBar />}
    </LayoutWrapper>
  );
}
