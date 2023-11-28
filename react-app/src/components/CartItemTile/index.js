import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { deleteItem, editItem } from "../../store/cart";
import { getProductInfo } from "../../store/products";

import "./cartitemtile.css";

const CartItemTiles = ({ item, cartItemsArray }) => {
    const dispatch = useDispatch();

    const [shippingFree, setShippingFree] = useState(true);
    const [productInfoObj, setProductInfoObj] = useState({});
    const [isloading, setIsLoading] = useState(true);


    const handleDeleteItem = (cartItemId) => {
        dispatch(deleteItem(+cartItemId));
    }

    const handleEditQuantity = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        dispatch(editItem({ quantity: newQuantity }, item.id));
    }

    useEffect(() => {
        const fetchProductInfo = async () => {
            try {
                const productInfoPromises = cartItemsArray.map(item =>
                    dispatch(getProductInfo(item.product_id))
                );
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

        if (cartItemsArray.length > 0) {
            fetchProductInfo();
        }
    }, [dispatch, cartItemsArray]);

    return (
        <>
            <div className="cartItemCard" key={item.id}>
                <div className="sellerHeader">
                    <h3>{productInfoObj[item.id]?.Seller?.first_name} {productInfoObj[item.id]?.Seller?.last_name}</h3>
                    <span>Contact Shop</span>
                </div>

                <div className="detailContainer">
                    <div className="cartItemImgContainer">
                        <img className="cartItemImg" style={{ borderRadius: "10px" }} src={item.preview_image_url && item.preview_image_url[0]} />
                    </div>

                    <div className="cartItemDetailsContainer">
                        <div className="cartItemDetails">
                            <h3>{item.name}</h3>
                            <label htmlFor="quantity"></label>
                            <select
                                className="quantityDropdown"
                                name="quantity"
                                id="quantity"
                                style={{ fontSize: '16px' }}
                                value={item.quantity}
                                onChange={handleEditQuantity}
                            >
                                {[...Array(200).keys()].map((i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                            <div className="detailButtons">
                                <button>Save for later</button>
                                <button onClick={() => handleDeleteItem(item.id)}>Remove</button>
                            </div>
                        </div>

                        <div className="cartItemPrice">
                            <h2>${(item.price?.toFixed(2) * item?.quantity).toFixed(2)}</h2>
                            {item.quantity > 1 && (
                                <h4>{`($${item.price} each)`}</h4>
                            )}
                        </div>
                    </div>
                </div>

                <div className="cardFooter">
                    <div className="personalizeItemContainer">
                        <button><i class="fa-solid fa-tag"></i>Apply shop coupon codes</button>
                        <button><i class="fa-solid fa-plus"></i>Add a note to {productInfoObj[item.id]?.Seller?.first_name} {productInfoObj[item.id]?.Seller?.last_name}</button>
                        <label><input type="checkbox" />Mark order as a gift</label>
                    </div>

                    <div className="shippingContainer">
                        <p>Shipping: {shippingFree ? <span style={{ color: 'green' }}>FREE</span> : <span style={{ color: 'red' }}>$10.00</span>}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartItemTiles;
