import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as favoriteActions from "../../../store/favorite";
import "./FavoritesTile.css";

function FavoritesTile({ favorite }) {
  const dispatch = useDispatch();
  const [isFavorited, setIsFavorited] = useState(true);

  useEffect(() => {
    dispatch(favoriteActions.loadCurrUserFavorites());
  }, [dispatch, isFavorited]);

  const toggleFavStatus = () => {
    setIsFavorited(false);
    dispatch(favoriteActions.removeFromCurrUserFavorites(favorite.product_id));
  };

  return (
    <>
      <div className="favorite-card">
        <div className="fav-card-fav-icon" onClick={toggleFavStatus}>
          <i
            className={isFavorited ? "fas fa-heart" : "far fa-heart"}
            style={{ color: isFavorited ? "#A5192E" : "#000000" }}
          ></i>
        </div>
          <Link to={`/products/${favorite.product_id}`} style={{textDecoration: "none"}}>
          <div className="fav-product-preview-img" title={favorite.name}>
            <img src={favorite.preview_image_url[0]} alt={favorite.name} />
          </div>
          <div className="fav-product-description">
            <ul>
              <li>{favorite.name}</li>
              <li style={{ fontWeight: "600" }}>
                ${favorite.price.toFixed(2)}
              </li>
              {favorite.id % 2 === 0 && (
                <li className="free-shipping-label">FREE Shipping</li>
              )}
            </ul>
          </div>
        </Link>
      </div>
    </>
  );
}

export default FavoritesTile;
