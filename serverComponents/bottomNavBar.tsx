import { useRouter } from "next/router";
import styled from "styled-components";
import { useState } from "react";

export default function BottomNavBar() {
  const router = useRouter();

  return (
    <nav>
      <button onClick={() => router.push("/server")}>홈</button>
      <button onClick={() => router.push("/server/currentStatus")}>
        매칭현황
      </button>
      <button>매칭내역</button>
      <button>마이페이지</button>
    </nav>
  );
}
