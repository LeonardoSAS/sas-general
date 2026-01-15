export function handleImageBanner({
  event,
  fileInputRef,
  setImageOk,
  setPreviewSrc, 
}: {
  event: any;
  fileInputRef: React.RefObject<HTMLInputElement>;
  setImageOk: (v: boolean) => void;
  setPreviewSrc: (v: string | null) => void;
}) {

  const files: FileList | undefined =
    (event.currentTarget && (event.currentTarget.files as FileList)) ||
    (event.target && (event.target.files as FileList)) ||
    (event.dataTransfer && (event.dataTransfer.files as FileList)) ||
    (event.detail && (event.detail.files as FileList));
  const file = files?.[0];

  if (file) {
    setImageOk(true);

    setPreviewSrc(URL.createObjectURL(file));

    if (fileInputRef.current) {
      try {
        const dt = new DataTransfer();
        dt.items.add(file);

        fileInputRef.current.files = dt.files;
      } 
      catch (err) {
        console.warn("DataTransfer fallback:", err);
      }
    }
  } else {
    setImageOk(false);
    setPreviewSrc(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }
}
