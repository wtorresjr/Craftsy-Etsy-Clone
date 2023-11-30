import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../ProductTile/product_img_tile.css";
import * as favoriteActions from "../../../store/favorite";
import { useModal } from "../../../context/Modal";
import LoginFormModal from "../../LoginFormModal";
import { getAllProducts } from "../../../store/products";

const FavoriteHeart = ({ product, isFavorite }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const favoritedProducts = useSelector(
    (state) => state?.favorite?.allFavorites
  );
  const { setModalContent } = useModal();
  const [localIsClicked, setLocalIsClicked] = useState();

  // useEffect(() => {
  //   if (favoritedProducts && favoritedProducts.length > 0) {
  //     favoritedProducts.map((fav) => {
  //       if (fav.product_id === product.id) {
  //         setLocalIsClicked(true);
  //       }
  //     });
  //   }
  // }, [dispatch, favoritedProducts]);

  const isClicked = favoritedProducts?.some((fav) => fav.id === product.id);

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
      dispatch(favoriteActions.loadCurrUserFavorites());
      dispatch(getAllProducts());
      // setLocalIsClicked(true);
    } else {
      dispatch(favoriteActions.removeFromCurrUserFavorites(product.id));
      dispatch(favoriteActions.loadCurrUserFavorites());
      dispatch(getAllProducts());
      isClicked = false;
      // setLocalIsClicked(false);
    }
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
