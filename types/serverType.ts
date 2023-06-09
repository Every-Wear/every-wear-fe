import { MatchingStatusType } from "./types";

export interface ServerMatchingInfoInterface {
  _id: string;
  publishUserId: string;
  statusType: MatchingStatusType;
  clothesType: string; // 만약 백엔드 enum이 있다면 상수로 교체
  limitPrice: number;
  preferPlace: string;
  preferStyle: string; // 만약 백엔드 enum이 있다면 상수로 교체
  preferGender: string;
  preferTime?: string;
  remark?: string;
  uuid: string;
  createdAt: string;
  qrCodeValue: string;
}

export interface ColorInterface {
  color: string;
}
