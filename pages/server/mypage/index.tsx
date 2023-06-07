import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from "styled-components";

import { get_matchings } from "@/api/modules/matching";
import { Layout } from "@/components/serverComponents";
import { MATCHING_STATUS_TYPE } from "@/types/types";
import { colors } from "@/styles/theme";
import { getRandomNumImg } from "@/utils/randomImg";

interface PaddingDivProps {
  marginPx?: string;
}

const PaddingDiv = styled.div`
  margin: ${(props: PaddingDivProps) => props.marginPx || "0rem"};
`;

const MatchedInfoDiv = styled.span`
  background-color: rgb(248 227 99);
  padding: 0.3rem;
  margin: 1rem;
`;

const MatchedList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 32px 16px;
  gap: 5px;
  align-items: center;
  border-bottom: 1px solid ${colors.white};
`;

const MatchedItem = styled.div`
  color: white;
  margin-left: 0.3rem;
`;


export default function Mypage() {
  const router = useRouter();
  const handleClick = (uuid: string) => {
    router.push(`/server/mypage/${uuid}`);
  };

  const [matchedList, setMatchedList] = useState<any[]>(
    [],
  );

  const getAllMatching = async () => {
    try {
      const { data } = await get_matchings(MATCHING_STATUS_TYPE.진행완료);
      setMatchedList(data.matchings);
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    getAllMatching();
  }, []);

  return (
    <Layout>
      <PaddingDiv marginPx="1.2rem 0 0 0"></PaddingDiv>
      <MatchedInfoDiv>코디완료 {matchedList.length}</MatchedInfoDiv>
      <div>
        {matchedList.length > 0 &&
          matchedList.map(matched => (
            <MatchedList key={matched._id} onClick={() => handleClick(matched.uuid)} >
              <Image src={`/assets/random-profile${getRandomNumImg()}.png`} alt="요청한 시각장애인의 프로필사진" width={50} height={50} />
              <MatchedItem>
                {matched.preferPlace} {matched.preferTime} <br />
                <b>{matched.preferStyle} / {matched.clothesType}</b> 코디를 진행했어요.
              </MatchedItem>
            </MatchedList>
          ))}
      </div>
    </Layout>
  );
}
