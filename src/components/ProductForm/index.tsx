import React, { useState } from "react";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import { NumericFormat } from "react-number-format";

import ImageUploader from "../common/ImageUploader";

import type { ProductFormData } from "../../@types";
import { PRODUCT_CATEGORIES } from "../../constants";

import capitalize from "../../helpers/capitalize";

interface ProductFormProps {
  data: ProductFormData;
  handleFormUpdate: (key: keyof ProductFormData, value: string) => void;
}

function ProductForm({
  data,
  handleFormUpdate,
}: ProductFormProps): JSX.Element {
  const [filesToUpload, updateFilesToUpload] = useState<(File | null)[]>([
    null,
  ]); // Initialize with null
  const [formattedUnitAmount, setFormattedUnitAmount] = useState<string>(
    data.unitAmount.toString()
  );
  const MAX_FILES = 8;

  const setNewFile = (file: File, index: number): void => {
    const copyOfState = [...filesToUpload];
    copyOfState[index] = file;
    updateFilesToUpload(copyOfState);
  };

  const imageUploader = () => {
    return filesToUpload.map((file, index) => (
      <ImageUploader
        key={index}
        index={index}
        file={file}
        setFile={setNewFile}
      />
    ));
  };

  const addAnotherImage = () => {
    if (filesToUpload.length < MAX_FILES) {
      updateFilesToUpload([...filesToUpload, null]); // Add a null placeholder for a new file
    }
  };

  const updateProductName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleFormUpdate("productName", e.target.value);
  };
  const updateDescription = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleFormUpdate("description", e.target.value);
  };

  const updateUnitAmount = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleFormUpdate("unitAmount", e.target.value);
    setFormattedUnitAmount(e.target.value);
  };
  const updateCategory = (e: SelectChangeEvent): void => {
    handleFormUpdate("category", e.target.value);
  };
  const categoryOptions = PRODUCT_CATEGORIES.map((category) => (
    <MenuItem key={category} value={category}>
      {capitalize(category)}
    </MenuItem>
  ));
  return (
    <form className="flex flex-row gap-8">
      <article className="flex flex-col gap-4">
        <TextField
          onChange={updateProductName}
          variant="filled"
          value={data.productName}
          type="text"
          label="Product Name"
        />
        <NumericFormat
          value={formattedUnitAmount}
          thousandSeparator=","
          customInput={TextField}
          label="Unit Amount"
          onChange={updateUnitAmount}
        />
        <TextField
          onChange={updateDescription}
          variant="filled"
          value={data.description}
          type="text"
          label="Description"
        />
        <Select
          type="text"
          value={data.category}
          label="Category"
          onChange={updateCategory}
        >
          {categoryOptions}
        </Select>
      </article>
      <article>
        {imageUploader()}
        {filesToUpload.length < MAX_FILES && (
          <div>
            {filesToUpload[filesToUpload.length - 1] !== null && (
              <Button onClick={addAnotherImage}>Add Another Image</Button>
            )}
          </div>
        )}
      </article>
    </form>
  );
}

export default ProductForm;
