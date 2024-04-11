import { useEffect, useState } from "react";

import HomeMenu from "../../components/HomeMenu";
import Product from "../../components/Product";

import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { clearProducts, getProducts } from "../../actions/products";
import { clearPrices, getPrices } from "../../actions/prices";
import capitalize from "../../helpers/capitalize";
import { PRODUCT_CATEGORY } from "../../@types";
import { HOME_CATEGORY_KEY, PRODUCT_CATEGORIES } from "../../constants";

function HomePage(): JSX.Element {
  const initialCategory =
    (localStorage.getItem(HOME_CATEGORY_KEY) as PRODUCT_CATEGORY) ||
    PRODUCT_CATEGORY.ALL;
  const [selectedCategory, setCategory] =
    useState<PRODUCT_CATEGORY>(initialCategory);
  const handleCategoryClick = (category: PRODUCT_CATEGORY): void => {
    setCategory(category);
    localStorage.setItem(HOME_CATEGORY_KEY, category);
    dispatch(getProducts());
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getPrices());
    () => {
      dispatch(clearProducts());
      dispatch(clearPrices());
    };
  }, [dispatch]);
  const categories = PRODUCT_CATEGORIES.map((category) => {
    const handleClick = (): void => {
      handleCategoryClick(category);
    };
    const isSelected = category === selectedCategory;
    const className = isSelected ? "category category--selected" : "category";
    return (
      <button
        className={`${className} p-3 px-4`}
        onClick={handleClick}
        key={category}
      >
        {capitalize(category)}
      </button>
    );
  });
  const products = useAppSelector((state) => state.products.products);
  const homeProducts =
    products !== undefined &&
    products !== null &&
    products.map((product) => <Product key={product.id} data={product} />);
  return (
    <div>
      <HomeMenu />
      <div className="splash-page flex flex-col justify-between py-36">
        <h3 className="main-font splash-page__text text-6xl px-40">
          Unlock the Power of CBD & Elevate Your Wellness Journey!
        </h3>
        <button className="shop-button w-1/3 ml-40">
          <span className="main-font text-3xl">Shop</span>
        </button>
      </div>
      <div className="p-7">
        <section className="mb-12">
          <h4 className="main-font text-4xl">Shop By</h4>
        </section>
        <section className="mb-12 flex flex-col">
          <h4 className="main-font text-4xl mb-8">Categories</h4>
          <section className="w-2/3 flex justify-around secondary-font">
            {categories}
          </section>
        </section>
        <section className="flex flex-wrap">{homeProducts}</section>
      </div>
    </div>
  );
}

export default HomePage;
