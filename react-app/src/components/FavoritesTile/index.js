import { useState } from "react";
import { useDispatch } from "react-redux";
import * as favoriteActions from "../../store/favorite";
import "./FavoritesTile.css"


function FavoritesTile ({ favorite }) {
    const dispatch = useDispatch()
    const [isFavorited, setIsFavorited] = useState(true)

    const toggleFavStatus = () => {
        if (favorite.id !== isFavorited) dispatch(favoriteActions.removeFromCurrUserFavorites(favorite.id))
        else setIsFavorited((prev) => !prev)
    };

    return (
        <>
        <div className="favorite-card">
            <div className="fav-card-fav-icon"  onClick={toggleFavStatus}>
                <i className={isFavorited ? "fas fa-heart" : "far fa-heart"}
                    style={{color: isFavorited ? "#A5192E" : "#000000"}}>
                </i>
            </div>
            <div className="fav-product-preview-img" title={favorite.name}>
                <img src={favorite.preview_image_url[0]} alt={favorite.name}/>
            </div>
            <div className="fav-product-description">
                <ul>
                    <li>{favorite.name}</li>
                    <li style={{'fontWeight': '600'}}>${favorite.price.toFixed(2)}</li>
                    {favorite.id % 2 === 0 && <li className="free-shipping-label">FREE Shipping</li>}
                </ul>
            </div>
        </div>
        </>
    )
}

export default FavoritesTile;
