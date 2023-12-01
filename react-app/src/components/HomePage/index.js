import "./homepage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductTile from "../Product-Components/ProductTile";
import { getAllProducts } from "../../store/products";

import { loadCurrUserFavorites } from "../../store/favorite";

import { fetchReviews, fetchReviewById } from "../../store/reviews";

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
    <div className="mainProductDisplay">
      <div className="smallTileContain">
        <h3>Because You Viewed...</h3>
        {allProducts &&
          allProducts.map((product) => {
            return (
              <ProductTile
                key={product.id}
                product={product}
                prodTileImgStyle={"recentFaves"}
                tileContainerStyle={"productTileContain"}
                priceStyle={"hidden"}
              />
            );
          })}
      </div>
      {/* <div className="largeTileContain">
        {favoritedProducts && favoritedProducts.length > 4 && (
          <h3>Recently Favorited...</h3>
        )}
        {favoritedProducts &&
          favoritedProducts.length > 4 &&
          favoritedProducts.slice(0,5).map((product) => {
            return (
              <ProductTile
                key={product.id}
                product={product}
                prodTileImgStyle={"recentFaves"}
                tileContainerStyle={"productTileContain"}
              />
            );
          })}
      </div> */}
    </div>
  );
};

export default HomePage;
