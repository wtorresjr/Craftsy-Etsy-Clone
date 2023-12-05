import "./homepage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductTile from "../Product-Components/ProductTile";
import { getAllProducts } from "../../store/products";
import SellerSpotLight from "../Product-Components/SellerSpotLight_View";

import { loadCurrUserFavorites } from "../../store/favorite";

const HomePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state?.session?.user);
  const allProducts = useSelector((state) => state?.products?.allProducts);
  const favoritedProducts = useSelector(
    (state) => state?.favorite?.allFavorites
  );
  const [randomIdx, setRandomIdx] = useState(0);

  let randProductIdx;

  useEffect(() => {
    const loadProducts = async () => {
      const getProds = await dispatch(getAllProducts());
      if (getProds) {
        randProductIdx = Math.floor(Math.random() * getProds.Products.length);
        setRandomIdx(randProductIdx);
      }
    };
    if (sessionUser !== null) {
      dispatch(loadCurrUserFavorites());
    }
    loadProducts();
  }, [dispatch, sessionUser]);

  return (
    <div className="mainProductDisplay">
      <div className="smallTileContain">
        {allProducts && (
          <SellerSpotLight
            product={allProducts[randomIdx]}
            priceStyle={"priceDivNormal"}
          />
        )}
        {favoritedProducts && favoritedProducts.length > 4 ? (
          <>
            <h3>Recently Faved...</h3>
            {allProducts &&
              allProducts
                .filter((product) =>
                  favoritedProducts.some((fav) => product.id === fav.product_id)
                )
                .slice(0, 5)
                .map((filteredProduct) => (
                  <ProductTile
                    key={filteredProduct.id}
                    product={filteredProduct}
                    prodTileImgStyle={"recentFaves"}
                    tileContainerStyle={"productTileContain"}
                    priceStyle={"priceDivNormal"}
                  />
                ))}
          </>
        ) : null}
      </div>
      <div className="smallTileContain">
        <h3>Because You Viewed...</h3>
        {allProducts &&
          allProducts.slice(0).map((product) => {
            return (
              <ProductTile
                key={product.id}
                product={product}
                prodTileImgStyle={"becauseViewed"}
                tileContainerStyle={"productTileContain"}
                priceStyle={"priceDivSmall"}
                // heartStyle={}
              />
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;
