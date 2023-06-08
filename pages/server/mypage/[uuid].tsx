import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";

import { Layout } from "@/components/serverComponents";
import { getRandomNumImg } from "@/utils/randomImg";
import { get_matching_detail } from "@/api/modules/matching";
import { ServerMatchingInfoInterface } from "@/types/serverType";
import { ServerMatchingDetailInfoInterface } from "@/types/serverMatchingDetailType";
import {
  BadgeWrapper,
  DetailText,
  DetailTitle,
  DetailWrapper,
  NewBadge,
} from "@/styles/server/serverStyled";
import ProfileList from "@/components/serverComponents/profileList";
import { formattingTime } from "@/utils/formatting";
import BottomButton from "@/components/serverComponents/bottomButton";

interface MatchingFullDetail {
  matching: ServerMatchingInfoInterface;
  matchingDetail: ServerMatchingDetailInfoInterface;
}

const DetailWrapperDiv = styled.div`
  margin: 1rem;
  color: white;
`;

export default function Mypage() {
  const router = useRouter();
  const { uuid } = router.query;
  const [matchedDetail, setMatchedDetail] = useState<MatchingFullDetail>({
    matching: {
      _id: "",
      publishUserId: "",
      statusType: "진행완료",
      clothesType: "",
      limitPrice: 0,
      preferPlace: "",
      preferTime: "",
      preferStyle: "",
      preferGender: "man",
      remark: "",
      uuid: "",
      createdAt: "",
      qrCodeValue: "",
    },
    matchingDetail: {
      _id: "",
      uuid: "",
      publishUserId: "",
      subscriptionUserId: "",
      is_buy: false,
      clothesPictures: [],
      billingPictures: [],
      otherPictures: [],
      epilogue: "",
      createdAt: "",
    },
  });

  useEffect(() => {
    const getTargetMatchingDetail = async () => {
      if (uuid) {
        try {
          const { data } = await get_matching_detail(String(uuid));
          setMatchedDetail(data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getTargetMatchingDetail();
  }, [uuid]);

  return (
    <Layout>
      <DetailWrapper style={{ paddingBottom: 20 }}>
        <BadgeWrapper margin="26px 0px 0px 16px">
          <NewBadge>코디 완료</NewBadge>
        </BadgeWrapper>
        <ProfileList profile={matchedDetail.matching} />
        <hr className="bold" />
        <DetailTitle>구매 일시</DetailTitle>
        <DetailText>
          {formattingTime(matchedDetail.matching.preferTime)}
        </DetailText>
        <hr />
        <DetailTitle>구매 장소</DetailTitle>
        <DetailText>{matchedDetail.matching.preferPlace}</DetailText>
        <DetailTitle style={{ marginTop: 48 }}>구매 목적</DetailTitle>
        <DetailText>{matchedDetail.matching.clothesType}</DetailText>
        <hr />
        <DetailTitle>메모</DetailTitle>
        <DetailText>{matchedDetail.matching?.remark}</DetailText>
      </DetailWrapper>
      <div>
        {Object.entries(matchedDetail.matching).map(([key, value]) => {
          if (key === "qrCodeValue" || key === "_id" || key === "uuid") {
            return null;
          }
          return (
            <div key={key}>
              <span>{key}:</span> <span>{value}</span>
            </div>
          );
        })}
      </div>
      <div>
        {/* {Object.entries(matchedDetail.matchingDetail).map(([key, value]) => {
            if (key === "_id" || key === "uuid") {
              return null;
            }
            if (key.includes("Pictures")) {
              console.log(value);
              if (!value) return null;
              return (
                <div key={key}>
                  <Image
                    src={value[0] ?? "/aseets/random-profile1.png"}
                    alt=""
                    width={50}
                    height={50}
                  />
                </div>
              );
            }
            return (
              <div key={key}>
                <span>{key}:</span> <span>{value}</span>
              </div>
            );
          })} */}
      </div>
    </Layout>
  );
}
