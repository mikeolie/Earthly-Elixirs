import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";

import store from "./store";

import AdminDashboard from "./components/AdminDashboard";
import CreateProductPage from "./components/CreateProductPage";
import ErrorPage from "./components/ErrorPage";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";

import "./App.css";

const theme = createTheme({});

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
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
