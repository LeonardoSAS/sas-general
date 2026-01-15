import { useState, useRef, ChangeEvent } from "react";
import { handleImageBanner } from "../../../utils/parse/image/GetImageBanner";

export function ImageUpload() {
  const [imageOk, setImageOk] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        name="image_banner"
        accept=".jpg,.png,.webp"
        style={{ display: "none" }}
        onChange={(
          event: ChangeEvent<HTMLInputElement>
        ) =>
          handleImageBanner({
            event,
            fileInputRef,
            setImageOk,
            setPreviewSrc,
          })
        }
      />
      <s-box
        padding="base"
        background="base"
        borderRadius="base"
        borderWidth="base"
        borderColor="base"
      >
        <s-stack gap="base">
          <s-heading>
            Image
          </s-heading>
          {imageOk && previewSrc ? (
            <s-clickable 
              onClick= {() => 
                fileInputRef.current?.click()
              }>
              <s-box
                inlineSize="100%"
                blockSize="200px"
                paddingBlock="large"
                borderColor="base"
                borderWidth="base"
                overflow="hidden"
              >
                <s-image
                  src={previewSrc}
                  alt="Preview"
                  aspectRatio="16/9"
                  objectFit="cover"
                  inlineSize="fill"
                />
              </s-box>
            </s-clickable>
          ) : (
            <s-drop-zone
              accept=".jpg,.png,.webp"
              name="image_banner"
              onChange={(event: Event) =>
                handleImageBanner({
                  event,
                  fileInputRef,
                  setImageOk,
                  setPreviewSrc,
                })
              }
            >
              <s-button>Add Image</s-button>
              <s-text>Or drop an image to upload.</s-text>
            </s-drop-zone>
          )}
        </s-stack>
      </s-box>
    </>
  );
}