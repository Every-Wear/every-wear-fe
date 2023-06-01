import { useRouter } from "next/router";
import { Layout } from "@/pages/components/serverComponents/index";

export default function History() {
  const router = useRouter();

  return (
    <Layout>
      <ul>
        <li>지역 : 강남</li>
        <li>날짜 : 2023/05/21</li>
        <li>시간 : 오후 3시</li>
        <li>진행 완료</li>
        <div>후기를 작성해주세요</div>
      </ul>
    </Layout>
  );
}
