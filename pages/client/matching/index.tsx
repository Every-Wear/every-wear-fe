import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { get_my_matching } from "@/api/modules/matching";
import {
  Layout,
  ClientButton,
  ClientText,
  ClientSubText,
  IntroLabel,
} from "@/components/clientComponents";
import {
  MatchingProgressTitleWrap,
  QRcodeBox,
  MatchingInfoListWrap,
  InfoText,
} from "@/pages/client/matching/index.styled";

import { postGeoLocationData } from "@/utils/geoLocation";
import { MATCHING_STATUS_TYPE, MatchingStatusType } from "@/types/types";
import { ClientMatchingInfoInterface } from "@/types/clientType";

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

  const getCurrentMatching = async (
    matchingInfo: ClientMatchingInfoInterface,
  ) => {
    const { data } = await get_my_matching();
    setMatchingInfo(data?.matching);

    if (matchingInfo?._id) return;
    setQrCodeSrc(data?.matching.qrCodeValue);
  };

  const currentMatchingCancelHandler = () => {
    if (confirm("취소하시겠습니까?")) {
      alert("취소되었습니다.");
      router.push("/client");
    }
  };

  useEffect(() => {
    getCurrentMatching(matchingInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getInfoId || !matchingInfo?._id) return;
    if (matchingInfo?.statusType === MATCHING_STATUS_TYPE.진행완료) {
      clearInterval(getInfoId ?? 0);
    }
    if (matchingInfo?.statusType !== MATCHING_STATUS_TYPE.진행완료) {
      const interverId = setInterval(
        () => getCurrentMatching(matchingInfo),
        2000,
      );
      setGetInfoId(interverId);
    }
  }, [getInfoId, matchingInfo]);

  useEffect(() => {
    if (postGeoId || !matchingInfo?._id) return;
    if (matchingInfo?.statusType === MATCHING_STATUS_TYPE.진행완료) {
      clearInterval(postGeoId ?? 0);
    }
    if (matchingInfo?.statusType === MATCHING_STATUS_TYPE.진행중) {
      const interverId = setInterval(
        () => postGeoLocationData("a02cc714-a572-4a2f-b742-1a1e398724c0"),
        2000,
      );
      setPostGeoId(interverId);
    }
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
      <ClientSubText>
        코디네이터와 통화 후 <br />
        예약이 확정되요
      </ClientSubText>
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
          <ClientText>{info.content}</ClientText>
        </InfoText>
      ))}
    </MatchingInfoListWrap>
  );
};

export default Matching;
