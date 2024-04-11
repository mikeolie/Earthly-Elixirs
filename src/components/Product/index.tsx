import { StripeProduct } from "../../@types";
import { useAppSelector } from "../../config/hooks";
import capitalize from "../../helpers/capitalize";
import formatMonetaryValue from "../../helpers/formatMonetaryValue";

interface ProductProps {
  data: StripeProduct;
}

function Product({ data }: ProductProps): JSX.Element {
  const prices = useAppSelector((state) => state.prices.prices);
  const priceId = data.default_price.id;
  const foundPrice = prices.find((price) => price.id === priceId);
  const price = foundPrice
    ? formatMonetaryValue(foundPrice.unit_amount.toString())
    : "Price not found";
  const productName = data.name;
  const imgToShow = data.images[0];
  const category =
    data.metadata.category && data.metadata.category.length > 0
      ? capitalize(data.metadata.category)
      : "";
  return (
    <article className="flex flex-col items-center justify-center w-48">
      <figure className="w-full h-32">
        <img
          src={imgToShow}
          className="object-cover w-full h-full"
          alt={productName}
        />
      </figure>
      <h4>{productName}</h4>
      <h5>{price}</h5>
      <h6>{category}</h6>
    </article>
  );
}

export default Product;
