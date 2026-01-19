 export function BackHome() {
  return (
    <>
      <div style={{ 
        fontSize: "18px", 
        fontWeight: "600", 
        color: "#212121",
        padding: "5px 16px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        fontFamily: "Arial, sans-serif"
      }}>
        <s-button 
          href="/app"
          variant="tertiary"
          icon="arrow-left"
          tone="neutral"
        >
        </s-button>
        <h3 style={{ 
          margin: "0", 
          padding: "0",
          lineHeight: "1"
        }}>
          Home Page
        </h3>
      </div>
    </>
  );
}
