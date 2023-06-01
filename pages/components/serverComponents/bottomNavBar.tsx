import { useRouter } from "next/router";

export default function BottomNavBar() {
  const router = useRouter();

  return (
    <nav>
      <button onClick={() => router.push("/server")}>홈</button>
      <button onClick={() => router.push("/server/currentStatus")}>
        매칭현황
      </button>
      <button onClick={() => router.push("/server/history")}>매칭내역</button>
      <button onClick={() => router.push("/server/mypage")}>마이페이지</button>
    </nav>
  );
}
