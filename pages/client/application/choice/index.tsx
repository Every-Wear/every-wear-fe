import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import { post_matching } from "@/api/modules/matching";

import {
  Layout,
  BottomButtonLayout,
  ClientButton,
  ClientText,
  MatchingFormList,
} from "@/components/clientComponents";

import { clientFonts, colors } from "@/styles/theme";

interface FormInterface {
  title: string;
  value: string;
  setValue: (state: string) => void;
  placeHolder?: string;
}

const Choice = () => {
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
      alert(
        `신청 API호출 시간 : ${time} / 지역 : ${location} / 용도 : ${purpose} / 코디성별 : ${gender}`,
      );
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
          {form.placeHolder ? (
            <ApplicationInputForm
              form={form}
              key={form.title}
              formIndex={idx}
              currentFormIndex={currentFormIndex}
              placeHolder={form.placeHolder}
            />
          ) : (
            <ApplicationButtonForm
              form={form}
              key={form.title}
              formIndex={idx}
              currentFormIndex={currentFormIndex}
              placeHolder={form.placeHolder}
            />
          )}
          <BottomButtonLayout>
            <ClientButton
              bgColor="white"
              fontColor="black"
              onClickHandler={goToNextForm}
              label="다음"
            >
              다음
            </ClientButton>
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
  padding-bottom: 150px;
`;

const ChoiceInput = styled.input`
  width: 100%;
  background-color: #303239;
  padding: 26px 24px;
  font-weight: bold;
  color: ${colors.white};
  font-size: ${clientFonts.md};

  &:focus {
    border: 2px solid ${colors.blue};
    outline: none;
  }
`;

const ApplicationInputForm = ({
  form,
  formIndex,
  currentFormIndex,
  placeHolder = "입력",
}: ApplicationFormInterface): JSX.Element | null => {
  if (currentFormIndex !== formIndex) return null;
  return (
    <FormWrap key={form.title}>
      <ClientText>{form.title}</ClientText>
      <ChoiceInput
        type="text"
        value={form.value}
        placeholder={placeHolder}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          form.setValue(e.currentTarget.value)
        }
      />
    </FormWrap>
  );
};

// ------------------------------ ApplicationButtonForm Comonent ---------------------------------
interface ApplicationButtonInterface {
  value: string;
  onClickHandler: (value: string) => void;
}
const ApplicationButton = styled.button`
  width: 100%;
  padding: 32px 0;
  text-align: center;
  font-weight: bold;
  font-size: ${clientFonts.md};
  color: ${colors.white};
`;

const PurposeButtonWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 10px;
`;

const GenderButtonWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PurposeButton = ({
  value,
  onClickHandler,
}: ApplicationButtonInterface) => {
  const purposeList = ["면접", "출퇴근", "결혼식", "운동복", "일상복", "파티"];

  return (
    <PurposeButtonWrap>
      {purposeList.map(form => {
        const onAcitve = value === form;

        return (
          <ApplicationButton
            key={form}
            value={form}
            style={{ background: onAcitve ? colors.blue : colors.gray }}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              onClickHandler(e.currentTarget.value);
            }}
          >
            {form}
          </ApplicationButton>
        );
      })}
    </PurposeButtonWrap>
  );
};

const GenderButton = ({
  value,
  onClickHandler,
}: ApplicationButtonInterface) => {
  const genderList = ["man", "woman"];

  return (
    <GenderButtonWrap>
      {genderList.map(form => {
        const onAcitve = value === form;

        return (
          <ApplicationButton
            key={form}
            value={form}
            style={{ background: onAcitve ? colors.blue : colors.gray }}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              onClickHandler(e.currentTarget.value);
            }}
          >
            {form}
          </ApplicationButton>
        );
      })}
    </GenderButtonWrap>
  );
};

const ApplicationButtonForm = ({
  form,
  formIndex,
  currentFormIndex,
}: ApplicationFormInterface): JSX.Element | null => {
  const purpose: boolean = form.title === "의상 구매 목적이 무엇인가요?";

  if (currentFormIndex !== formIndex) return null;
  return (
    <FormWrap key={form.title}>
      <ClientText>{form.title}</ClientText>
      {purpose ? (
        <PurposeButton value={form.value} onClickHandler={form.setValue} />
      ) : (
        <GenderButton value={form.value} onClickHandler={form.setValue} />
      )}
    </FormWrap>
  );
};

export default Choice;
