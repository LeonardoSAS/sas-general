import sharp from "sharp";
import { GET_IMAGE_CDN_QUERY } from "../../infrastructure/query/query";
import { STAGED_UPLOAD_MUTATION, FILE_CREATE_MUTATION } from "../../infrastructure/mutation/mutation";
import { uploadWebpToShopifyType, StagedUploadParameterType } from "../../type/image/imageType";

export async function uploadWebpToShopify({
    admin, 
    buffer, 
    filename
  }: uploadWebpToShopifyType): Promise<string> {
    
  const webp = await sharp(buffer).webp({ 
    quality: 100, 
    lossless: true
  }).toBuffer();

  const stageRes = await admin.graphql(
    STAGED_UPLOAD_MUTATION, {
      variables: {
        input: [
          {
            filename,
            mimeType: "image/webp",
            httpMethod: "POST",
            resource: "FILE",
          },
        ],
      }, 
    }
  );
  const stageJson = await stageRes.json();
  const staged = stageJson.data?.
    stagedUploadsCreate?.stagedTargets?.[0];

  if (!staged) {
    const err = stageJson?.data?.
      stagedUploadsCreate?.userErrors ?? stageJson;
    throw new Error(
      `Failed to create staged upload: ${JSON.stringify(err)}`
    );
  }
  const form = new FormData();

  (staged.parameters || []).forEach((p: StagedUploadParameterType) =>
    form.append(p.name, p.value));

  form.append(
    "file",
    new Blob([
      new Uint8Array(webp)], 
      { type: "image/webp" }
    ),
    filename
  );

  const uploaded = await fetch(
    staged.url, {
      method: "POST",
      body: form,
    }
  );

  if (!uploaded.ok) {
    throw new Error(
      `Upload to staged url failed: ${await uploaded.text()}`
    );
  }
  
  const fileRes = await admin.graphql(
    FILE_CREATE_MUTATION, {
      variables: {
        files: [
          {
            contentType: "IMAGE",
            originalSource: staged.resourceUrl,
          },
        ],
      },  
    }
  );

  const fileJson = await fileRes.json();
  const file = fileJson?.data?.
    fileCreate?.files?.[0];
  const fileErrors = fileJson?.data?.
    fileCreate?.userErrors;

  if (!file) {
    throw new Error(
      `fileCreate failed: ${JSON.stringify(fileErrors ?? fileJson)}`
    );
  }
  while (true) {
    const res = await admin.graphql(
      GET_IMAGE_CDN_QUERY, { 
        variables: { 
          id: file.id 
        }
      }
    );
    const json = await res.json();
    const node = json.data?.node;

    const mediaImageUrl = node?.image?.url;
    const genericUrl = node?.url;
    const videoPreviewUrl = node?.preview?.image?.url;

    const url = mediaImageUrl || genericUrl || videoPreviewUrl;

    if (url) {
      return url;
    } 
    await new Promise((r) => setTimeout(r, 250));
  }
}