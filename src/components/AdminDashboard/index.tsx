import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { clearAdminProducts, getAdminProducts } from "../../actions/products";
import { clearAdminPrices, getAdminPrices } from "../../actions/prices";

function AdminDashboard(): JSX.Element {
  const [selectedTab, setTab] = useState<number>(0);
  const dispatch = useAppDispatch();
  const adminProducts = useAppSelector((state) => state.products.adminProducts);
  const contentOptions: Record<number, JSX.Element> = {
    0: (
      <div>
        <header>Admin Products</header>
        <section>
          {Array.isArray(adminProducts) &&
            adminProducts.map((product) => (
              <article key={product.id}>
                <figure>
                  <img src={product.images[0]} />
                </figure>
                <h6>{product.name}</h6>
              </article>
            ))}
        </section>
      </div>
    ),
  };
  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAdminPrices());
    () => {
      dispatch(clearAdminProducts());
      dispatch(clearAdminPrices());
    };
  }, [dispatch]);
  const content = contentOptions[selectedTab];
  return (
    <div>
      <menu>
        <header>Earthly Elixirs</header>
        <ul>
          <li
            onClick={() => {
              setTab(0);
            }}
          >
            Products
          </li>
        </ul>
      </menu>
      <main>{content}</main>
    </div>
  );
}

export default AdminDashboard;
