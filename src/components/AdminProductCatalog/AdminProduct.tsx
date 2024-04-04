import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteForever";

import type { StripeProduct } from "../../@types";
import { useAppSelector } from "../../config/hooks";
import formatMonetaryValue from "../../helpers/formatMonetaryValue";

interface AdminProductProps {
  data: StripeProduct;
  inEditMode: boolean;
  handleEditIconClick: (product: StripeProduct) => void;
  handleDeleteIconClick: (product: StripeProduct) => void;
}

function AdminProduct({
  data,
  inEditMode,
  handleDeleteIconClick,
  handleEditIconClick,
}: AdminProductProps): JSX.Element {
  const prices = useAppSelector((state) => state.prices.prices);
  const priceId = data.default_price.id;
  const foundPrice = prices.find((price) => price.id === priceId);
  const price = foundPrice
    ? formatMonetaryValue(foundPrice.unit_amount.toString())
    : "Price not found";
  const productName = data.name;
  const imgToShow = data.images[0];
  const handleDeleteClick = (): void => {
    handleDeleteIconClick(data);
  };
  const handleEditClick = (): void => {
    handleEditIconClick(data);
  };
  return (
    <article className="flex flex-col items-center justify-center w-48">
      <figure className="w-full h-32">
        <img
          src={imgToShow}
          className="object-cover w-full h-full"
          alt={productName}
        />
      </figure>
      <h6>{productName}</h6>
      <p>{price}</p>
      {inEditMode && (
        <article>
          <IconButton
            color="error"
            onClick={handleDeleteClick}
            aria-label="Delete"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="warning"
            onClick={handleEditClick}
            aria-label="Edit"
          >
            <EditIcon />
          </IconButton>
        </article>
      )}
    </article>
  );
}

export default AdminProduct;
