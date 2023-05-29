import { useState } from "react";
import { useRouter } from "next/router";

import { HistoryBackButton } from "@/clientComponents";
import {
  ApplicationPage,
  ApplicationButton,
  CustomInput,
} from "@/pages/client/application/index.styled";

type StatusType = "날짜" | "장소" | "목적";
type FormType = "date" | "text";

interface FromInterface {
  title: StatusType;
  inputType: FormType;
  value: string;
  setValue: (state: string) => void;
}

const Application = () => {
  const router = useRouter();

  const [isCurrentFormIndex, setIsCurrentFormIndex] = useState<number>(0);
  const [time, setTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [usage, setUsage] = useState<string>("");

  const formList: FromInterface[] = [
    {
      title: "날짜",
      inputType: "date",
      value: time,
      setValue: setTime,
    },
    {
      title: "장소",
      inputType: "text",
      value: location,
      setValue: setLocation,
    },
    {
      title: "목적",
      inputType: "text",
      value: usage,
      setValue: setUsage,
    },
  ];

  const lastFormindex = formList.length - 1;

  const nextForm = (status: number) => {
    setIsCurrentFormIndex(status + 1);
  };

  const submitApplication = (time: string, location: string, usage: string) => {
    alert(`신청 API호출 시간 : ${time} / 지역 : ${location} / 용도 : ${usage}`);
    router.push("/client/matching");
  };

  const submitButtonHandler = (currentIndex: number) => {
    if (currentIndex === lastFormindex) {
      submitApplication(time, location, usage);
    } else {
      nextForm(currentIndex);
    }
  };

  return (
    <ApplicationPage>
      {formList.map((form, idx) => {
        return (
          <AplicationForm
            form={form}
            key={form.title}
            formIndex={idx}
            lastFormIndex={formList.length - 1}
            currentFormIndex={isCurrentFormIndex}
            buttonHandler={submitButtonHandler}
          />
        );
      })}
      <HistoryBackButton />
    </ApplicationPage>
  );
};

// ------------------------------ AplicationForm Comonent ---------------------------------
interface AplicationFormInterface {
  form: FromInterface;
  formIndex: number;
  lastFormIndex: number;
  currentFormIndex: number;
  buttonHandler: (index: number) => void;
}

const AplicationForm = ({
  form,
  formIndex,
  lastFormIndex,
  currentFormIndex,
  buttonHandler,
}: AplicationFormInterface): JSX.Element | null => {
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
