import { MemoTextarea, TextLength } from "@/styles/server/serverStyled";

interface Props {
  textValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MemoText({ textValue, onChange }: Props) {
  return (
    <>
      <MemoTextarea
        type="text"
        defaultValue={textValue}
        placeholder="메모를 입력해주세요"
        onChange={onChange}
      />
      <TextLength>{textValue.length}/1000</TextLength>
    </>
  );
}
