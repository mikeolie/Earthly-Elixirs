import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { clearAdminProducts, getAdminProducts } from "../../actions/products";
import { clearprices, getprices } from "../../actions/prices";
import AdminProduct from "./AdminProduct";

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
              <AdminProduct data={product} key={product.id} />
            ))}
        </section>
      </div>
    ),
  };
  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getprices());
    () => {
      dispatch(clearAdminProducts());
      dispatch(clearprices());
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
