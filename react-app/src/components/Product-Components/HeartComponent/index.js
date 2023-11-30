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

  // const [heartValue, setHeartValue] = useState(isClicked);

  // console.log(isClicked, "isClicked value");
  console.log(heartVal, "heartValue");

  useEffect(() => {
    if (favoritedProducts) {
      favoritedProducts.map((fav) => {
        if (fav.product_id === product.id) {
          setLocalIsClicked(heartVal);
        }
      });
    }
  }, [dispatch, favoritedProducts]);

  const handleClick = () => {
    if (!sessionUser) {
      setLocalIsClicked(false);
      return setModalContent(<LoginFormModal />);
    }

    // setLocalIsClicked((prev) => !prev);

    // if (!localIsClicked) {
    //   dispatch(favoriteActions.removeFromCurrUserFavorites(+product.id));
    // } else {
    //   const newFav = {
    //     product_id: product.id,
    //   };
    //   dispatch(favoriteActions.addToCurrUserFavorites(newFav));
    // }

    setLocalIsClicked(!localIsClicked);
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
  };

  return (
    <div
      className={`heartContainer ${
        localIsClicked || heartVal ? "clicked" : ""
      }`}
      onClick={handleClick}
    >
      <i
        className={`fa-heart ${
          localIsClicked || heartVal ? "fas fa-heart fa-lg" : "far fa-heart"
        }`}
      ></i>
    </div>
  );
};

export default FavoriteHeart;
