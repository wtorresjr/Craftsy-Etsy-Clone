import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./cartRelatedTiles.css";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/cart";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";


const CartRelatedTiles = ({productsArray, sessionUser}) => {
    const dispatch = useDispatch();
    const { setModalContent } = useModal();


    const setModal = () => {
        if (!sessionUser) {
            return setModalContent(<LoginFormModal/>)
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
                                <button className="addToCartButton" onClick={() => addToCart(product.id)}>Add to cart</button>
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
