import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import AdminDashboard from "./components/AdminDashboard";
import CreateProductPage from "./components/CreateProductPage";
import ErrorPage from "./components/ErrorPage";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/createproduct",
    element: <CreateProductPage />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />;
    </Provider>
  );
}

export default App;
