import { ColorType } from "@/styles/styledType";

export const MATCHING_STATUS_TYPE = {
  매칭대기중: "매칭대기중",
  매칭완료: "매칭완료",
  매칭중: "매칭중",
  진행중: "진행중",
  진행완료: "진행완료",
} as const;
export type MatchingStatusType = keyof typeof MATCHING_STATUS_TYPE;

export interface ClientButtonInterface {
  title: string;
  onClick: () => void;
  label: string;
  bgColor?: keyof ColorType;
}

export interface MatchingInfoInterface {
  _id?: string;
  publishUserId?: string;
  statusType?: MatchingStatusType;
  clothesType?: string;
  limitPrice?: number;
  preferPlace?: string;
  preferStyle?: string;
  preferGender?: "woman" | "man";
  remark?: string;
  uuid?: string;
  createdAt?: string;
  qrCodeValue?: string;
  subscriptionUserId?: string;
}
