export function CSVMetafieldFormatGuide() {
  return (
    <s-stack 
      gap="large"
    >
      <s-text 
        type="strong"
      >
        Metafields Import Guide
      </s-text>
      <s-stack 
        gap="large"
      >
        <s-text>
          To import metafields, follow these instructions:
        </s-text>
        <s-unordered-list>
          <s-list-item>
            The first column must be the product SKU
            </s-list-item>
          <s-list-item>
            The following columns must follow the format target.namespace.key[type]
            </s-list-item>
          <s-list-item> 
            target: product or variant
            </s-list-item>
          <s-list-item>  
            namespace: your custom namespace (ex: "custom")
            </s-list-item>
          <s-list-item> 
            key: the metafield name
            </s-list-item>
          <s-list-item> 
            type: the metafield type in brackets
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
          gridTemplateColumns="max-content max-content max-content" 
          columnGap="small-100" 
          rowGap="none"
        >
          <s-text 
            color="subdued"
          >sku
          </s-text>
          <s-text 
            color="subdued"
          >
            product.custom.sizes[list.single_line_text_field]
          </s-text>
          <s-text 
            color="subdued"
          >
            variant.custom.stock[number_integer]
          </s-text>
          <s-text 
            color="subdued"
          >
            ABC123
          </s-text>
          <s-text 
            color="subdued"
          >
            [Small,Medium,Large]
          </s-text>
          <s-text 
            color="subdued"
          >
            100
          </s-text>
          <s-text 
            color="subdued"
          >
            DEF456
          </s-text>
          <s-text 
            color="subdued"
          >
            [Medium,Large,XLarge]
          </s-text>
          <s-text
            color="subdued"
          >
            50
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
          <s-list-item>
            For arrays, use square brackets and separate values with commas. The system will automatically convert them to the correct format.
          </s-list-item>
          <s-list-item>
            Arrays will be stored as JSON strings in Shopify.
          </s-list-item>
        </s-unordered-list>
      </s-stack>
    </s-stack>
  );
} 