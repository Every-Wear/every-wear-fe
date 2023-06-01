import { MATCHING_STATUS_TYPE } from "@/api/modules/matching";

export type MatchingStatusType = keyof typeof MATCHING_STATUS_TYPE;

export interface MatchingInfoInterface {
  _id: string;
  publishUserId: string;
  statusType: MatchingStatusType;
  clothesType: string; // 만약 백엔드 enum이 있다면 상수로 교체
  limitPrice: number;
  preferPlace: string;
  preferStyle: string; // 만약 백엔드 enum이 있다면 상수로 교체
  preferGender: "woman" | "man";
  remark: string;
  uuid: string;
  createdAt: string;
  qrCodeValue: string;
}
