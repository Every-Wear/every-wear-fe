import { useState } from "react";
import { useRouter } from "next/router";

import { HistoryBackButton } from "@/clientComponents";
import {
  ApplicationPage,
  ApplicationButton,
  CustomInput,
} from "@/pages/client/application/index.styled";

const STATUS_TYPE = {
  날짜: "날짜",
  장소: "장소",
  목적: "목적",
} as const;
type StatusType = keyof typeof STATUS_TYPE;

const FORM_TYPE = {
  date: "date",
  text: "text",
} as const;
type FormType = keyof typeof FORM_TYPE;

interface FormInterface {
  title: StatusType;
  inputType: FormType;
  value: string;
  setValue: (state: string) => void;
}

const Application = () => {
  const router = useRouter();

  const [currentFormIndex, setCurrentFormIndex] = useState<number>(0);
  const [time, setTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [usage, setUsage] = useState<string>("");

  const formList: FormInterface[] = [
    {
      title: STATUS_TYPE["날짜"],
      inputType: FORM_TYPE["date"],
      value: time,
      setValue: setTime,
    },
    {
      title: STATUS_TYPE["장소"],
      inputType: FORM_TYPE["text"],
      value: location,
      setValue: setLocation,
    },
    {
      title: STATUS_TYPE["목적"],
      inputType: FORM_TYPE["text"],
      value: usage,
      setValue: setUsage,
    },
  ];

  const lastFormindex = formList.length - 1;

  const goToNextForm = (status: number) => {
    setCurrentFormIndex(status + 1);
  };

  const submitApplication = (time: string, location: string, usage: string) => {
    alert(`신청 API호출 시간 : ${time} / 지역 : ${location} / 용도 : ${usage}`);
    router.push("/client/matching");
  };

  const submitButtonHandler = (currentIndex: number) => {
    if (currentIndex === lastFormindex) {
      submitApplication(time, location, usage);
    } else {
      goToNextForm(currentIndex);
    }
  };

  return (
    <ApplicationPage>
      {formList.map((form, idx) => {
        return (
          <ApplicationForm
            form={form}
            key={form.title}
            formIndex={idx}
            lastFormIndex={formList.length - 1}
            currentFormIndex={currentFormIndex}
            buttonHandler={submitButtonHandler}
          />
        );
      })}
      <HistoryBackButton />
    </ApplicationPage>
  );
};

// ------------------------------ ApplicationForm Comonent ---------------------------------
interface ApplicationFormInterface {
  form: FormInterface;
  formIndex: number;
  lastFormIndex: number;
  currentFormIndex: number;
  buttonHandler: (index: number) => void;
}

const ApplicationForm = ({
  form,
  formIndex,
  lastFormIndex,
  currentFormIndex,
  buttonHandler,
}: ApplicationFormInterface): JSX.Element | null => {
  const AplicationButtonText =
    currentFormIndex === lastFormIndex ? "신청" : "다음";

  if (currentFormIndex !== formIndex) return null;
  return (
    <div key={form.title}>
      <h2>{form.title}를 입력해주세요</h2>
      <CustomInput
        type={form.inputType}
        value={form.value}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          form.setValue(e.currentTarget.value)
        }
      />
      <ApplicationButton onClick={() => buttonHandler(currentFormIndex)}>
        {AplicationButtonText}
      </ApplicationButton>
    </div>
  );
};

export default Application;
