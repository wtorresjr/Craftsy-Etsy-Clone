import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import FavoritesPage from "./components/Favorite-Components/FavoritesPage";

import CartPage from "./components/CartPage";

import ShopManagerPage from "./components/ShopManagerPage";
import CreateProduct from "./components/CreateProduct";
import ProductDetailPage from "./components/ProductDetailPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
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
          <Route path="/products/:productId">
            <ProductDetailPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/favorites">
            <FavoritesPage />
          </Route>
          <Route path="/shop-manager">
            <ShopManagerPage />
          </Route>
          <Route exact path="/cart">
            <CartPage />
          </Route>
          <Route exact path="/create-a-product">
            <CreateProduct />
          </Route>

          {/* <Route path="">
            <h1>Page not found</h1>
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
