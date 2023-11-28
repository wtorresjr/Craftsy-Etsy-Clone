import "./homepage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductTile from "../Product-Components/ProductTile";
import RecentlyFaved from "../Product-Components/Recently-Faved-Products";
import { getAllProducts } from "../../store/products";

import { loadCurrUserFavorites } from "../../store/favorite";

const HomePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allProducts = useSelector((state) => state?.products?.allProducts);
  const favoritedProducts = useSelector(
    (state) => state?.favorite?.allFavorites
  );

  useEffect(() => {
    dispatch(getAllProducts());
    if (sessionUser) {
      dispatch(loadCurrUserFavorites());
    }
  }, [dispatch, sessionUser]);

  return (
    <>
      <div className="mainProductDisplay">
        {favoritedProducts && favoritedProducts.length > 4 && (
          <RecentlyFaved favorited={favoritedProducts} />
        )}
        {allProducts &&
          allProducts.map((product) => {
            return (
              <ProductTile
                key={product.id}
                product={product}
                favoritedProducts={favoritedProducts}
              />
            );
          })}
      </div>
    </>
  );
};

export default HomePage;
