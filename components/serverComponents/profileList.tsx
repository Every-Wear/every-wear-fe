import styled from "styled-components";
import { colors, serverFonts } from "@/styles/theme";
import Image from "next/image";
import { getRandomNumImg } from "@/utils/randomImg";
import { ServerMatchingInfoInterface } from "@/types/serverType";
import { changeWord } from "@/utils/formatting";

interface Props {
  profile: ServerMatchingInfoInterface;
  onClick?: () => void;
}

const Profile = styled.div`
  display: flex;
  margin: 28px 16px 30px 16px;
`;

const ProfileTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 3px 16px;
`;

const UserInfoText = styled.span`
  color: ${colors.gray100};
  font-size: 14px;
  font-weight: bold;
`;

const ProfileTitleText = styled.span`
  color: ${colors.white};
  font-size: 18px;
  font-weight: bold;
`;

export default function ProfileList({ profile, onClick }: Props) {
  return (
    <Profile key={profile._id} onClick={onClick}>
      <Image
        src={`/assets/random-profile${getRandomNumImg()}.png`}
        alt="요청한 시각장애인의 프로필사진"
        width={48}
        height={48}
      />
      <ProfileTextWrapper>
        <UserInfoText>OO대 {changeWord(profile.preferGender)}</UserInfoText>
        <ProfileTitleText>
          {profile.preferPlace}에서 {profile.clothesType}을 구해요
        </ProfileTitleText>
      </ProfileTextWrapper>
    </Profile>
  );
}
