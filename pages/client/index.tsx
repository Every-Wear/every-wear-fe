import { useRouter } from "next/router";
import styled from "styled-components";

const NavButton = styled.button`
  width: 100%;
  border: 1px solid #fff;
  padding: 20px 0;
  font-size: 20px;
`;

export const Client = () => {
  const router = useRouter();

  return (
    <>
      <nav>
        <NavButton
          type="button"
          onClick={() => router.push("/client/application")}
        >
          매칭신청
        </NavButton>
        <NavButton
          type="button"
          onClick={() => router.push("/client/matching")}
        >
          매칭현황
        </NavButton>
        <NavButton type="button" onClick={() => router.push("/client/mypage")}>
          마이페이지
        </NavButton>
      </nav>
    </>
  );
};

export default Client;
