import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../ProductTile/product_img_tile.css";
import * as favoriteActions from "../../../store/favorite";
import { useModal } from "../../../context/Modal";
import LoginFormModal from "../../LoginFormModal";
import { getAllProducts } from "../../../store/products";

const FavoriteHeart = ({ product, setIsClicked, heartVal }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const favoritedProducts = useSelector(
    (state) => state?.favorite?.allFavorites
  );
  const { setModalContent } = useModal();
  const [localIsClicked, setLocalIsClicked] = useState(setIsClicked);
  console.log(heartVal, "heartValue");
  
  
  const handleClick = () => {
    if (!sessionUser) {
      setLocalIsClicked(false);
      return setModalContent(<LoginFormModal />);
    }

    setLocalIsClicked(!localIsClicked);
    if (!localIsClicked) {
      const newFav = {
        product_id: product.id,
      };
      dispatch(favoriteActions.addToCurrUserFavorites(newFav));

      // dispatch(favoriteActions.loadCurrUserFavorites());
      dispatch(getAllProducts());
    } else {
      dispatch(favoriteActions.removeFromCurrUserFavorites(+product.id));

      // dispatch(favoriteActions.loadCurrUserFavorites());
      dispatch(getAllProducts());
    }
  };

  return (
    <div
      className={`heartContainer ${
        localIsClicked === true || heartVal ? "clicked" : ""
      }`}
      onClick={handleClick}
    >
      <i
        className={`fa-heart ${
          localIsClicked === true || heartVal
            ? "fas fa-heart fa-lg"
            : "far fa-heart"
        }`}
      ></i>
    </div>
  );
};

export default FavoriteHeart;
