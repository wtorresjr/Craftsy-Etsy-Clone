import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PriceComponent from "../PriceComponent";
import FavoriteHeart from "../HeartComponent";
import "./product_img_tile.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ProductTile = ({
  product,
  favoritedProducts,
  prodTileImgStyle,
  tileContainerStyle,
  priceStyle,
  heartVal,
}) => {
  const dispatch = useDispatch();
  const isClicked = favoritedProducts?.some((fav) => fav.id === product.id);
  const [localIsClicked, setLocalIsClicked] = useState(isClicked);

  // const [onPage, setOnPage] = useState(currentPage);

  useEffect(() => {
    setLocalIsClicked(isClicked);
  }, [dispatch, favoritedProducts, isClicked]);

  return (
    <div className={tileContainerStyle}>
      <PriceComponent product={product} priceStyle={priceStyle} />
      <FavoriteHeart
        product={product}
        isClicked={localIsClicked}
        setIsClicked={setLocalIsClicked}
        heartVal={heartVal}
      />
      <Link to={`/products/${product?.id}`}>
        <img
          alt={product?.description}
          className={prodTileImgStyle}
          src={product?.preview_image_url}
        />
      </Link>
    </div>
  );
};

export default ProductTile;
