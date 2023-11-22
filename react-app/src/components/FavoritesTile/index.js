import { useState } from "react";
import { useDispatch } from "react-redux";
import "./FavoritesTile.css"


function FavoritesTile ({ favorite, favorited, changeState }) {
    return (
        <div className="favoriteCard">
            <div className="heartFav"  onClick={() => changeState(favorite.id)}>
                {favorited[favorite.id] ? <i className="fas fa-heart" style={{ color: "#c70000" }} key={`heartFav-${favorite.id}`}></i> : <i className="far fa-heart" style={{ color: "black" }}></i>}
            </div>
            <div className="favorite-product-preview-img" title={favorite.name}>
                <img src={favorite.preview_image_url[0]} alt={favorite.name}/>
            </div>
            <div className="favorite-product-description">
                <ul>
                    <li>{favorite.name}</li>
                    <li style={{'fontWeight': '600'}}>${favorite.price.toFixed(2)}</li>
                    {favorite.id % 2 === 0 && <li className="free-shipping-label">FREE Shipping</li>}
                </ul>
            </div>
        </div>
    )
}

export default FavoritesTile;
