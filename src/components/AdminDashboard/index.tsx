import { useEffect, useState } from "react";

import AdminProduct from "./AdminProduct";

import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { clearAdminProducts, getAdminProducts } from "../../actions/products";
import { clearPrices, getPrices } from "../../actions/prices";
import AdminLayout from "../../layout/AdminLayout";

function AdminDashboard(): JSX.Element {
  const [selectedTab, setTab] = useState<number>(0);
  const dispatch = useAppDispatch();
  const adminProducts = useAppSelector((state) => state.products.adminProducts);
  const contentOptions: Record<number, JSX.Element> = {
    0: (
      <div>
        <header>Admin Products</header>
        <section className="flex flex-wrap justify-center gap-4">
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
    dispatch(getPrices());
    () => {
      dispatch(clearAdminProducts());
      dispatch(clearPrices());
    };
  }, [dispatch]);
  const content = contentOptions[selectedTab];
  return <AdminLayout setTab={setTab}>{content}</AdminLayout>;
}

export default AdminDashboard;
