import { useEffect } from "react";

import HomeMenu from "../../components/HomeMenu";
import Product from "../../components/Product";

import { PRODUCT_CATEGORIES } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { clearProducts, getProducts } from "../../actions/products";
import { clearPrices, getPrices } from "../../actions/prices";
import capitalize from "../../helpers/capitalize";

function HomePage(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getPrices());
    () => {
      dispatch(clearProducts());
      dispatch(clearPrices());
    };
  }, [dispatch]);
  const categories = PRODUCT_CATEGORIES.map((category) => (
    <button key={category}>{capitalize(category)}</button>
  ));
  const products = useAppSelector((state) => state.products.products);
  const homeProducts = products.map((product) => (
    <Product key={product.id} data={product} />
  ));
  return (
    <div>
      <HomeMenu />
      <div className="splash-page">
        <h3>Unlock the Power of CBD & Elevate Your Wellness Journey!</h3>
        <button>Shop</button>
      </div>
      <div>
        <section>
          <h4>Shop By</h4>
        </section>
        <section>
          <h4>Categories</h4>
          <section>{categories}</section>
        </section>
        <section>{homeProducts}</section>
      </div>
    </div>
  );
}

export default HomePage;
