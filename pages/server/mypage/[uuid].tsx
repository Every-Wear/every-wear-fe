import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import { Layout } from "@/components/serverComponents";
import { get_finish_matching_detail } from "@/api/modules/matching";
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
import { colors } from "@/styles/theme";
import { ImageWrapper, StyledInput } from "../currentStatus/detail/[uuid]";
import Image from "next/image";

interface MatchingFullDetail {
  matching: ServerMatchingInfoInterface;
  matchingDetail: ServerMatchingDetailInfoInterface;
}

export default function Mypage() {
  const router = useRouter();
  const { uuid } = router.query;
  const [images, setImages] = useState<{
    clothesPictures: string;
    billingPictures: string;
    otherPictures: string;
  }>({
    clothesPictures: "",
    billingPictures: "",
    otherPictures: "",
  });
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
          const { data } = await get_finish_matching_detail(String(uuid));
          setMatchedDetail(data);
          setImages({
            clothesPictures: data.matchingDetail.clothesPictures[0],
            billingPictures: data.matchingDetail.billingPictures[0],
            otherPictures: data.matchingDetail.otherPictures[0],
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    getTargetMatchingDetail();
  }, [uuid]);

  const ImageDiv = styled.div`
    width: 33%;
    height: 30%;
    padding-bottom: 40%;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
  `;

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
        <hr />
        <DetailTitle>구매 목적</DetailTitle>
        <DetailText>{matchedDetail.matching.clothesType}</DetailText>
        <hr />
        <DetailTitle>메모</DetailTitle>
        <DetailText>{matchedDetail.matching?.remark}</DetailText>
        <hr />
        <DetailTitle style={{ marginBottom: 24 }}>
          의류 구매 여부
          <StyledInput
            type="checkbox"
            readonly
            checked={matchedDetail.matchingDetail?.is_buy}
          />
        </DetailTitle>
        <hr />
        <DetailTitle>구매한 의류와 영수증 사진</DetailTitle>
        <ImageWrapper>
          <ImageDiv>
            <Image
              src={images.clothesPictures}
              alt="의류 사진"
              fill
              onError={() => {
                setImages({
                  ...images,
                  clothesPictures: "/assets/defaultImage.png",
                });
              }}
            />
          </ImageDiv>
          <ImageDiv>
            <Image
              src={images.billingPictures}
              alt="영수증 사진"
              fill
              onError={() => {
                setImages({
                  ...images,
                  billingPictures: "/assets/defaultImage.png",
                });
              }}
            />
          </ImageDiv>
          <ImageDiv>
            <Image
              src={images.otherPictures}
              alt="기타 의류 사진"
              fill
              onError={() => {
                setImages({
                  ...images,
                  otherPictures: "/assets/defaultImage.png",
                });
              }}
            />
          </ImageDiv>
        </ImageWrapper>
      </DetailWrapper>

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
    </Layout>
  );
}
