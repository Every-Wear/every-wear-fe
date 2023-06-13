import { useRouter } from "next/router";
import { isAxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import Image from "next/image";

import { post_login } from "@/api/modules/user";
import { Layout, IntroLabel } from "@/components/clientComponents";
import { setCookie } from "@/utils/cookie";
import { clientFonts, colors } from "@/styles/theme";

export type FormValues = {
  id: string;
  password: string;
};

const LoginWrap = styled.form`
  width: 100%;
  padding: 32px 16px;

  div {
    margin-bottom: 30px;
  }

  label {
    display: block;
    width: 100%;
    color: ${colors.white};
    font-size: ${clientFonts.md};
  }

  input {
    width: 100%;
    background-color: #303239;
    padding: 16px 14px;
    font-weight: bold;
    color: ${colors.white};
    font-size: ${clientFonts.md};

    &:focus {
      border: 2px solid ${colors.blue};
      outline: none;
    }
  }

  #submit-button {
    display: block;
    width: 100%;
  }
`;

const Splash = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${colors.blue};
  z-index: 99;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ripple 450ms ease-in-out;
  animation-delay: 500ms;
  animation-fill-mode: forwards;

  @keyframes ripple {
    to {
      transform: translateX(100%);
    }
  }
`;

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async userInfo => {
    try {
      const { data } = await post_login(userInfo);

      setCookie("token", data.data.token, 7);
      setCookie("refToken", data.data.refToken, 7);
      setCookie("userName", userInfo.id, 7);
      setCookie("userType", data.data.userType, 7);

      if (data.data.userType === "server") {
        router.push("/server");
      }
      if (data.data.userType === "client") {
        router.push("/client");
      }
    } catch (err) {
      if (isAxiosError(err)) {
        alert(err.response?.data.error);
      }
    }
  };

  return (
    <div>
      <Splash>
        <Image
          src={"/assets/logo.svg"}
          alt="에브리웨어"
          width={201}
          height={30}
          aria-label="안녕하세요 에브리웨어입니다."
        />
      </Splash>
      <Layout>
        <IntroLabel labelText="모두를 위한 코디네이터 매칭 플랫폼 에브리웨어 입니다 아이디와 비밀번호를 입력후 제출해주세요" />
        <LoginWrap onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label aria-label="아래 수정창에 아이디를 입력해주세요">
              아이디
            </label>
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              aria-label="아이디를 입력후 아래 비밀번호를 입력해주세요"
              {...register("id")}
            />
          </div>
          <div>
            <label aria-label="아래 수정창에 비밀번호를 입력해주세요">
              비밀번호
            </label>
            <input
              type="password"
              aria-label="비밀번호를 입력후 아래 제출버튼을 통해 로그인을 해주세요"
              placeholder="비밀번호를 입력하세요"
              {...register("password")}
            />
          </div>
          <input
            id="submit-button"
            type="submit"
            aria-label="버튼을 클릭해 로그인을 해주세요"
          />
        </LoginWrap>
      </Layout>
    </div>
  );
}
