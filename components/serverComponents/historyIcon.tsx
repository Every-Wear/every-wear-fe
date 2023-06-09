import { ColorInterface } from "@/types/serverType";

export default function HistoryIcon({ color }: ColorInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="24"
      fill="none"
      viewBox="0 0 30 24"
    >
      <path
        fill={color}
        d="M16 0H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm-5 14H4v-2h7v2zm3-4H4V8h10v2zm0-4H4V4h10v2z"
      ></path>
      <g clipPath="url(#clip0_459_3153)">
        <path fill="#0F0E13" d="M4 5H29V23H4z"></path>
        <path
          fill={color}
          d="M22 5H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-5 14h-7v-2h7v2zm3-4H10v-2h10v2zm0-4H10V9h10v2z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_459_3153">
          <path fill="#fff" d="M0 0H24V24H0z" transform="translate(6)"></path>
        </clipPath>
      </defs>
    </svg>
  );
}
