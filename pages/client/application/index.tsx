import { useRouter } from "next/router";

import {
  Layout,
  BottomButtonLayout,
  ClientButton,
  IntroLabel,
  ClientText,
  HistoryBackButton,
} from "@/components/clientComponents/index";

import { ClientButtonInterface } from "@/types/clientType";

const Application = () => {
  const router = useRouter();

  const clientPageButtonList: ClientButtonInterface[] = [
    {
      title: "음성 인식",
      onClick: () => router.push("/client/application/voice"),
      label: "음성인식을 통한 코디네이터 매칭 신청 페이지 이동",
      bgColor: "yellow",
    },
    {
      title: "직접 입력",
      onClick: () => router.push("/client/application/choice"),
      label: "직접 입력을 통한 코디네이터 매칭 신청 페이지 이동",
      bgColor: "white",
    },
  ];

  return (
    <Layout>
      <div style={{ marginTop: "100px" }}>
        <ClientText center>
          매칭방법을 <br />
          선택해주세요
        </ClientText>
      </div>
      <IntroLabel labelText="코디네이터 매칭 신청 방법을 아래 버튼을 통해 음성인식 또는 직접 입력 페이지로 이동해주세요" />
      <BottomButtonLayout>
        <div>
          {clientPageButtonList.map(button => (
            <ClientButton
              bgColor={button.bgColor}
              key={button.title}
              onClickHandler={button.onClick}
              label={button.label}
              fontColor="black"
            >
              {button.title}
            </ClientButton>
          ))}
        </div>
        <HistoryBackButton />
      </BottomButtonLayout>
    </Layout>
  );
};

export default Application;
