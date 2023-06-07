import React, { useState } from "react";
import { useRouter } from "next/router";
import { isAxiosError } from "axios";
import styled from "styled-components";

import { post_matching } from "@/api/modules/matching";

import {
  Layout,
  BottomButtonLayout,
  ClientButton,
  ClientText,
  MatchingFormList,
  HistoryBackButton,
  ClientSubText,
} from "@/components/clientComponents";
import {
  FormWrap,
  ChoiceInput,
  ApplicationButton,
  PurposeButtonWrap,
  GenderButtonWrap,
} from "@/styles/client/choiceStyled";

import { changeButtonText } from "@/utils/stringFormat";

import { colors } from "@/styles/theme";

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
      title: "의상 구매 목적이 무엇인가요?",
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

  const submitApplicationHandler = async () => {
    try {
      await post_matching({ time, location, purpose, gender });
      router.push("/client/matching");
    } catch (err) {
      if (isAxiosError(err)) alert(err.response?.data.error);
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
          onClickHandler={submitApplicationHandler}
          label="다음"
        >
          신청
        </ClientButton>
        <HistoryBackButton />
      </Layout>
    );
  }

  return (
    <Layout>
      {formList.map((form, idx) => {
        if (currentFormIndex !== idx) return <></>;

        const goToNextForm = () => {
          if (form.value === "") return alert("정보를 입력해주세요");
          setCurrentFormIndex(currentFormIndex + 1);
        };

        const prevNextForm = () => {
          if (currentFormIndex <= 0) return;
          setCurrentFormIndex(currentFormIndex - 1);
        };

        return (
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
                key={form.value}
                formIndex={idx}
                currentFormIndex={currentFormIndex}
                placeHolder={form.placeHolder}
              />
            )}
            <BottomButtonLayout>
              <ClientButton
                disable={form.value === ""}
                bgColor="white"
                fontColor="black"
                onClickHandler={goToNextForm}
                label="다음"
              >
                다음
              </ClientButton>
              {currentFormIndex > lastFormindex || currentFormIndex <= 0 ? (
                <HistoryBackButton />
              ) : (
                <ClientButton
                  bgColor="black"
                  fontColor="white"
                  onClickHandler={prevNextForm}
                  label="이전"
                >
                  이전 단계
                </ClientButton>
              )}
            </BottomButtonLayout>
          </div>
        );
      })}
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

// ------------------------------ ApplicationButtonForm Component ---------------------------------
interface ApplicationButtonInterface {
  value: string;
  type: boolean;
  onClickHandler: (value: string) => void;
  buttonList: string[];
}

const ApplicationButtonList = ({
  type,
  value,
  onClickHandler,
  buttonList,
}: ApplicationButtonInterface) => {
  const buttons = buttonList.map(form => {
    const onAcitve = value.split(",").includes(form);

    return (
      <ApplicationButton
        key={form}
        value={form}
        style={{ background: onAcitve ? colors.blue : colors.gray }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (buttonList.length === 2) {
            return onClickHandler(e.currentTarget.value);
          }

          let currentText = value.split(",");

          if (value.includes(e.currentTarget.value)) {
            currentText = currentText.filter(x => {
              if (x !== e.currentTarget.value) return x;
            });
          } else {
            currentText.push(e.currentTarget.value);
          }

          currentText = currentText.filter(x => {
            if (x !== "") return x;
          });

          onClickHandler(currentText.join(","));
        }}
      >
        {changeButtonText(form)}
      </ApplicationButton>
    );
  });

  return (
    <>
      {type ? (
        <PurposeButtonWrap>{buttons}</PurposeButtonWrap>
      ) : (
        <GenderButtonWrap>{buttons}</GenderButtonWrap>
      )}
    </>
  );
};

const ApplicationButtonForm = ({
  form,
  formIndex,
  currentFormIndex,
}: ApplicationFormInterface): JSX.Element | null => {
  const type: boolean = form.title === "의상 구매 목적이 무엇인가요?";

  const purpose = ["면접", "출퇴근", "결혼식", "운동복", "일상복", "파티"];
  const gender = ["man", "woman"];

  const buttonList = type ? purpose : gender;

  if (currentFormIndex !== formIndex) return null;
  return (
    <FormWrap key={form.title}>
      <ClientText>{form.title}</ClientText>
      <ClientSubText>중복선택 가능</ClientSubText>
      <ApplicationButtonList
        type={type}
        value={form.value}
        onClickHandler={form.setValue}
        buttonList={buttonList}
      />
    </FormWrap>
  );
};

export default Choice;
