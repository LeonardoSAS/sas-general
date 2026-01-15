import { useState } from "react";
import { FieldNameType } from "app/type/seo/seoType";
import { ErrorsType } from "app/type/general";

export function FormValidation() {
  const [errors, setErrors] = useState<ErrorsType>({
    title: "",
    url: ""
  });

  const [attemptSubmit, setAttemptSubmit] = useState(false);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    setAttemptSubmit(true);

    const form = e.currentTarget;

    const getValue = (
      name: FieldNameType
    ) => (
      form.elements.namedItem(name) as HTMLInputElement
    )?.value.trim() || "";

    const newErrors: ErrorsType = {
      title: getValue("title")
        ? "" : "Title is required",
      url: getValue("url") 
        ? "" : "URL is required"
    };
    setErrors(newErrors);

    if (Object.values(newErrors).
      some(Boolean)) {
      e.preventDefault();
    }
  };
  return { 
    errors, 
    attemptSubmit, 
    handleSubmit 
  };
}