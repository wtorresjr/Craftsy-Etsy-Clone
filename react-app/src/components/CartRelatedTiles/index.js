
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./cartRelatedTiles.css";

import { useDispatch } from "react-redux";
import { addItem } from "../../store/cart";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";

const CartRelatedTiles = ({ productsArray, sessionUser }) => {
    const dispatch = useDispatch();
    const { setModalContent } = useModal();


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
                                <div className="tilePriceContainer">${product?.price}</div>
                                <div className="tileNameContainer">{product?.name}</div>
                                <img
                                    style={{ borderRadius: "10px" }}
                                    src={product?.preview_image_url}
                                    className="relatedProductImg"
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
