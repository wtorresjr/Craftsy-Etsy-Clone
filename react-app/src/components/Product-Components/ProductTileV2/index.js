import "./product-tile-v2.css";
import "../DynaProductDisplay/dynamic-product-display.css";
import "../HeartComponent/heart_component_styles.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import FavoriteHeart from "../HeartComponent";
import PriceComponent from "../PriceComponent";

const ProductTileV2 = ({ product, isFavorite }) => {
  const [productId, setProductId] = useState();
  const [localIsClicked, setLocalIsClicked] = useState(false);

  useEffect(() => {
    if (isFavorite === "true" && product) {
      setProductId(product.id);
      setLocalIsClicked(true);
    } else if (product) {
      setProductId(product.id);
    }
  }, [product, isFavorite]);

  return (
    <>
      <div className="dynaItem">
        <div className="productHeart">
          <FavoriteHeart product={product} />
        </div>
        {productId && (
          <NavLink to={`/products/${productId}`}>
            <img
              src={product?.preview_image_url}
              alt={`Product ${productId}`}
            />
          </NavLink>
        )}
        <PriceComponent product={product} />
      </div>
    </>
  );
};

export default ProductTileV2;
