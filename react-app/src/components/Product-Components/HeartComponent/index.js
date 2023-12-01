import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../ProductTile/product_img_tile.css";
import * as favoriteActions from "../../../store/favorite";
import { useModal } from "../../../context/Modal";
import LoginFormModal from "../../LoginFormModal";

const FavoriteHeart = ({ product }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const favoritedProducts = useSelector(
    (state) => state?.favorite?.allFavorites
  );
  const { setModalContent } = useModal();
  const [localIsClicked, setLocalIsClicked] = useState(false);
  let isClicked = favoritedProducts?.some(
    (fav) => fav.product_id === product.id
  );

const handleClick = () => {
  if (!sessionUser) {
    setLocalIsClicked(false);
    return setModalContent(<LoginFormModal />);
  }

  setLocalIsClicked(!isClicked);

  if (isClicked) {
    dispatch(favoriteActions.removeFromCurrUserFavorites(product.id));
  } else {
    const newFav = {
      product_id: product.id,
    };
    dispatch(favoriteActions.addToCurrUserFavorites(newFav));
  }

  dispatch(favoriteActions.loadCurrUserFavorites());
};


  return (
    <div
      className={`heartContainer ${
        localIsClicked || isClicked ? "clicked" : ""
      }`}
      onClick={handleClick}
    >
      <i
        className={`fa-heart ${
          localIsClicked || isClicked ? "fas fa-heart fa-lg" : "far fa-heart"
        }`}
      ></i>
    </div>
  );
};

export default FavoriteHeart;
