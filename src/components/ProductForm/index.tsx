import React, { useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import { NumericFormat } from "react-number-format";

import ImageUploader from "../common/ImageUploader";

import type { ImageState, ProductFormData } from "../../@types";
import { PRODUCT_CATEGORIES } from "../../constants";

import capitalize from "../../helpers/capitalize";

interface ProductFormProps {
  data: ProductFormData;
  handleFormUpdate: (
    key: keyof ProductFormData,
    value: string | ImageState[]
  ) => void;
  updateImagesToUpload: React.Dispatch<React.SetStateAction<ImageState[]>>;
  imagesToUpload: ImageState[];
}

function ProductForm({
  data,
  handleFormUpdate,
  imagesToUpload,
  updateImagesToUpload,
}: ProductFormProps): JSX.Element {
  const [formattedUnitAmount, setFormattedUnitAmount] = useState<string>(
    data.unitAmount.toString()
  );

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
        <ImageUploader
          imagesToUpload={imagesToUpload}
          handleUpdateImages={updateImagesToUpload}
        />
      </article>
    </form>
  );
}

export default ProductForm;
