import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";

import store from "./store";

import AdminDashboard from "./pages/AdminDashboard";
import CreateProductPage from "./pages/CreateProductPage";
import ErrorPage from "./components/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ManageProductPage from "./pages/ManageProductPage";
import PageTitle from "./common/PageTitle";

import "./App.css";

const theme = createTheme({});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <PageTitle title="Earthly Elixirs | Home" />
        <HomePage />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <>
        <PageTitle title="Earthly Elixirs | Login Page" />
        <LoginPage />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <PageTitle title="Earthly Elixirs | Admin Dashboard" />
        <AdminDashboard />
      </>
    ),
  },
  {
    path: "/createproduct",
    element: (
      <>
        <PageTitle title="Earthly Elixirs | Create Product" />
        <CreateProductPage />
      </>
    ),
  },
  {
    path: "/manageproduct/:productId",
    element: (
      <>
        <PageTitle title="Earthly Elixirs | Manage Product" />
        <ManageProductPage />
      </>
    ),
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
