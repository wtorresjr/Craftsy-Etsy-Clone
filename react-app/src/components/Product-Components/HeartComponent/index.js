import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../ProductTile/product_img_tile.css";
import * as favoriteActions from "../../../store/favorite";
import ProductTile from "../ProductTile";

const FavoriteHeart = ({ product, favoritedProducts }) => {
  const dispatch = useDispatch();
  const [isClicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!isClicked);

    // if (isClicked === false) {
    //   console.log(product.id, "setting Id for");
    //   dispatch(favoriteActions.addToCurrUserFavorites(product?.id));
    // }
    // if (isClicked === false) {
    //   dispatch(favoriteActions.removeFromCurrUserFavorites(product.id));
    // }
  };

  useEffect(() => {
    if (favoritedProducts && favoritedProducts.length)
      favoritedProducts.forEach((fav) => {
        if (fav.id === product.id) {
          setClicked(!isClicked);
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
