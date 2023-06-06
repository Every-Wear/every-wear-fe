import { ColorType } from "@/styles/styledType";
import { MatchingStatusType } from "./types";

export const STATUS_TYPE = {
  날짜: "날짜",
  장소: "장소",
  성별: "성별",
  목적: "목적",
} as const;
export type StatusType = keyof typeof STATUS_TYPE;

export interface ClientButtonInterface {
  title: string;
  onClick: () => void;
  label: string;
  bgColor?: keyof ColorType;
}

export interface ClientMatchingInfoInterface {
  _id?: string;
  publishUserId?: string;
  statusType?: MatchingStatusType;
  clothesType?: string;
  limitPrice?: number;
  preferPlace?: string;
  preferTime?: string;
  preferStyle?: string;
  preferGender?: "woman" | "man";
  remark?: string;
  uuid?: string;
  createdAt?: string;
  qrCodeValue?: string;
  subscriptionUserId?: string;
}
