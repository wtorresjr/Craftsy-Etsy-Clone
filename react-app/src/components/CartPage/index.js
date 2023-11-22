import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import CartItemTiles from "../CartItemTile";
import { getCart } from "../../store/cart";
import { getProductInfo } from "../../store/products";
import Transaction from "../Transaction";
import "./cartpage.css";


const CartPage = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const cartItemsArray = useSelector(state => state.cart.allItems);
    const cartItemsObj = useSelector(state => state.cart.byId);
    const productDetailsObj = useSelector(state => state.products.Product_Details);

    const [isloading, setIsLoading] = useState(true);
    const [shippingFree, setShippingFree] = useState(true);
    const [productInfoObj, setProductInfoObj] = useState({});

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch, sessionUser]);

    useEffect(() => {
        const fetchProductInfo = async () => {
            const productInfoPromises = cartItemsArray.map(item =>
                dispatch(getProductInfo(item.product_id))
            );
            try {
                const productInfoResults = await Promise.all(productInfoPromises);
                const infoObj = {};
                productInfoResults.forEach((info, index) => {
                    infoObj[cartItemsArray[index].id] = info.Product_Details;
                });
                setProductInfoObj(infoObj);
            } catch (error) {
                console.error('Error fetching product info:', error);
            }

            setIsLoading(false);
        };
        fetchProductInfo();
    }, [dispatch, sessionUser, cartItemsArray]);

    return (
        <>
            <div className="mainCart">
                <div className="cartItemTilesContainer">
                    {cartItemsArray &&
                        cartItemsArray.map((item) => {
                            return <CartItemTiles key={item.id} item={item} />;
                        })}
                </div>
                <div id="transactionCartDisplay">
                    <Transaction />
                </div>
            </div>
        </>
    );
};

export default CartPage;
