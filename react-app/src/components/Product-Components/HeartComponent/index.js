import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../ProductTile/product_img_tile.css";
import * as favoriteActions from "../../../store/favorite";
import ProductTile from "../ProductTile";

const FavoriteHeart = ({ product, favoritedProducts }) => {
  const sessionUser = useSelector((state) => state?.session?.user);
  const dispatch = useDispatch();
  const [isClicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!isClicked);

    if (!isClicked) {
      console.log(product.id, "is faved");
      // const newFav = {
      //   product_id: product.id,
      //   user_id: sessionUser.id,
      // };
      // dispatch(favoriteActions.addToCurrUserFavorites(newFav));
    }

    if (isClicked) {
      console.log(product.id, "is unfaved");
      // const remFav = {
      //   product_id: product.id,
      // };
      // dispatch(favoriteActions.removeFromCurrUserFavorites(remFav));
    }
  };

  useEffect(() => {
    if (favoritedProducts && favoritedProducts.length > 0) {
      favoritedProducts.forEach((fav) => {
        if (fav.id === product.id) {
          setClicked(!isClicked);
        }
      });
    }
  }, [dispatch, favoritedProducts]);

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
