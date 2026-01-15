import { CSVFileUploader } from "app/src/components/product/CSVFileUploader";
import { ResultsDisplay } from "app/src/components/product/ResultsDisplay";
import { ModalMainGuide } from "app/src/components/product/ModalMainGuide";
export { loader, action } from "../adapters/controllers/routes/product.route";
import { useProductsLogic } from "app/src/hooks/product/csvSubmit";

export default function Index() {
  const { 
    handleSubmit, 
    isProcessing, 
    results
  } = useProductsLogic();

  return (
    <s-page 
      heading="Smart Tools - Products"
    >
      <s-box
        padding="base"
        background="base"
        borderRadius="base"
        borderWidth="base"
        borderColor="base"
      >
        <s-stack gap="base">
          <s-grid
            gridTemplateColumns="1fr auto"
            gap="base"
            alignItems="center"
          >
            <s-heading>
              Products Importer
            </s-heading>
            <s-button 
              commandFor="info-modal" 
              command="--show"
            >
              <s-icon 
                type="question-circle"
              />
            </s-button>
          </s-grid>
          <s-text>
            This importer allows you to update product and variant data using SKUs.
          </s-text>
          <CSVFileUploader
            onSubmit={handleSubmit}
            isProcessing={isProcessing}
          />
          <ResultsDisplay
            data={results}
          />
        </s-stack>
      </s-box>
      <ModalMainGuide />  
    </s-page>
  );
}
