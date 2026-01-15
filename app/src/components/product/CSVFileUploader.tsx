import { useState, useCallback } from "react";
import { CSVFileUploaderPropsType } from "app/type/product/productType";

export function CSVFileUploader({ 
  onSubmit, 
  isProcessing
}: CSVFileUploaderPropsType) {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");

  const handleFileChange = useCallback(
    (event: any) => {
      setFileError("");
      
      const files = event.target?.files;

      if (!files || files.length === 0) {
        setFileError("Please select a valid CSV file.");
        return;
      }
      
      const selectedFile = files[0];
      
      if (!selectedFile.name.endsWith('.csv')) {
        setFileError("Please select a valid CSV file.");
        return;
      }
      
      setFile(selectedFile);
    },
    [],
  );

  const handleRemoveFile = useCallback(() => {
    setFile(null);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!file) {
      setFileError("Please select a CSV file before proceeding.");
      return;
    }

    onSubmit(file);
  }, [file, onSubmit]);

  return (
    <s-stack gap="base">
      <s-drop-zone
        accept=".csv"
        name="csvFile"
        onChange={handleFileChange}
      >
        {!file ? (
          <>
            <s-button>
              Add CSV File
              </s-button>
            <s-text>
              Or drop a CSV file to upload.
            </s-text>
          </>
        ) : (
          <s-box
            padding="base"
            background="base"
            borderWidth="base"
            borderRadius="base"
            borderColor="base"
          >
            <s-grid 
              gridTemplateColumns="1fr auto" 
              gap="base" 
              alignItems="center"
            >
              <s-text>
                {file.name} ({
                  (file.size / 1024).toFixed(2)
                } KB)
              </s-text>
              <s-button 
                onClick={handleRemoveFile}
              >
                Remove
              </s-button>
            </s-grid>
          </s-box>
        )}
      </s-drop-zone>
      {fileError && (
        <s-banner tone="critical">
          {fileError}
        </s-banner>
      )}
      <s-button 
        onClick={handleSubmit} 
        disabled={!file || isProcessing}
      >
        { isProcessing ? "Processing..." : "Import Data" }
      </s-button>
    </s-stack>
  );
} 