import { useEffect, useState } from "react";
import "./transaction.css";
import { useDispatch } from "react-redux";
import { purchaseCart } from "../../store/cart";


const Transaction = ({ totalItems, shippingPrice }) => {
    const dispatch = useDispatch();
    let totalPrice = 0;

    const handlePurchase = (e) => {
        const cartData = {"Cart": []};

        totalItems.forEach((item) => {
            const itemData = { item_id: item.id, purchased: true }
            cartData.Cart.push(itemData);
        })

        dispatch(purchaseCart(cartData))
    }


    for (let i = 0; i < totalItems.length; i++) {
        totalPrice += (totalItems[i].price * totalItems[i].quantity)
    }

    return (
        <>
            <div className="transactionContainer">
                <div>
                    <h2 className="transactionHeader">How you'll pay</h2>
                </div>
                <div className="paymentOptions">
                    <label><input type="radio" name="card" value="visa"/><i class="fa-brands fa-cc-visa fa-2xl"></i><i class="fa-brands fa-cc-discover fa-2xl"></i><i class="fa-brands fa-cc-amex fa-2xl"></i><i class="fa-brands fa-cc-mastercard fa-2xl"></i></label>
                    <label><input type="radio" name="card" value="paypal"/><i class="fa-brands fa-cc-paypal fa-2xl"></i></label>
                    <label><input type="radio" name="card" value="google-pay"/><i class="fa-brands fa-google-pay fa-2xl"></i></label>
                    <label><input type="radio" name="card" value="apple-pay"/><i class="fa-brands fa-cc-apple-pay fa-2xl"></i></label>
                </div>
                {totalPrice > 0 ? (
                    <div className="priceCalculationContainer">
                        <div className="pricingFirst">
                            <div className="totalPrice" id="section1">
                                <p className="pricingText">Item(s) total</p>
                                <p className="pricingText2">${totalPrice ? totalPrice.toFixed(2) : "..."}</p>
                            </div>
                        </div>
                        <div id="section2">
                            <div className="totalPrice">
                                <p className="pricingText2">Subtotal</p>
                                <p className="pricingText2">${totalPrice ? totalPrice.toFixed(2) : "..."}</p>
                            </div>
                            <div className="totalPrice">
                                <p className="pricingText2">Shipping</p>
                                <p className="pricingText2">{shippingPrice > 10.00 ? "$" + (shippingPrice.toFixed(2)) : (<span style={{ color: 'green' }}>FREE</span>)}</p>
                            </div>
                        </div>
                        <div className="pricingFirst2">
                            <div className="totalPrice" id="section3">
                                <p className="pricingText">Total {`(${totalItems.length} items)`}</p>
                                <p className="pricingText2">${shippingPrice > 10.00 ? (totalPrice + +shippingPrice).toFixed(2) : (totalPrice.toFixed(2))}</p>
                            </div>
                        </div>
                        <div className="checkoutButton">
                            <button onClick={() => handlePurchase()}>Proceed to checkout</button>
                        </div>
                        <div className="promoButton">
                            <button>Apply Craftsy coupon code</button>
                        </div>
                    </div>
                ) : (
                    <h3 className="priceLoad">loading...</h3>
                )}
            </div>
        </>
    )
}

export default Transaction;
