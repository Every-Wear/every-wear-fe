import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";

import { Layout } from "@/components/serverComponents";
import { colors } from "@/styles/theme";
import { getRandomNumImg } from "@/utils/randomImg";
import { get_matching_detail } from "@/api/modules/matching";
import { ServerMatchingInfoInterface } from "@/types/serverType";
import { ServerMatchingDetailInfoInterface } from "@/types/serverMatchingDetailType";

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
      <DetailWrapperDiv>
        <Image
          src={`/assets/random-profile${getRandomNumImg()}.png`}
          alt="요청한 시각장애인의 프로필사진"
          width={50}
          height={50}
        />
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
          {Object.entries(matchedDetail.matchingDetail).map(([key, value]) => {
            if (key === "_id" || key === "uuid") {
              return null;
            }
            if (key.includes("Pictures")) {
              console.log(value);
              if (!value) return null;
              return (
                <div key={key}>
                  <Image src={value[0]} alt="" width={50} height={50} />
                </div>
              );
            }
            return (
              <div key={key}>
                <span>{key}:</span> <span>{value}</span>
              </div>
            );
          })}
        </div>
      </DetailWrapperDiv>
    </Layout>
  );
}
