import { useState } from "react";
import { useRouter } from "next/router";

import { ApplticionButton, CustomInput, FormBox } from "./index.styled";

export const Application = () => {
  const router = useRouter();

  const [currentStauts, setCurrentStauts] = useState<number>(0);
  const [time, setTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [usage, setUsage] = useState<string>("");

  const formList = [
    { title: "날짜", inputType: "date", value: time, setValue: setTime },
    {
      title: "장소",
      inputType: "text",
      value: location,
      setValue: setLocation,
    },
    { title: "목적", inputType: "text", value: usage, setValue: setUsage },
  ];

  const nextForm = (state: number) => {
    if (state === 2) return;
    setCurrentStauts(state + 1);
  };

  const submitApplication = (time: string, location: string, usage: string) => {
    alert(`신청 API호출 시간 : ${time} / 지역 : ${location} / 용도 : ${usage}`);
    router.push("/client/matching");
  };

  return (
    <FormBox>
      {formList.map((x, idx) => {
        if (currentStauts !== idx) return;
        return (
          <section key={idx}>
            <h2>{x.title}를 입력해주세요</h2>
            <CustomInput
              type={x.inputType}
              value={x.value}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                x.setValue(e.currentTarget.value)
              }
            />
          </section>
        );
      })}
      <ApplticionButton
        onClick={() =>
          currentStauts > 1
            ? submitApplication(time, location, usage)
            : nextForm(currentStauts)
        }
      >
        {currentStauts > 1 ? "신청" : "다음"}
      </ApplticionButton>
    </FormBox>
  );
};

export default Application;
