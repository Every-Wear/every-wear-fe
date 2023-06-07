import styled from "styled-components";
import Image from "next/image";

import { colors } from "@/styles/theme";

const HeaderWrap = styled.header`
  width: 100%;
  background: ${colors.blue};
  padding: 55px 0 20px 0;
  position: fixed;
  top: 0;
  left: 0;
  max-height: 110px;
  z-index: 10;
`;

const Logo = styled.h1`
  text-align: center;
`;

const Header = () => {
  return (
    <HeaderWrap>
      <Logo>
        <Image
          src={"/assets/logo.svg"}
          alt="에브리웨어"
          width={151}
          height={20}
          aria-label="안녕하세요 에브리웨어입니다."
        />
      </Logo>
    </HeaderWrap>
  );
};

export default Header;
