import { colors } from "@/styles/theme";
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import Picker from "react-mobile-picker";

interface Props {
  selectedDate: Date | null;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
}

export default function TimePicker() {
  const [valueGroups, setValueGroups] = useState<any>({
    hour: "12",
    minutes: "00",
  });

  // 시작 시간이 선택되면 해당 시간 적용 및 isSelected를 true, endTime을 null로
  const handleChange = (name: string, value: string) => {
    setValueGroups({
      ...valueGroups,
      [name]: value,
    });
  };

  const hourArr = [];
  const minutesArr = [];

  for (let i = 1; i <= 24; i++) {
    hourArr.push(String(i));
  }

  for (let i = 0; i <= 55; i += 5) {
    minutesArr.push(String(i).padStart(2, "0"));
  }

  return (
    <Picker
      optionGroups={{
        hour: hourArr,
        minutes: minutesArr,
      }}
      itemHeight={73}
      height={253}
      valueGroups={valueGroups}
      onChange={handleChange}
    />
  );
}
