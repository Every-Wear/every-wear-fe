import { useRouter } from "next/router";
import { Layout } from "@/components/serverComponents/index";

export default function ServerHome() {
  const router = useRouter();

  const goToDetail = () => {
    router.push(`/server/detail`);
  };

  return (
    <Layout>
      <div>
        <ul>
          <li>지역 : 서울</li>
          <li>날짜 : 2023/05/21</li>
          <li>시간 : 오후 3시</li>
          <button onClick={goToDetail}>자세히 보기</button>
        </ul>
        <ul>
          <li>지역 : 광주</li>
          <li>날짜 : 2023/05/21</li>
          <li>시간 : 오후 3시</li>
          <button onClick={goToDetail}>자세히 보기</button>
        </ul>
      </div>
    </Layout>
  );
}
