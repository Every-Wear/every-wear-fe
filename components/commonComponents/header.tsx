import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";

import { colors } from "@/styles/theme";

const HeaderWrap = styled.header`
  width: 100%;
  background: ${colors.blue};
  position: fixed;
  top: 0;
  left: 0;
  height: 110px;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.h1`
  text-align: center;
  line-height: 0;
`;

const Header = () => {
  const router = useRouter();

  return (
    <HeaderWrap>
      <Logo>
        <Image
          onClick={() => router.push("/client")}
          src={"/assets/logo.svg"}
          alt="에브리웨어"
          width={256}
          height={24}
          aria-label="안녕하세요 에브리웨어입니다. 홈으로 되돌아 가시려면 클릭해주세요."
        />
      </Logo>
    </HeaderWrap>
  );
};

export default Header;
