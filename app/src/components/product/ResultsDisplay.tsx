import { ResultsDisplayPropsType } from "app/type/product/productType";

export function ResultsDisplay({ 
  data
}: ResultsDisplayPropsType) {
  if (!data) {
    return null;
  }

  return (
    <s-stack 
      gap="base"
    >
      <s-divider/>
      <s-banner 
        tone={
          data.success ? "success" : "critical"
        }
      >
        <s-text> 
          {data.message}
        </s-text>
      </s-banner>
      {data.success && data.results && (
        <s-box
          padding="base"
          background="base"
          borderWidth="base"
          borderRadius="base"
          borderColor="base"
        >
          <s-stack gap="none">
            {JSON.stringify(data.results, null, 3)
              .replace(/\\"/g, '"')
              .replace(/"([a-zA-Z0-9_-]+)"/g, '$1')
              .replace(/,/g, ', ')
              .split("\n")
              .map((line, index) => {
                const withNbsp = line.replace(
                  /^ +/g, (spaces) => 
                    "\u00a0".repeat(spaces.length)
                );
                return (
                  <s-text 
                    key={index} 
                    color="subdued"
                  >
                    {withNbsp === "" ? "\u00a0" : withNbsp}
                  </s-text>
                );
              })}
          </s-stack>
        </s-box>
      )}
    </s-stack>
  );
} 