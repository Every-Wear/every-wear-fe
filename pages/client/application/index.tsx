import { useState } from "react";
import { useRouter } from "next/router";

import { ApplicationButton, CustomInput, FormBox } from "./index.styled";

export const Application = () => {
  const router = useRouter();

  type StatusType = "날짜" | "장소" | "목적";
  type FormType = "date" | "text";

  interface FromInterface {
    title: StatusType;
    inputType: FormType;
    value: string;
    setValue: (state: string) => void;
  }

  const [currentStatus, setCurrentStatus] = useState<StatusType>("날짜");
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

  const nextForm = (status: StatusType) => {
    setCurrentStatus(status);
  };

  const submitApplication = (time: string, location: string, usage: string) => {
    alert(`신청 API호출 시간 : ${time} / 지역 : ${location} / 용도 : ${usage}`);
    router.push("/client/matching");
  };

  return (
    <FormBox>
      {formList.map((form, idx) => {
        if (currentStatus !== form.title) return;
        return (
          <section key={idx}>
            <h2>{form.title}를 입력해주세요</h2>
            <CustomInput
              type={form.inputType}
              value={form.value}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                form.setValue(e.currentTarget.value)
              }
            />
            <ApplicationButton
              onClick={() =>
                currentStatus === "목적"
                  ? submitApplication(time, location, usage)
                  : nextForm(formList[idx + 1].title)
              }
            >
              {currentStatus === "목적" ? "신청" : "다음"}
            </ApplicationButton>
          </section>
        );
      })}
    </FormBox>
  );
};

export default Application;
