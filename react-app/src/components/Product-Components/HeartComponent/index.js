import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../ProductTile/product_img_tile.css";
import * as favoriteActions from "../../../store/favorite";
import ProductTile from "../ProductTile";

const FavoriteHeart = ({ product, setIsClicked }) => {
  const dispatch = useDispatch();
  const favoritedProducts = useSelector(
    (state) => state?.favorite?.allFavorites
  );
  const [localIsClicked, setLocalIsClicked] = useState(setIsClicked);

  useEffect(() => {
    if (favoritedProducts) {
      favoritedProducts.map((fav) => {
        if (fav.product_id === product.id) {
          setLocalIsClicked(true);
        }
      });
    }
  }, [favoritedProducts, setLocalIsClicked]);

  const handleClick = () => {
    setLocalIsClicked(!localIsClicked);

    if (!localIsClicked) {
      console.log(product.id, "is faved");
      const newFav = {
        "product_id": product.id,
      };
      dispatch(favoriteActions.addToCurrUserFavorites(newFav));
    } else {
      console.log(product.id, "is unfaved");
      dispatch(favoriteActions.removeFromCurrUserFavorites(+product.id));
      console.log(product.id, "<----Dispatched product id");
    }
  };

  return (
    <div
      className={`heartContainer ${localIsClicked ? "clicked" : ""}`}
      onClick={handleClick}
    >
      <i
        className={`fa-heart ${
          localIsClicked ? "fas fa-heart fa-lg" : "far fa-heart"
        }`}
      ></i>
    </div>
  );
};

export default FavoriteHeart;
