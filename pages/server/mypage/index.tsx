import { Layout } from "@/components/serverComponents";
import { useRouter } from "next/router";

export default function Mypage() {
  const router = useRouter();

  return (
    <Layout>
      <div>
        <div>코디네이터 박먼지</div>
        <div>29세</div>
        <div>여성</div>
        <div>서비스 참여 횟수: 2회</div>
      </div>
    </Layout>
  );
}
