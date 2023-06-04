import { ColorInterface } from "@/types/types";

export default function CurrentStatusIcon({ color }: ColorInterface) {
  return (
    <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" fill={color}>
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm-5 14H7v-2h7v2Zm3-4H7v-2h10v2Zm0-4H7V7h10v2Z" />
    </svg>
  );
}
