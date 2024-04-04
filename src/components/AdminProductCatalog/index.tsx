import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

import AdminProduct from "./AdminProduct";
import DefaultSnackbar from "../../common/DefaultSnackbar";
import DeleteConfirmModal from "../../common/DeleteConfirmModal";

import {
  DefaultAxiosResponse,
  SNACKBAR_STATUSES,
  StripeProduct,
} from "../../@types";
import { useAppDispatch } from "../../config/hooks";
import { DELETE_PRODUCT, deleteProduct } from "../../actions/products";

interface AdminProductCatalogProps {
  adminProducts: StripeProduct[];
}

function AdminProductCatalog({
  adminProducts,
}: AdminProductCatalogProps): JSX.Element {
  const [isEditing, toggleEditMode] = useState<boolean>(false);
  const [deleteMessage, setDeleteMessage] = useState<string>("");
  const [isDeleteModalOpen, toggleDeleteModal] = useState<boolean>(false);
  const [isSnackbarOpen, toggleSnackbar] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<StripeProduct>();
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<SNACKBAR_STATUSES>(
    SNACKBAR_STATUSES.INFO
  );
  const showSnackbar = (message: string, severity: SNACKBAR_STATUSES): void => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    toggleSnackbar(true);
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleEditProductsClick = (): void => {
    toggleEditMode(!isEditing);
  };
  const handleEditIconClick = (product: StripeProduct): void => {
    navigate(`/manageproduct/${product.id}`);
  };
  const handleDeleteIconClick = (product: StripeProduct): void => {
    setDeleteMessage(`Are you sure you want to delete ${product.name}`);
    toggleDeleteModal(true);
    setProductToDelete(product);
  };
  const handleDeleteProduct = async (): Promise<void> => {
    // manage delete product
    if (productToDelete !== undefined) {
      const productId = productToDelete.id;
      const response: DefaultAxiosResponse = dispatch(deleteProduct(productId));
      if (response.type !== `${DELETE_PRODUCT}/fulfilled`) {
        showSnackbar(
          "Unable to delete product, contact mike",
          SNACKBAR_STATUSES.ERROR
        );
        return;
      }
      showSnackbar("Product deleted", SNACKBAR_STATUSES.SUCCESS);
    }
    showSnackbar(
      "Unable to delete product, contact mike",
      SNACKBAR_STATUSES.ERROR
    );
  };
  const closeDeleteModal = (): void => {
    toggleDeleteModal(false);
  };
  const productsToRender = adminProducts.map((product) => (
    <AdminProduct
      handleDeleteIconClick={handleDeleteIconClick}
      handleEditIconClick={handleEditIconClick}
      inEditMode={isEditing}
      data={product}
      key={product.id}
    />
  ));
  const editButtonText = isEditing ? "Finish Editing" : "Edit Products";
  return (
    <div>
      <section className="flex flex-row justify-between">
        <header>Admin Products</header>
        <article>
          <Button
            color="warning"
            onClick={handleEditProductsClick}
            aria-label="Edit Products"
            startIcon={<EditIcon />}
          >
            {editButtonText}
          </Button>
        </article>
      </section>
      <section className="flex flex-wrap justify-center gap-4">
        {productsToRender}
      </section>
      <DeleteConfirmModal
        deleteMessage={deleteMessage}
        handleClose={closeDeleteModal}
        isOpen={isDeleteModalOpen}
        handleDelete={handleDeleteProduct}
      />
      <DefaultSnackbar
        setSnackbar={toggleSnackbar}
        isOpen={isSnackbarOpen}
        severity={snackbarSeverity}
        snackbarMessage={snackbarMessage}
      />
    </div>
  );
}

export default AdminProductCatalog;
