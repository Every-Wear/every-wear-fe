export const MATCHING_STATUS_TYPE = {
  매칭대기중: "매칭대기중",
  매칭완료: "매칭완료",
  매칭중: "매칭중",
  진행중: "진행중",
  진행완료: "진행완료",
} as const;
export type MatchingStatusType = keyof typeof MATCHING_STATUS_TYPE;
