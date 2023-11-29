
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import CartRelatedTiles from "../CartRelatedTiles";
import EmptyCartPage from "../EmptyCartPage";
import CartItemTiles from "../CartItemTile";
import Transaction from "../Transaction";

import { loadCurrUserFavorites } from "../../store/favorite";
import { getAllProducts } from "../../store/products";
import { getCart } from "../../store/cart";

import "./cartpage.css";

const CartPage = () => {
    const dispatch = useDispatch();

    const cartItemsArray = useSelector(state => state.cart?.allItems);
    const productsArray = useSelector(state => state.products?.allProducts);
    const sessionUser = useSelector(state => state.session?.user);
    const favoritedProductsArr = useSelector(state => state?.favorite?.allFavorites);
    const [itemCount, setItemCount] = useState(-Infinity);
    const [favoritedProducts, setFavoritedProducts] = useState(favoritedProductsArr);
    const [products, setProducts] = useState([]);



    useEffect(() => {
        dispatch(getCart());
        dispatch(getAllProducts());
        if (sessionUser) {
            dispatch(loadCurrUserFavorites());
        } else {
            // Set favoritedProducts to an empty array when there is no session user
            setFavoritedProducts([]);
        }
    }, [dispatch, sessionUser]);

    useEffect(() => {
        setItemCount(cartItemsArray.length);
        if (productsArray?.length > 0) {
            setProducts(productsArray.slice(0, 5));
        }
    }, [cartItemsArray, productsArray, sessionUser]);

    return (
        <div className="mainCartContainer">
            <div className="mainCart">
                <div className="cartItemTilesContainer">
                    {cartItemsArray.length > 0 && sessionUser ? (
                        <div>
                            <div>
                                <h2>{cartItemsArray.length > 0 ? `${cartItemsArray.length} ${cartItemsArray.length === 1 ? 'item' : 'items'} in your cart` : 'Loading...'}</h2>
                                {cartItemsArray &&
                                    cartItemsArray.map((item) => {
                                        return <CartItemTiles key={item.id} item={item} cartItemsArray={cartItemsArray} />;
                                    })}

                            </div>

                        </div>
                    ) : (
                        <EmptyCartPage />
                    )}
                </div>
                {itemCount > 0 && sessionUser && (
                    <div id="transactionCartDisplay">
                        <Transaction totalItems={cartItemsArray} />
                    </div>
                )}
            </div>
            <div className="cartRelatedTiles">
                <CartRelatedTiles productsArray={products} sessionUser={sessionUser} favoritedProducts={favoritedProducts}/>
            </div>
        </div>
    );
};

export default CartPage;
