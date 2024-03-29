import type { StripeProduct } from "../../@types";
import { useAppSelector } from "../../config/hooks";
import formatMonetaryValue from "../../helpers/formatMonetaryValue";

interface AdminProductProps {
  data: StripeProduct;
}
function AdminProduct({ data }: AdminProductProps): JSX.Element {
  const prices = useAppSelector((state) => state.prices.prices);
  const priceId = data.default_price.id;
  const foundPrice = prices.find((price) => price.id === priceId);
  const price = foundPrice
    ? formatMonetaryValue(foundPrice.unit_amount.toString())
    : "Price not found";
  const productName = data.name;
  const imgToShow = data.images[0];
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
    </article>
  );
}

export default AdminProduct;
