import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { post_matching } from "@/api/modules/matching";

import {
  Layout,
  BottomButtonLayout,
  ClientButton,
  ClientText,
  MatchingFormList,
  HistoryBackButton,
} from "@/components/clientComponents";

interface FormInterface {
  title: string;
  value: string;
  setValue: (state: string) => void;
  placeHolder?: string;
}

const Voice = () => {
  const router = useRouter();

  const [currentFormIndex, setCurrentFormIndex] = useState<number>(0);
  const [time, setTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const formList: FormInterface[] = [
    {
      title: "언제 의상을 살까요?",
      value: time,
      setValue: setTime,
      placeHolder: "####년 ##월 ##일",
    },
    {
      title: "어디서 의상을 살까요?",
      value: location,
      setValue: setLocation,
      placeHolder: "지역입력 (예:강남)",
    },
    {
      title: `의상 구매 목적이 무엇인가요?`,
      value: purpose,
      setValue: setPurpose,
    },
    {
      title: "선호하는 코디네이터 성별은 무엇인가요?",
      value: gender,
      setValue: setGender,
    },
  ];

  const lastFormindex = formList.length - 1;

  const goToNextForm = () => {
    setCurrentFormIndex(currentFormIndex + 1);
  };

  const submitApplication = async () => {
    try {
      await post_matching(time, location, purpose, gender);
      router.push("/client/matching");
    } catch (err) {
      alert("신청서 제출에 실패했습니다");
      return new Error();
    }
  };

  if (currentFormIndex > lastFormindex) {
    return (
      <Layout>
        <MatchingFormList
          time={time}
          location={location}
          purpose={purpose}
          gender={gender}
        />
        <ClientButton
          bgColor="white"
          fontColor="black"
          onClickHandler={submitApplication}
          label="다음"
        >
          신청
        </ClientButton>
      </Layout>
    );
  }

  return (
    <Layout>
      {formList.map((form, idx) => (
        <div key={idx}>
          <ApplicationInputForm
            form={form}
            key={form.title}
            formIndex={idx}
            currentFormIndex={currentFormIndex}
            placeHolder={form.placeHolder}
          />
          <BottomButtonLayout>
            <ClientButton
              bgColor="white"
              fontColor="black"
              onClickHandler={goToNextForm}
              label="다음"
            >
              다음
            </ClientButton>
            <HistoryBackButton />
          </BottomButtonLayout>
        </div>
      ))}
    </Layout>
  );
};

// ------------------------------ ApplicationInputForm Comonent ---------------------------------
interface ApplicationFormInterface {
  form: FormInterface;
  formIndex?: number;
  currentFormIndex?: number;
  placeHolder: string | undefined;
}

const FormWrap = styled.div`
  width: 100%;
  padding: 50px 16px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-bottom: 250px;
`;

const ApplicationInputForm = ({
  form,
  formIndex,
  currentFormIndex,
}: ApplicationFormInterface): JSX.Element | null => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const content = transcript;

  useEffect(() => {
    if (currentFormIndex !== formIndex) return;
    form.setValue(transcript);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);

  if (currentFormIndex !== formIndex) return null;

  return (
    <FormWrap key={form.title}>
      <ClientText>{form.title}</ClientText>
      <ClientButton
        onClickHandler={SpeechRecognition.startListening}
        label="녹음하기 버튼을 클릭후 말씀해주세요"
      >
        녹음하기
      </ClientButton>
      <ClientButton
        onClickHandler={SpeechRecognition.resetTranscript}
        label="리셋하기"
      >
        리셋하기
      </ClientButton>
    </FormWrap>
  );
};

export default Voice;
