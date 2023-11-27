import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import HeartFavorite from "../../HeartFavorite";

import "../ProductTile/product_tile.css";
import "./small_product_tile.css";

const ProductSmallTile = ({ allProducts, favoritedProducts }) => {
  const dispatch = useDispatch();
  const [randomSmallProds, setRandomSmallProds] = useState([]);

  useEffect(() => {
    let chosenRandomProds = [];
    if (allProducts.length > 0) {
      while (chosenRandomProds.length < 6) {
        let randomProductId = Math.floor(Math.random() * allProducts.length);

        if (allProducts[randomProductId]) {
          if (!chosenRandomProds.includes(allProducts[randomProductId].id)) {
            chosenRandomProds.push(randomProductId);
          } else {
            continue;
          }
        } else {
          continue;
        }
      }
    }
    setRandomSmallProds(chosenRandomProds);
  }, [dispatch, allProducts]);

  return (
    <div style={{ padding: "0px 65px 0px" }}>
      <h3>You might like...</h3>
      <div className="prodSmallContainer">
        {randomSmallProds &&
          randomSmallProds.length === 6 &&
          randomSmallProds.map((id) => {
            return (
              <div className="smallProdObj" key={allProducts[id].id}>
                <HeartFavorite />
                <img
                  src={allProducts[id].preview_image_url}
                  className="prodSmallImg"
                />
                <div className="priceContainerSmall">
                  ${allProducts[id]?.price}
                </div>
                <div className="textContainer">
                  <div className="productName">{allProducts[id].name}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductSmallTile;
