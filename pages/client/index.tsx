import { useRouter } from "next/router";

import {
  Layout,
  ClientButton,
  IntroLabel,
  BottomButtonLayout,
  ClientText,
} from "@/components/clientComponents/index";

import { ClientButtonInterface } from "@/types/clientType";

const Client = () => {
  const router = useRouter();

  const clientPageButtonList: ClientButtonInterface[] = [
    {
      title: "코디 신청",
      onClick: () => router.push("/client/application"),
      label: "코디네이터 매칭 신청페이지 이동 버튼",
    },
    {
      title: "매칭 현황",
      onClick: () => router.push("/client/matching"),
      label: "코디네이터 매칭현황 확인 페이지 이동 버튼",
    },
    {
      title: "매칭 내역",
      onClick: () => router.push("/client/mypage"),
      label: "매칭 내역 이동 버튼",
    },
  ];

  return (
    <Layout>
      <IntroLabel labelText="에브리웨어 메인페이지입니다. 버튼을 통해 원하시는 페이지로 이동해주세요" />
      <div style={{ marginTop: "100px" }}>
        <ClientText
          center
          label="안녕하세요 에브리웨어 메인페이지입니다. 버튼을 통해 원하시는 페이지로 이동해주세요"
        >
          안녕하세요 <br />
          에브리웨어입니다
        </ClientText>
      </div>
      <BottomButtonLayout>
        {clientPageButtonList.map(button => (
          <ClientButton
            border={true}
            bgColor="black"
            key={button.title}
            onClickHandler={button.onClick}
            label={button.label}
          >
            {button.title}
          </ClientButton>
        ))}
      </BottomButtonLayout>
    </Layout>
  );
};

export default Client;
