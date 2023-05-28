import { useRouter } from "next/router";
import styled from "styled-components";
import { useState } from "react";
import Layout from "@/serverComponents/layout";

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
