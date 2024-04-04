import { useEffect, useState } from "react";

import AdminProductCatalog from "../../components/AdminProductCatalog";
import AdminLayout from "../../layout/AdminLayout";

import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { clearAdminProducts, getAdminProducts } from "../../actions/products";
import { clearPrices, getPrices } from "../../actions/prices";

function AdminDashboard(): JSX.Element {
  const [selectedTab, setTab] = useState<number>(0);
  const dispatch = useAppDispatch();
  const adminProducts = useAppSelector((state) => state.products.adminProducts);
  const contentOptions: Record<number, JSX.Element> = {
    0: <AdminProductCatalog adminProducts={adminProducts} />,
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
