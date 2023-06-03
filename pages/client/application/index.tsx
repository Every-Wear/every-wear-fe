import { useRouter } from "next/router";

import {
  Layout,
  BottomButtonLayout,
  ClientButton,
  IntroLabel,
} from "@/components/clientComponents/index";

import { ColorType } from "@/styles/styledType";

const Application = () => {
  const router = useRouter();

  const clientPageButtonList: {
    title: string;
    goToPage: () => void;
    label: string;
    bgColor: keyof ColorType;
  }[] = [
    {
      title: "음성 인식",
      goToPage: () => router.push("/client/application/voice"),
      label: "음성인식을 통한 코디네이터 매칭 신청 페이지 이동",
      bgColor: "yellow",
    },
    {
      title: "직접 입력",
      goToPage: () => router.push("/client/application/choice"),
      label: "직접 입력을 통한 코디네이터 매칭 신청 페이지 이동",
      bgColor: "white",
    },
  ];

  return (
    <Layout>
      <IntroLabel labelText="코디네이터 매칭 신청 방법을 아래 버튼을 통해 음성인식 또는 직접 입력 페이지로 이동" />
      <BottomButtonLayout>
        {clientPageButtonList.map(button => (
          <ClientButton
            bgColor={button.bgColor}
            key={button.title}
            onClickHandler={button.goToPage}
            label={button.label}
            fontColor="black"
          >
            {button.title}
          </ClientButton>
        ))}
      </BottomButtonLayout>
    </Layout>
  );
};

export default Application;
