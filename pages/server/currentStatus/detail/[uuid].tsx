import {
  change_complete_to_ongoing,
  change_ongoing_to_finish,
} from "@/api/modules/matchingStatus";
import { Layout, Modal } from "@/components/serverComponents";
import BottomButton from "@/components/serverComponents/bottomButton";
import ProfileList from "@/components/serverComponents/profileList";
import useGetDetail from "@/hooks/useGetDetail";
import useSetMatchingId from "@/hooks/useSetMatchingId";
import {
  BadgeWrapper,
  DetailText,
  DetailTitle,
  DetailWrapper,
  NewBadge,
} from "@/styles/server/serverStyled";
import { MATCHING_STATUS_TYPE } from "@/types/types";
import { formattingTime } from "@/utils/formatting";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function CurrentStatusOngoing() {
  const router = useRouter();
  const matchingId = useSetMatchingId();
  const { detailInfo: currentStatusInfo } = useGetDetail(matchingId);
  const [files, setFiles] = useState<any>({}); //임시
  const [isFinishModalOpen, setIsFinishModalOpen] = useState<boolean>(false);

  const finishModalHandler = () => {
    setIsFinishModalOpen(!isFinishModalOpen);
  };

  const handleSubmit = async (uuid?: string | string[]) => {
    const formData = new FormData();
    formData.append("is_buy", "true");
    formData.append("epilogue", "테스트테스트트");
    formData.append("clothesPictures", files.clothesPictures);
    formData.append("billingPictures", files.billingPictures);
    formData.append("otherPictures", files.otherPictures);
    if (typeof uuid === "string") {
      const data = await change_ongoing_to_finish(matchingId, formData);
      router.push("/server/mypage");
    }
  };

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      const file = e.target.files[0];
      setFiles({
        ...files,
        [e.target.name]: file,
      });
    },
    [files],
  );

  useEffect(() => {
    if (matchingId) {
      (async () => {
        try {
          await change_complete_to_ongoing(matchingId);
        } catch (e) {
          return alert("매칭 오류");
        }
      })();
    }
  }, [matchingId]);

  return (
    <Layout noNavBar>
      <>
        {currentStatusInfo && (
          <>
            <DetailWrapper style={{ paddingBottom: 20 }}>
              <BadgeWrapper margin="26px 0px 0px 16px">
                <NewBadge>코디{currentStatusInfo.statusType}</NewBadge>
              </BadgeWrapper>
              <ProfileList profile={currentStatusInfo} />
              <hr className="bold" />
              <DetailTitle>구매 예정 일시</DetailTitle>
              <DetailText>
                {formattingTime(currentStatusInfo.preferTime)}
              </DetailText>
              <hr />
              <DetailTitle>구매 장소</DetailTitle>
              <DetailText>{currentStatusInfo.preferPlace}</DetailText>
              <DetailTitle style={{ marginTop: 48 }}>구매 목적</DetailTitle>
              <DetailText>{currentStatusInfo.clothesType}</DetailText>
              <hr />
              <DetailTitle>메모</DetailTitle>
              <DetailText>{currentStatusInfo?.remark}</DetailText>
            </DetailWrapper>
            <BottomButton
              type="oneButton"
              text="코디 종료"
              onClick={finishModalHandler}
            />
            {/* <input
              name="clothesPictures"
              type="file"
              onChange={onUploadImage}
            />
            <input
              name="billingPictures"
              type="file"
              onChange={onUploadImage}
            />
            <input name="otherPictures" type="file" onChange={onUploadImage} /> */}
            {isFinishModalOpen && (
              <Modal
                title="코디 종료"
                message={[
                  "코디를 종료하시겠습니까?",
                  "종료시 매칭 내역으로 이동됩니다.",
                ]}
                confirmText="종료"
                cancelText="아니요"
                confirmHandler={() => handleSubmit(matchingId)}
                cancelHandler={finishModalHandler}
              />
            )}
          </>
        )}
      </>
    </Layout>
  );
}
