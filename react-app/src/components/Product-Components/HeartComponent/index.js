import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../ProductTile/product_img_tile.css";
import * as favoriteActions from "../../../store/favorite";
import { useModal } from "../../../context/Modal";
import LoginFormModal from "../../LoginFormModal";
import { getAllProducts } from "../../../store/products";

const FavoriteHeart = ({ product, setIsClicked }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const favoritedProducts = useSelector(
    (state) => state?.favorite?.allFavorites
  );
  const { setModalContent } = useModal();
  const [localIsClicked, setLocalIsClicked] = useState(setIsClicked);

  useEffect(() => {
    console.log(localIsClicked, "setIsClicked value");
    if (favoritedProducts) {
      favoritedProducts.map((fav) => {
        if (fav.product_id === product.id) {
          setLocalIsClicked(true);
          // console.log(localIsClicked, "setIsClicked value");
        }
      });
    }
  }, [dispatch, favoritedProducts]);

  const handleClick = () => {
    setLocalIsClicked(!localIsClicked);
    if (sessionUser) {
      if (!localIsClicked) {
        const newFav = {
          product_id: product.id,
        };
        dispatch(favoriteActions.addToCurrUserFavorites(newFav));

        dispatch(getAllProducts());
      } else {
        dispatch(favoriteActions.removeFromCurrUserFavorites(+product.id));

        dispatch(getAllProducts());
      }
    } else {
      setLocalIsClicked(false);
      return setModalContent(<LoginFormModal />);
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
