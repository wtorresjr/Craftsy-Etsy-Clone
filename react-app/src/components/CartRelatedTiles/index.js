
import FavoriteHeart from "../Product-Components/HeartComponent";
import LoginFormModal from "../LoginFormModal";

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import { addItem } from "../../store/cart";

import "./cartRelatedTiles.css";
import { useHistory } from "react-router-dom";

const CartRelatedTiles = ({ productsArray, sessionUser, favoritedProducts }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { setModalContent } = useModal();
    const [localIsClicked, setLocalIsClicked] = useState(false);

    const productDetailRedirect = (product) => {
        history.push(`/products/${product.id}`)
    }


    const setModal = () => {
        if (!sessionUser) {
            return setModalContent(<LoginFormModal />)
        }
    }


    const addToCart = (productId) => {
        if (sessionUser) {
            dispatch(addItem({ product_id: productId, quantity: 1 }));
        } else {
            setModal()
        }
    };

    return (
        <>
            <div className="relatedProductDisplay">
                {productsArray.length > 0 ? (
                    productsArray.map((product, index) => (
                        <div className="tileContainer" key={index}>
                            <div className="relatedProductContainer" key={index}>
                                <button className="addToCartButton" onClick={() => addToCart(product.id)}>Add to cart</button>
                                <div className="tilePriceContainer" onClick={() => productDetailRedirect(product)}>${product?.price.toFixed(2)}</div>
                                <div className="tileNameContainer" onClick={() => productDetailRedirect(product)}>{product?.name}</div>
                                <img
                                    onClick={() => productDetailRedirect(product)}
                                    style={{ borderRadius: "10px" }}
                                    src={product?.preview_image_url}
                                    className="relatedProductImg"
                                    alt={`Product ${index}`}
                                />
                                <div className="relatedProductHeart" onClick={() => setModal()}>
                                    <FavoriteHeart product={product} setIsClicked={setLocalIsClicked}/>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2 className="loadingHeader">...loading</h2>
                )}
            </div>
            <div className="favoriteHeaderContainer">
                <h3>Looking for more of your finds?</h3>
                {sessionUser ? (
                    <button className="cartFavoriteButton">
                        <NavLink to="/favorites" id="cartFavoriteButtonText">
                            View your favorites
                        </NavLink>
                    </button>
                ) : (
                    <button className="cartFavoriteButton" onClick={() => setModal()}>
                        View your favorites
                    </button>
                )}
            </div>
        </>
    )
}

export default CartRelatedTiles;
