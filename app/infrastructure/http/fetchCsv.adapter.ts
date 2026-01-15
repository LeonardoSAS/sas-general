import busboy from "busboy";
import { FetchCsvResultType } from "app/type/product/productType";

export async function fetchCsv(
    request: Request
): Promise<FetchCsvResultType> {

  const contentType = request.headers.get("content-type");
  
  if (!contentType || !contentType.includes("multipart/form-data")) {
    return { 
        success: false, 
        fileContent: ""
    };
  }

  try {
    let fileContent = "";
    const localChunks: Buffer[] = [];

    await new Promise<void>((
      resolve, reject
    ) => {
    
      const bb = busboy({
        headers: { 
          "content-type": contentType 
        }
      });

      bb.on("file", (name, file) => {
        if (name !== "csvFile") {
          file.resume();
            return;
        }
      
        file.on("data", (chunk) => localChunks.push(chunk));
        file.on("end", () => {
          fileContent = Buffer.concat(localChunks).toString("utf-8");
        });
      });

      bb.on("finish", resolve);
      bb.on("error", reject);

      request.body?.pipeTo(
        new WritableStream({
          write(chunk) {
            bb.write(chunk);
          },
          close() {
            bb.end();
          },
        })
      );
    });
    return { 
      success: fileContent.length > 0, 
      fileContent
    };
  } 
  catch {
    return { 
      success: false, 
      fileContent: ""
    };
  }
}