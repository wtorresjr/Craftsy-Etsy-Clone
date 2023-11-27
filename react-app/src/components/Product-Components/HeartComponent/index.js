import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../ProductTile/product_img_tile.css";
import ProductTile from "../ProductTile";

const FavoriteHeart = ({ product, favoritedProducts }) => {
  const dispatch = useDispatch();
  const [isClicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!isClicked);
  };

  useEffect(() => {
    favoritedProducts.forEach((fav) => {
      if (fav.id === product.id) {
        handleClick();
      }
    });
  }, [dispatch]);

  return (
    <div
      className={`heartContainer ${isClicked ? "clicked" : ""}`}
      onClick={handleClick}
    >
      <i
        className={`fa-heart ${
          isClicked ? "fas fa-heart fa-lg" : "far fa-heart"
        }`}
      ></i>
    </div>
  );
};

export default FavoriteHeart;
