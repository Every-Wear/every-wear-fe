import { useRouter } from "next/router";
import { isAxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

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
    <Layout>
      <IntroLabel labelText="모두를 위한 코디네이터 매칭 플랫폼 에브리웨어 입니다 아이디와 비밀번호를 입력후 제출해주세요" />
      <LoginWrap onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>아이디</label>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            {...register("id")}
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            {...register("password")}
          />
        </div>
        <input id="submit-button" type="submit" />
      </LoginWrap>
    </Layout>
  );
}
