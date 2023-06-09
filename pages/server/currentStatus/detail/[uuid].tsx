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
import styled from "styled-components";
import { formattingTime } from "@/utils/formatting";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { colors } from "@/styles/theme";

export default function CurrentStatusOngoing() {
  const router = useRouter();
  const matchingId = useSetMatchingId();
  const { detailInfo: currentStatusInfo } = useGetDetail(matchingId);
  const [files, setFiles] = useState<any>({}); //임시
  const [checked, setChecked] = useState<boolean>(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState<boolean>(false);
  const [imgFile, setImgFile] = useState<{
    clothesPictures: string;
    billingPictures: string;
    otherPictures: string;
  }>({ clothesPictures: "", billingPictures: "", otherPictures: "" });

  const finishModalHandler = () => {
    setIsFinishModalOpen(!isFinishModalOpen);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    console.log(files);
    formData.append("is_buy", String(checked));
    formData.append("epilogue", "테스트테스트");
    formData.append("clothesPictures", files.clothesPictures);
    formData.append("billingPictures", files.billingPictures);
    formData.append("otherPictures", files.otherPictures);
    const data = await change_ongoing_to_finish(matchingId, formData);
    router.push("/server/mypage");
  };

  const onCheckIsBuy = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string")
          setImgFile({
            ...imgFile,
            [e.target.name]: reader.result,
          });
      };
      setFiles({
        ...files,
        [e.target.name]: file,
      });
    },
    [files, imgFile],
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
              <hr />
              <DetailTitle style={{ marginBottom: 24 }}>
                의류 구매 여부
                <StyledInput
                  type="checkbox"
                  checked={checked}
                  onChange={onCheckIsBuy}
                />
              </DetailTitle>
              <hr />
              <DetailTitle>구매한 의류와 영수증 사진</DetailTitle>
              <ImageWrapper>
                <ImageLabel
                  imgFile={imgFile.clothesPictures}
                  htmlFor="clothesPictures"
                >
                  <div className="width" />
                  <div className="height" />
                  <ImageInput
                    name="clothesPictures"
                    type="file"
                    accept="image/*"
                    onChange={onUploadImage}
                    id="clothesPictures"
                  />
                </ImageLabel>
                <ImageLabel
                  imgFile={imgFile.billingPictures}
                  htmlFor="billingPictures"
                >
                  <div className="width" />
                  <div className="height" />
                  <ImageInput
                    name="billingPictures"
                    type="file"
                    onChange={onUploadImage}
                    id="billingPictures"
                  />
                </ImageLabel>
                <ImageLabel
                  imgFile={imgFile.otherPictures}
                  htmlFor="otherPictures"
                >
                  <div className="width" />
                  <div className="height" />
                  <ImageInput
                    name="otherPictures"
                    type="file"
                    onChange={onUploadImage}
                    id="otherPictures"
                  />
                </ImageLabel>
              </ImageWrapper>
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
                confirmHandler={handleSubmit}
                cancelHandler={finishModalHandler}
              />
            )}
          </>
        )}
      </>
    </Layout>
  );
}

export const StyledInput = styled.input`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 1.5px solid ${colors.gray100};
  background-color: ${colors.gray};
  border-radius: 0.35rem;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: ${colors.blue};
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  margin: 24px 16px;
  gap: 20px;
  justify-content: space-between;
`;

const ImageInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

const ImageLabel = styled.label`
  background-color: ${colors.gray};
  cursor: pointer;
  width: 33%;
  height: 30%;
  padding-bottom: 40%;
  border-radius: 10px;
  position: relative;
  background-image: ${(props: any) =>
    props.imgFile ? `url(${props.imgFile})` : ""};
  background-repeat: no-repeat;
  background-size: cover;
  & div {
    display: ${(props: any) => (props.imgFile ? "none" : "default")};
    background-color: ${colors.gray300};
    position: absolute;
  }

  & div.width {
    width: 21px;
    height: 3px;
    top: 50%;
    left: calc(50% - 10px);
  }

  & div.height {
    width: 3px;
    height: 21px;
    top: calc(50% - 9px);
    left: calc(50% - 1px);
  }
`;
