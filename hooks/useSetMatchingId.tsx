import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useSetMatchingId() {
  const router = useRouter();
  const { uuid } = router.query;
  const [matchingId, setMachingId] = useState<string>("");

  useEffect(() => {
    if (typeof uuid === "string") {
      setMachingId(uuid);
    }
  }, [uuid]);

  return matchingId;
}
