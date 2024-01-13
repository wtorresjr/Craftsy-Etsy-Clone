import "./homepage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductTile from "../Product-Components/ProductTile";
import { getAllProducts } from "../../store/products";

import { loadCurrUserFavorites } from "../../store/favorite";
import DynaProductDisplay from "../Product-Components/DynaProductDisplay";

const HomePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state?.session?.user);
  const allProducts = useSelector((state) => state?.products?.allProducts);
  const favoritedProducts = useSelector(
    (state) => state?.favorite?.allFavorites
  );

  useEffect(() => {
    dispatch(getAllProducts());
    if (sessionUser !== null) {
      dispatch(loadCurrUserFavorites());
    }
  }, [dispatch, sessionUser]);

  return (
    <div className="mainProductDisplay">
      <div className="smallTileContain">
        {favoritedProducts && favoritedProducts.length > 4 ? (
          <>
            <DynaProductDisplay
              allProducts={favoritedProducts}
              numOfProducts={5}
              secondaryText={"Recently Favorited"}
            />
          </>
        ) : null}
      </div>
      <div className="smallTileContain">
        {allProducts.length ? (
          <>
            <DynaProductDisplay
              allProducts={allProducts}
              numOfProducts={4}
              mainText={"Because you viewed..."}
              secondaryText={"Secondary text"}
              componentStyle={""}
            />
            <DynaProductDisplay
              allProducts={allProducts}
              numOfProducts={3}
              mainText={"Collections you might like"}
              secondaryText={"Test Text Secondary"}
              componentStyle={""}
            />
          </>
        ) : (
          "...Loading"
        )}
        {/* <h3>Because You Viewed...</h3> */}
        {/* {allProducts &&
          allProducts.slice(0).map((product) => {
            return (
              <ProductTile
                key={product.id}
                product={product}
                prodTileImgStyle={"becauseViewed"}
                tileContainerStyle={"productTileContain"}
                // priceStyle={"hidden"}
              />
            );
          })} */}
      </div>
    </div>
  );
};

export default HomePage;
