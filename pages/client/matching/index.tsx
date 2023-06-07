import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";

import {
  get_my_matching,
  delete_matching_detail,
} from "@/api/modules/matching";
import {
  Layout,
  ClientButton,
  ClientText,
  ClientSubText,
  IntroLabel,
  HistoryBackButton,
} from "@/components/clientComponents";

import { postGeoLocationData } from "@/utils/geoLocation";
import { MATCHING_STATUS_TYPE, MatchingStatusType } from "@/types/types";
import { ClientMatchingInfoInterface } from "@/types/clientType";
import { changeButtonText } from "@/utils/stringFormat";

export const MatchingProgressTitleWrap = styled.section`
  width: 100%;
  padding: 50px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 8px solid #2c2c2c;
`;

export const QRcodeBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 44px;
`;

export const MatchingInfoListWrap = styled.section`
  width: 100%;
`;

export const InfoText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px 16px;
  gap: 5px;

  &:not(:last-child) {
    border-bottom: 1px solid #b3b3b3;
  }
`;

const Matching = () => {
  const router = useRouter();

  const [matchingInfo, setMatchingInfo] = useState<ClientMatchingInfoInterface>(
    {},
  );
  const [qrCodeSrc, setQrCodeSrc] = useState<string>("");
  const [getInfoId, setGetInfoId] = useState<NodeJS.Timer | null>(null);
  const [postGeoId, setPostGeoId] = useState<NodeJS.Timer | null>(null);

  const currentProgress: MatchingStatusType =
    matchingInfo?.statusType ?? "매칭대기중";

  const beforeMatchingComplete: boolean =
    matchingInfo?.statusType === MATCHING_STATUS_TYPE.매칭대기중 ||
    matchingInfo?.statusType === MATCHING_STATUS_TYPE.매칭중;

  const uuid: string = matchingInfo.uuid ?? "";

  const getCurrentMatching = async (
    matchingInfo: ClientMatchingInfoInterface,
  ) => {
    const { data } = await get_my_matching();
    setMatchingInfo(data?.matching);

    if (matchingInfo?._id) return;
    setQrCodeSrc(data?.matching.qrCodeValue);
  };

  const currentMatchingCancelHandler = async () => {
    try {
      await delete_matching_detail(uuid, "죄송합니다");
      alert("신청이 취소되었습니다.");
      router.push("/client");
    } catch (err) {
      throw new Error();
    }
  };

  useEffect(() => {
    getCurrentMatching(matchingInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (matchingInfo?.statusType === MATCHING_STATUS_TYPE.진행완료) {
      clearInterval(getInfoId ?? 0);
    }
    if (
      !getInfoId &&
      matchingInfo?.statusType !== MATCHING_STATUS_TYPE.진행완료
    ) {
      const interverId = setInterval(
        () => getCurrentMatching(matchingInfo),
        5000,
      );
      setGetInfoId(interverId);
    }
  }, [getInfoId, matchingInfo]);

  useEffect(() => {
    if (matchingInfo?.statusType === MATCHING_STATUS_TYPE.진행완료) {
      clearInterval(postGeoId ?? 0);
    }
    if (
      !postGeoId &&
      matchingInfo?.statusType === MATCHING_STATUS_TYPE.진행중
    ) {
      const interverId = setInterval(() => postGeoLocationData(uuid), 30000);
      setPostGeoId(interverId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postGeoId, matchingInfo]);

  if (!matchingInfo?._id) {
    return (
      <Layout>
        <ClientText>매칭이 존재하지 않습니다</ClientText>
      </Layout>
    );
  }

  return (
    <Layout>
      <IntroLabel labelText="매칭현황 페이지 내용확인과 신청취소를 원한다면 아래 버튼 클릭" />
      <MatchingProgressTitle
        currentProgress={currentProgress}
        qrCodeSrc={qrCodeSrc}
      />
      <MatchingInfoList matchingInfo={matchingInfo} />
      <div>
        {beforeMatchingComplete && (
          <ClientButton
            bgColor="white"
            onClickHandler={currentMatchingCancelHandler}
            label="신청을 취소하시겠습니까? 취소하시려면 터치해주세요"
            fontColor="black"
          >
            신청 취소
          </ClientButton>
        )}
      </div>
      <HistoryBackButton />
    </Layout>
  );
};

// ------------------------------ MatchingProgressTitle Component ---------------------------------
const MatchingProgressTitle = ({
  currentProgress,
  qrCodeSrc,
}: {
  currentProgress: MatchingStatusType;
  qrCodeSrc: string;
}) => {
  return (
    <MatchingProgressTitleWrap>
      <ClientText>{currentProgress}</ClientText>
      {(currentProgress === "매칭대기중" || currentProgress === "매칭중") && (
        <ClientSubText>
          코디네이터와 통화 후 <br />
          예약이 확정되요
        </ClientSubText>
      )}
      {currentProgress === "매칭완료" && (
        <ClientSubText>
          코디네이터에게 <br />
          QR코드를 보여주세요
        </ClientSubText>
      )}
      {currentProgress === "매칭완료" && (
        <QRcodeBox>
          <Image
            src={qrCodeSrc}
            alt="큐알코드"
            aria-label="코디네이터와 만나신 후 큐알코드를 보여주세요"
            width={120}
            height={120}
          />
        </QRcodeBox>
      )}
    </MatchingProgressTitleWrap>
  );
};

// ------------------------------ MatchingInfoList Component ---------------------------------
const MatchingInfoList = ({
  matchingInfo,
}: {
  matchingInfo: ClientMatchingInfoInterface;
}) => {
  const infoList = [
    { title: "구매 날짜", content: matchingInfo?.preferTime ?? "" },
    { title: "구매 장소", content: matchingInfo?.preferPlace ?? "" },
    { title: "구매 목적", content: matchingInfo?.clothesType ?? "" },
    { title: "코디네이터 성별", content: matchingInfo?.preferGender ?? "" },
  ];

  return (
    <MatchingInfoListWrap>
      {infoList.map(info => (
        <InfoText key={info.title}>
          <ClientSubText>{info.title}</ClientSubText>
          <ClientText>{changeButtonText(info.content)}</ClientText>
        </InfoText>
      ))}
    </MatchingInfoListWrap>
  );
};

export default Matching;
