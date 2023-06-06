import { change_matching_to_complete } from "@/api/modules/matchingStatus";
import { Layout } from "@/components/serverComponents/index";
import useGetDetail from "@/hooks/useGetDetail";
import useSetMatchingId from "@/hooks/useSetMatchingId";
import { colors } from "@/styles/theme";
import styled from "styled-components";

export default function CurrentStatusDetail() {
  const matchingId = useSetMatchingId();
  const currentStatusInfo = useGetDetail(matchingId);

  const confirmMatching = async () => {
    try {
      if (currentStatusInfo) {
        await change_matching_to_complete(matchingId, currentStatusInfo);
      }
    } catch (e) {
      return alert("매칭 오류");
    }
  };

  const SelectTitle = styled.h3`
    padding: 30px 0px 8px 16px;
    color: ${colors.white};
  `;
  const SelectSubText = styled.div`
    padding-left: 16px;
    color: ${colors.gray100};
  `;

  return (
    <Layout>
      {/* <div>
        {currentStatusInfo?.preferPlace}
        <button>전화</button>
        <button onClick={confirmMatching}>매칭 확정</button>
      </div> */}
      <SelectTitle>구매 날짜 선택</SelectTitle>
      <SelectSubText>
        의뢰인과 협의하여 결정한
        <br /> 의상 구매 날짜를 선택해주세요.
      </SelectSubText>
    </Layout>
  );
}
