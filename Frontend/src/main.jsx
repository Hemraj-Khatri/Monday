import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import "./index.css";
import CartPage from "./pages/CartPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ShippingPage from "./pages/ShippingPage.jsx";
import { store } from "./store.js";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route path="shipping" element={<ShippingPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
