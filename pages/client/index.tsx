import { useRouter } from "next/router";
import styled from "styled-components";

import {
  Layout,
  ClientButton,
  IntroLabel,
} from "@/components/clientComponents/index";

const MainPageGnb = styled.nav`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const Client = () => {
  const router = useRouter();

  const goToPage = (route: string) => {
    router.push(route);
  };

  const navButtonList = [
    { title: "매칭신청", onClick: () => goToPage("/client/application") },
    { title: "매칭현황", onClick: () => goToPage("/client/matching") },
    { title: "마이페이지", onClick: () => goToPage("/client/mypage") },
  ];

  return (
    <Layout>
      <IntroLabel labelText="페이지 로딩이 완료되었습니다. 버튼을 통해 원하시는 페이지로 이동해주세요" />
      <MainPageGnb>
        {navButtonList.map(button => (
          <ClientButton
            border={true}
            bgColor="black"
            key={button.title}
            onClickHandler={button.onClick}
          >
            {button.title}
          </ClientButton>
        ))}
      </MainPageGnb>
    </Layout>
  );
};

export default Client;
