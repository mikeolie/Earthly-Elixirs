import type { StripeProduct } from "../../@types";
import { useAppSelector } from "../../config/hooks";

interface AdminProductProps {
  data: StripeProduct;
}
function AdminProduct({ data }: AdminProductProps): JSX.Element {
	const prices = useAppSelector(state => state.prices.prices)
	const priceId = data.default_price.id
	const foundPrice = prices.find(price => price.id === priceId)
	const price = foundPrice ? foundPrice.unit_amount : "Price not found"	
  const productName = data.name;
  return (
    <article>
      <figure></figure>
      <h6>{productName}</h6>
			<p>{price}</p>
    </article>
  );
}

export default AdminProduct;
