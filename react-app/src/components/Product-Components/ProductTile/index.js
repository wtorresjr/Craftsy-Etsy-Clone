import { useState, useEffect } from "react";
import PriceComponent from "../PriceComponent";
import FavoriteHeart from "../HeartComponent";
import "./product_img_tile.css";

const ProductTile = ({ product, favoritedProducts }) => {
  // const [isClicked, setIsClicked] = useState(false);
  const isClicked = favoritedProducts?.some((fav) => fav.id === product.id);
  const [localIsClicked, setLocalIsClicked] = useState(isClicked);

  useEffect(() => {
    setLocalIsClicked(isClicked);
  }, [favoritedProducts, isClicked]);

  return (
    <div className="productTileContain">
      <PriceComponent product={product} />
      <FavoriteHeart
        product={product}
        isClicked={localIsClicked}
        setIsClicked={setLocalIsClicked}
      />
      <img
        alt={product?.description}
        className="imageContainer"
        src={product?.preview_image_url}
      />
    </div>
  );
};

export default ProductTile;
