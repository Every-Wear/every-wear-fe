import { colors } from "@/styles/theme";
import { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

interface Props {
  selectedDate: Date | null;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
}

export default function Calendar({ selectedDate, setSelectedDate }: Props) {
  const today = new Date();
  const MONTHS = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const DAYS: any = {
    Sunday: "일",
    Monday: "월",
    Tuesday: "화",
    Wednesday: "수",
    Thursday: "목",
    Friday: "금",
    Saturday: "토",
  };
  return (
    <CustomCalendar
      showPopperArrow={false}
      open={true}
      formatWeekDay={(nameOfDay: any) =>
        nameOfDay.replace(nameOfDay, DAYS[nameOfDay])
      }
      dayClassName={(d: any) =>
        d.getDate() === selectedDate?.getDate()
          ? "selectedDay"
          : "unselectedDay"
      }
      dateFormat="yyyy.MM.dd" // 날짜 형태
      minDate={new Date(today.setDate(today.getDate() + 1))} // minDate 이전 날짜 선택 불가
      selected={selectedDate}
      onChange={(date: any) => setSelectedDate(date)}
      renderCustomHeader={({ date }: any) => (
        <div>
          <div>
            <span>{date.getFullYear()}년 </span>
            <span>{MONTHS[date.getMonth()]}</span>
          </div>
        </div>
      )}
    />
  );
}

const CustomCalendar = styled(DatePicker)`
  visibility: hidden;
  height: 0;
  padding: 0;
  width: 0;
  position: absolute;
`;
