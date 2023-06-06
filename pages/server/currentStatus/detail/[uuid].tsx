import {
  change_complete_to_ongoing,
  change_ongoing_to_finish,
} from "@/api/modules/matchingStatus";
import { Layout } from "@/components/serverComponents";
import useGetDetail from "@/hooks/useGetDetail";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function CurrentStatusOngoing() {
  const router = useRouter();
  const { uuid } = router.query;
  const detailInfo = useGetDetail(uuid);
  const [files, setFiles] = useState<any>({});

  const handleSubmit = async (uuid?: string | string[]) => {
    const formData = new FormData();
    formData.append("is_buy", "true");
    formData.append("epilogue", "테스트테스트트");
    formData.append("clothesPictures", files.clothesPictures);
    formData.append("billingPictures", files.billingPictures);
    formData.append("otherPictures", files.otherPictures);
    if (typeof uuid === "string") {
      const data = await change_ongoing_to_finish(uuid, formData);
      console.log(data);
    }
  };

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      const file = e.target.files[0];
      setFiles({
        ...files,
        [e.target.name]: file,
      });
    },
    [files],
  );

  useEffect(() => {
    (async () => {
      try {
        if (typeof uuid === "string") {
          const data = await change_complete_to_ongoing(uuid);
        }
      } catch (e) {
        return alert("매칭 오류");
      }
    })();
  }, [uuid]);

  return (
    <Layout>
      <div>{detailInfo?.preferPlace}</div>
      <div>{detailInfo?.statusType}</div>
      <input name="clothesPictures" type="file" onChange={onUploadImage} />
      <input name="billingPictures" type="file" onChange={onUploadImage} />
      <input name="otherPictures" type="file" onChange={onUploadImage} />
      <button onClick={() => handleSubmit(uuid)}>코디 종료</button>
    </Layout>
  );
}
