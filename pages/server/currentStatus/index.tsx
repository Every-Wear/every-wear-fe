import { useRouter } from "next/router";
import { Layout } from "@/serverComponents/index";

export default function CurrentStatus() {
  const router = useRouter();
  return (
    <Layout>
      <ul>
        <li>지역 : 서울</li>
        <li>날짜 : 2023/05/21</li>
        <li>시간 : 오후 3시</li>
        <button onClick={() => router.push("currentStatus/detail")}>
          자세히 보기
        </button>
      </ul>
    </Layout>
  );
}
