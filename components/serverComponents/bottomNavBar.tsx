import { colors } from "@/styles/theme";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import HomeIcon from "./homeIcon";
import CurrentStatusIcon from "./currentStatusIcon";
import MyPageIcon from "./myPageIcon";
import { ColorInterface } from "@/types/serverType";

export default function BottomNavBar() {
  const router = useRouter();

  const [pathName, setPathName] = useState<string>("server");

  useEffect(() => {
    const currentPath = router.pathname.split("/");
    if (!currentPath) return;
    if (currentPath.includes("currentStatus"))
      return setPathName("currentStatus");
    if (currentPath.includes("mypage")) return setPathName("mypage");
    else setPathName("server");
  }, [router.pathname]);

  const changeColor = (navTitle: string): string => {
    return pathName === navTitle ? colors.blue : colors.gray100;
  };

  const NavContainer = styled.nav`
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-evenly;
    position: fixed;
    bottom: 10px;
    padding-top: 10px;
    background-color: ${colors.black};
    border-top: 1px solid ${colors.gray};
    z-index: 99;
  `;

  const NavButton = styled.button<{ props: ColorInterface }>`
    width: 100%;
    color: ${(props: ColorInterface) => props.color};
    border: 0;
    background-color: ${colors.black};
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    gap: 4px;
    font-size: 10px;
  `;

  return (
    <NavContainer>
      <NavButton
        color={changeColor("server")}
        onClick={() => router.push("/server")}
      >
        <HomeIcon color={changeColor("server")} />홈
      </NavButton>
      <NavButton
        color={changeColor("currentStatus")}
        onClick={() => router.push("/server/currentStatus")}
      >
        <CurrentStatusIcon color={changeColor("currentStatus")} />
        매칭현황
      </NavButton>
      <NavButton
        color={changeColor("mypage")}
        onClick={() => router.push("/server/mypage")}
      >
        <MyPageIcon color={changeColor("mypage")} />
        매칭내역
      </NavButton>
    </NavContainer>
  );
}
