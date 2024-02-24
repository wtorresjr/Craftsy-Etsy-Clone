import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import FavoritesPage from "./components/Favorite-Components/FavoritesPage";

import OrderPage from "./components/OrdersPage";
import CartPage from "./components/CartPage";

import ShopManagerPage from "./components/ShopManagerPage";
import CreateProduct from "./components/CreateProduct";
import ProductDetailPage from "./components/ProductDetailPage";
import UpdateProduct from "./components/UpdateProduct";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const allProducts = useSelector((state) => state?.products?.allProducts);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <ProtectedRoute path="/products/:product_id/edit">
            <UpdateProduct />
          </ProtectedRoute>
          <Route path="/products/:productId">
            <ProductDetailPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <ProtectedRoute path="/favorites">
            <FavoritesPage />
          </ProtectedRoute>
          <ProtectedRoute path="/shop-manager">
            <ShopManagerPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/cart">
            <CartPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/previous-orders">
            <OrderPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/create-a-product">
            <CreateProduct />
          </ProtectedRoute>

          {/* <Route path="">
            <h1>Page not found</h1>
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
