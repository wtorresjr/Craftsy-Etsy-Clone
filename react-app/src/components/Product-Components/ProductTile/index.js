import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PriceComponent from "../PriceComponent";
import FavoriteHeart from "../HeartComponent";
import "./product_img_tile.css";

const ProductTile = ({ product, favoritedProducts }) => {
  const dispatch = useDispatch();
  const isClicked = favoritedProducts?.some((fav) => fav.id === product.id);
  const [localIsClicked, setLocalIsClicked] = useState(isClicked);

  useEffect(() => {
    setLocalIsClicked(isClicked);
  }, [dispatch, favoritedProducts, isClicked]);


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
