import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../ProductTile/product_img_tile.css";
import * as favoriteActions from "../../../store/favorite";
import { useModal } from "../../../context/Modal";
import LoginFormModal from "../../LoginFormModal";

const FavoriteHeart = ({ product, isFavorite }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const favoritedProducts = useSelector(
    (state) => state?.favorite?.allFavorites
  );
  const { setModalContent } = useModal();
  const [localIsClicked, setLocalIsClicked] = useState(false);
  const [isLikeLoaded, setIsLikeLoaded] = useState(true);

  // Check if product is not null or undefined before accessing its id property
  let isClicked = favoritedProducts?.some(
    (fav) => fav.product_id === (product?.id || null)
  );

  useEffect(() => {
    setLocalIsClicked(isFavorite);
  }, [isFavorite]);

  const handleClick = async () => {
    if (!sessionUser) {
      setLocalIsClicked(false);
      return setModalContent(<LoginFormModal />);
    }

    setLocalIsClicked(!isClicked);

    if (isClicked) {
      setIsLikeLoaded(false);
      await dispatch(
        favoriteActions.removeFromCurrUserFavorites(product?.id || null)
      );
      setIsLikeLoaded(true);
    } else {
      const newFav = {
        product_id: product?.id || null,
      };
      setIsLikeLoaded(false);
      await dispatch(favoriteActions.addToCurrUserFavorites(newFav));
      setIsLikeLoaded(true);
    }

    if (sessionUser) {
      dispatch(favoriteActions.loadCurrUserFavorites());
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
