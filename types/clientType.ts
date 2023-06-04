import { ColorType } from "@/styles/styledType";
import { MatchingStatusType } from "./types";
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
  preferStyle?: string;
  preferGender?: "woman" | "man";
  remark?: string;
  uuid?: string;
  createdAt?: string;
  qrCodeValue?: string;
  subscriptionUserId?: string;
}
