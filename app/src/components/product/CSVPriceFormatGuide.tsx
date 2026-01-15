export function CSVPriceFormatGuide() {
  return (
    <s-stack 
      gap="large"
    >
      <s-text 
        type="strong"
      >
        Price Import Guide
      </s-text>
      <s-stack 
        gap="large"
      >
        <s-text>
          To import prices, follow these instructions:
        </s-text>
        <s-unordered-list>
          <s-list-item>
            The first column must be the product SKU
          </s-list-item>
          <s-list-item>
            The following column must follow the format price
          </s-list-item>
        </s-unordered-list>
      </s-stack>
      <s-text 
        type="strong"
      >
        CSV Example
      </s-text>
      <s-box
        padding="small-200"
        background="base"
        borderWidth="base"
        borderRadius="base"
        borderColor="base"
      >
          <s-grid 
            gridTemplateColumns="max-content max-content" 
            columnGap="small-100" 
            rowGap="none"
          >
          <s-text 
            color="subdued"
          >
            sku
          </s-text>
          <s-text 
            color="subdued"
          >
            price
          </s-text>
          <s-text 
            color="subdued"
          >
            ABC123
          </s-text>
          <s-text 
            color="subdued"
          >
            20000
          </s-text>
          <s-text 
            color="subdued"
          >
            DEF456
            </s-text>
          <s-text 
            color="subdued"
          >
            1000
          </s-text>
        </s-grid>
      </s-box>
      <s-text>
        Note: 
      </s-text>
      <s-stack 
        gap="large"
      >
        <s-unordered-list>
          <s-list-item>
            Ensure the SKU exists in Shopify. The system will automatically find the correct product or variant ID.
          </s-list-item>
        </s-unordered-list>
      </s-stack>
    </s-stack>
  );
} 