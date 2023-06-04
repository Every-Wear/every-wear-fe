import { ColorInterface } from "@/types/types";

export default function HomeIcon({ color }: ColorInterface) {
  return (
    <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" fill="none">
      <g stroke={color} clipPath="url(#a)">
        <path d="M-21.5-10.5h71v55h-71z" />
        <path
          fill={color}
          strokeWidth={1.5}
          d="M20.25 9.156V20.25H15v-6.128H9v6.128H3.75V9.156L12 3.89l8.25 5.266Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
