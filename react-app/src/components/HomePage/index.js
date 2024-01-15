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
  }, []);

  return (
    <div className="mainProductDisplay">
      <div className="smallTileContain">
        {favoritedProducts && favoritedProducts.length > 4 ? (
          <DynaProductDisplay
            favoritedProducts={favoritedProducts}
            allProducts={allProducts}
            numOfProducts={5}
            mainText={""}
            secondaryText={"Recently Favorited"}
            // componentStyle={""}
            priceStyle={"mediumContainer"}
            isFavorite={"true"}
          />
        ) : null}
      </div>
      <div className="smallTileContain">
        {allProducts.length ? (
          <>
            <DynaProductDisplay
              allProducts={allProducts}
              numOfProducts={8}
              mainText={""}
              secondaryText={"Because you viewed"}
              priceStyle={"smallContainer"}
              // componentStyle={""}
              isFavorite={"false"}
            />
            <DynaProductDisplay
              allProducts={allProducts}
              numOfProducts={3}
              mainText={""}
              secondaryText={"Shop our selections"}
              priceStyle={"largeContainer"}
              // componentStyle={""}
              isFavorite={"false"}
            />
          </>
        ) : (
          "...Loading"
        )}
        {/* <div className="smallTileContain">
          {allProducts &&
            allProducts?.map((product) => {
              return (
                <ProductTile
                  key={product.id}
                  product={product}
                  prodTileImgStyle={"becauseViewed"}
                  tileContainerStyle={"productTileContain"}
                  // priceStyle={"hidden"}
                />
              );
            })}
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;
