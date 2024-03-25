import { useState } from "react";

import ProductForm from "../ProductForm";

import type { ProductFormData } from "../../@types";
import { INITIAL_PRODUCT_FORM } from "../../constants";

function CreateProductPage(): JSX.Element {
  const [formData, updateFormData] =
    useState<ProductFormData>(INITIAL_PRODUCT_FORM);
  const handleFormUpdate = <K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ): void => {
    const copyOfState = JSON.parse(JSON.stringify(formData));
    copyOfState[key] = value;
    updateFormData(copyOfState);
  };
  return (
    <div>
      <nav></nav>
      <main>
        <header>Create Product</header>
        <ProductForm data={formData} handleFormUpdate={handleFormUpdate} />
      </main>
    </div>
  );
}

export default CreateProductPage;
