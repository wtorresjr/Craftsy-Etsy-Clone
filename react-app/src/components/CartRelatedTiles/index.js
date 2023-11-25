import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import "./cartRelatedTiles.css";


const CartRelatedTiles = ({productsArray}) => {

    return (
        <>
            <div className="mainProductDisplay">
                {productsArray.length  > 0 ? (
                    productsArray.map((product, index) => (
                        <div className="tileContainer" key={index}>
                            <div key={index}>
                                <div className="heartFav">
                                    {/* <i className="fas fa-heart" style={{ color: "#c70000" }}></i> */}
                                    <i className="far fa-heart" style={{ color: "black" }}></i>
                                </div>
                                <div className="tileNameContainer">{product?.name}</div>
                                <div className="tilePriceContainer">${product?.price}</div>
                                <button className="addToCartButton">Add to cart</button>
                                <img
                                    style={{ borderRadius: "10px" }}
                                    src={product?.preview_image_url}
                                    className="productImg"
                                    alt={`Product ${index}`}
                                />
                            </div>
                        </div>
                    ))
                    ) : (
                        <h2>...loading</h2>
                        )}
            </div>
            <div className="favoriteHeaderContainer">
                <h3>Looking for more of your finds?</h3>
                <button className="cartFavoriteButton"><NavLink to="/current-user/favorites" id="cartFavoriteButtonText">View your favorites</NavLink></button>
            </div>
        </>
    )
}

export default CartRelatedTiles;
