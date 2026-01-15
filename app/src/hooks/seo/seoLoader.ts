
import { useNavigation } from "react-router";
import { FormValidation } from "./FormValidation";
import { useIsMobile } from "./useIsMobile";

export function seoLoader() {
  const navigation = useNavigation();
  const isSubmitting = navigation?.state === "submitting";

  const { 
    errors, 
    attemptSubmit, 
    handleSubmit
  } = FormValidation();
  const isMobile = useIsMobile(1050);

  return {
    isSubmitting,
    errors,
    attemptSubmit,
    handleSubmit,
    isMobile,
  };
}