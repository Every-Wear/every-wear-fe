import { colors } from "@/styles/theme";
import styled from "styled-components";
import Picker from "react-mobile-picker";

interface Props {
  valueGroups: {
    hour: string;
    minutes: string;
  };
  handleChange: (name: string, value: string) => void;
}

export default function TimePicker({ valueGroups, handleChange }: Props) {
  const hourArr = [];
  const minutesArr = [];

  for (let i = 1; i <= 24; i++) {
    hourArr.push(String(i));
  }

  for (let i = 0; i <= 55; i += 5) {
    minutesArr.push(String(i).padStart(2, "0"));
  }

  const TimePickerWrapper = styled.div`
    position: relative;
  `;

  const Contour = styled.div`
    color: ${colors.white};
    font-size: 50px;
    font-weight: bold;
    position: absolute;
    top: 90px;
    left: 49%;
    font-family: serif;
  `;
  return (
    <TimePickerWrapper>
      <Picker
        optionGroups={{
          hour: hourArr,
          minutes: minutesArr,
        }}
        itemHeight={90}
        height={253}
        valueGroups={valueGroups}
        onChange={handleChange}
      ></Picker>
      <Contour>:</Contour>
    </TimePickerWrapper>
  );
}
