import { useEffect, useState } from "react";
import "./transaction.css";


const Transaction = ({ totalItems }) => {
    const [randomShipping, setRandomShipping] = useState(0);
    let totalPrice = 0;

    useEffect(() => {
        setRandomShipping(parseFloat((Math.random() * (20 - 5) + 5).toFixed(2)))

    }, [])


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
                    <label><input type="radio" /><i class="fa-brands fa-cc-visa fa-2xl"></i><i class="fa-brands fa-cc-discover fa-2xl"></i><i class="fa-brands fa-cc-amex fa-2xl"></i><i class="fa-brands fa-cc-mastercard fa-2xl"></i></label>
                    <label><input type="radio" /><i class="fa-brands fa-cc-paypal fa-2xl"></i></label>
                    <label><input type="radio" /><i class="fa-brands fa-google-pay fa-2xl"></i></label>
                    <label><input type="radio" /><i class="fa-brands fa-cc-apple-pay fa-2xl"></i></label>
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
                                <p className="pricingText2">${randomShipping > 0 ? +randomShipping: "..."}</p>
                            </div>
                        </div>
                        <div className="pricingFirst2">
                            <div className="totalPrice" id="section3">
                                <p className="pricingText">Total {`(${totalItems.length} items)`}</p>
                                <p className="pricingText2">${randomShipping > 0 ? (totalPrice + +randomShipping).toFixed(2) : "..."}</p>
                            </div>
                        </div>
                        <div className="checkoutButton">
                            <button>Proceed to checkout</button>
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
