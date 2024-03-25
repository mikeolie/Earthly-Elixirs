import { useState } from "react";

import Button from "@mui/material/Button";

import ImageUploader from "../common/ImageUploader";

import type { ProductFormData } from "../../@types";

interface ProductFormProps {
  data: ProductFormData;
  handleFormUpdate: (key: keyof ProductFormData, value: string) => void;
}

function ProductForm({ data }: ProductFormProps): JSX.Element {
  const [filesToUpload, updateFilesToUpload] = useState<File[]>([]);
  const MAX_FILES = 8;
  const imageUploader =
    filesToUpload.length > 0
      ? () =>
          filesToUpload.map((file, index) => {
            const updateFile = (file: File): void => {
              const copyOfState = JSON.parse(JSON.stringify(filesToUpload));
              copyOfState[index] = file;
              updateFilesToUpload(copyOfState);
            };
            return (
              <article>
                <ImageUploader file={file} setFile={updateFile} />;
                {filesToUpload.length <= MAX_FILES && file.name.length > 0 && (
                  <Button>Add Another Image</Button>
                )}
              </article>
            );
          })
      : () => {
          const updateFile = (file: File): void => {
            const copyOfState = JSON.parse(JSON.stringify(filesToUpload));
            copyOfState[0] = file;
            updateFilesToUpload(copyOfState);
          };
          const fileToUse = filesToUpload[0];
          return <ImageUploader file={fileToUse} setFile={updateFile} />;
        };
  return (
    <form>
      <header></header>
      <input value={data.productName} />
      {imageUploader()}
    </form>
  );
}

export default ProductForm;
