import { useRouter } from "next/router";
import Layout from "@/serverComponents/layout";

export default function CurrentStatusDetail() {
  const router = useRouter();

  return (
    <Layout>
      <div>
        <ul>
          <li>지역: 서울</li>
          <li>날짜: 2023/05/28</li>
          <li>시간: 오후 3시</li>
          <li>용도: 패션</li>
          <li>성별: 여자</li>
        </ul>
      </div>
    </Layout>
  );
}
