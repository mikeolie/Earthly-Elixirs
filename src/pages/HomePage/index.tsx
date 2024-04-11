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
  const homeProducts =
    products !== undefined &&
    products.map((product) => <Product key={product.id} data={product} />);
  return (
    <div>
      <HomeMenu />
      <div className="splash-page flex flex-col justify-between">
        <h3 className="main-font splash-page__text text-6xl pt-44 px-40">
          Unlock the Power of CBD & Elevate Your Wellness Journey!
        </h3>
        <button className="shop-button w-1/3 ml-40">
          <span className="main-font text-2xl">Shop</span>
        </button>
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
