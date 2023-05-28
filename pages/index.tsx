import { useRouter } from "next/router";
import styled from "styled-components";

const LoginButton = styled.button`
  width: 100%;
  border: 1px solid #fff;
  padding: 20px 0;
  font-size: 20px;
`;

export default function Home() {
  const router = useRouter();

  return (
    <>
      <LoginButton type="button" onClick={() => router.push("/offer")}>
        코디네이터
      </LoginButton>
      <LoginButton type="button" onClick={() => router.push("/client")}>
        시각장애인
      </LoginButton>
    </>
  );
}
