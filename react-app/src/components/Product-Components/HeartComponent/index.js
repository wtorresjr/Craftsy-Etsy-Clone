import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../ProductTile/product_img_tile.css";
import * as favoriteActions from "../../../store/favorite";
import { useModal } from "../../../context/Modal";
import LoginFormModal from "../../LoginFormModal";
import ProductTile from "../ProductTile";

const FavoriteHeart = ({ product, setIsClicked }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const favoritedProducts = useSelector(
    (state) => state?.favorite?.allFavorites
  );
  const { setModalContent } = useModal();
  const [localIsClicked, setLocalIsClicked] = useState(setIsClicked);

  useEffect(() => {
    if (favoritedProducts) {
      favoritedProducts.map((fav) => {
        if (fav.product_id === product.id) {
          setLocalIsClicked(true);
        }
      });
    }
  }, [dispatch, favoritedProducts, setLocalIsClicked]);

  const handleClick = () => {
    setLocalIsClicked(!localIsClicked);
    if (sessionUser) {
      if (!localIsClicked) {
        const newFav = {
          product_id: product.id,
        };
        dispatch(favoriteActions.addToCurrUserFavorites(newFav));
      } else {
        dispatch(favoriteActions.removeFromCurrUserFavorites(+product.id));
      }
    } else {
      setLocalIsClicked(false);
      return setModalContent(<LoginFormModal />);
      console.log("Please log in");
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
