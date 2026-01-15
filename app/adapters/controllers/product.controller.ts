import { processCSV } from "app/application/products/processCsv.usecase";
import { updateMetafields } from "app/application/products/updateMetafield.usecase";
import { fetchCsv } from "app/infrastructure/http/fetchCsv.adapter";
import { ProductControllerType } from "app/type/product/productType";

export async function ProductController({
  admin, request
}: ProductControllerType) {

  const csvResult = await fetchCsv(request);

  if (!csvResult.success) {
    return {
      success: false,
      message: "Failed to fetch CSV file",
      status: 400
    }
  }

  const metafieldsData = processCSV(
    csvResult.fileContent
  );
  const results = await updateMetafields({
    admin, 
    data: metafieldsData
  });
  
  const successCount = results.filter(
    r => r.success
  ).length;
  const failureCount = results.filter(
    r => !r.success
  ).length;
  const summary = `
    ${successCount} successful, ${failureCount} failed
  `;

  return {
    success: successCount > 0,
    message: `Data processing completed: ${summary}`,
    results,
  };
}