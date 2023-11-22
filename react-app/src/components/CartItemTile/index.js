import { useSelector, useDispatch} from "react-redux";
import { useState, useEffect } from "react";

import { addItem, deleteItem, getCart } from "../../store/cart";
import { getProductInfo } from "../../store/products";
import "./cartitemtile.css";


const CartItemTiles = ({ item }) => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const cartItemsArray = useSelector(state => state.cart.allItems);
    const cartItemsObj = useSelector(state => state.cart.byId);
    const productDetailsObj = useSelector(state => state.products.Product_Details);


    const [shippingFree, setShippingFree] = useState(true);
    const [productInfoObj, setProductInfoObj] = useState({});



    const handleDeleteItem = (cartItemId) => {
        dispatch(deleteItem(+cartItemId));
    }

    return (
        <>
            <div className="cartItemCard" key={item.id}>
                <div className="sellerHeader">
                    <h3>{productInfoObj[item.id]?.Seller?.first_name} {productInfoObj[item.id]?.Seller?.last_name}</h3>
                    <span>Contact Shop</span>
                </div>

                <div className="detailContainer">
                    <div className="cartItemImgContainer">
                        <img style={{ borderRadius: "10px" }} src={item.preview_image_url && item.preview_image_url[0]} className="cartItemImg"/>
                    </div>

                    <div className="cartItemDetailsContainer">
                        <div className="cartItemDetails">
                            <h3>{item.name}</h3>
                            <label htmlFor="quantity"></label>
                            <select className="quantityDropdown" name="quantity" id="quantity">
                                {[...Array(101).keys()].map((i) => (
                                    <option key={i} value={i}>
                                        {i}
                                    </option>
                                ))}
                            </select>
                        <div className="detailButtons">
                            <button>Save for later</button>
                            <button onClick={() => handleDeleteItem(item.id)}>Remove</button>
                        </div>
                    </div>

                            <div className="cartItemPrice">
                                <h2>${item.price}</h2>
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
