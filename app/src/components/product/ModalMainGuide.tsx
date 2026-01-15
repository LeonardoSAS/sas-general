import { CSVMetafieldFormatGuide } from "./CSVMetafieldFormatGuide";
import { CSVPriceFormatGuide } from "./CSVPriceFormatGuide";

export function ModalMainGuide() {
  return (
    <s-modal 
      id="info-modal" 
      heading="Import Instructions" 
      size="large"
    >
      <s-stack 
        gap="large"
      >
        <s-text 
          type="strong"
        >
          Import Process:
        </s-text>
        <s-stack 
          gap="large"
        >
          <s-unordered-list>
            <s-list-item>
              Prepare your CSV file with SKUs and data (see guides below)
            </s-list-item>
            <s-list-item>
              Upload the file using the button below
            </s-list-item>
            <s-list-item>
              Search for products/variants by SKUs
            </s-list-item>
            <s-list-item>
              Automatically detect value types
            </s-list-item>
            <s-list-item>
              Update the corresponding data
            </s-list-item>
            <s-list-item>
              You will receive a detailed import report
            </s-list-item>
          </s-unordered-list>
        </s-stack>
        <s-box>
          <CSVMetafieldFormatGuide />
        </s-box>
        <s-box>
          <CSVPriceFormatGuide />
        </s-box>
      </s-stack>
      <s-button 
        slot="secondary-actions" 
        commandFor="info-modal" 
        command="--hide"
      >
        Close
      </s-button>
    </s-modal>
  );
}