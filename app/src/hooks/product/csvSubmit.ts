import { useFetcher } from "react-router";
import { useNavigation } from "react-router";
import { useCallback } from "react";
import { ActionResponseType } from "app/type/product/productType";

export function useProductsLogic() {
  const fetcher = useFetcher();
  const navigation = useNavigation();

  const isProcessing =
    navigation.state === "submitting" ||
    fetcher.state === "submitting" ||
    fetcher.state === "loading";

  const handleSubmit = useCallback(
    (file: File) => {
      const formData = new FormData();
      formData.append("csvFile", file);
      fetcher.submit(formData, {
        method: "post",
        encType: "multipart/form-data",
      });
    },
    [fetcher]
  );

  return {
    handleSubmit,
    isProcessing,
    results: (
      fetcher.data as unknown
    ) as ActionResponseType | null,
  };
}

