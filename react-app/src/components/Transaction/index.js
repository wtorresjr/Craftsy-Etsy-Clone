import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/cart";
import "./transaction.css";


const Transaction = () => {
    const dispatch = useDispatch()
    const totalItems = useSelector(state => state.cart.allItems);
    let totalPrice = 0;

    useEffect(() => {
        dispatch(getCart())
    }, [])


    for (let i = 0; i < totalItems.length; i++) {
        totalPrice += totalItems[i].price
    }

    return (
        <>
            <div className="transactionContainer">
                <div className="paymentOptions">
                    <label><input type="radio" /><i class="fa-solid fa-credit-card"></i><i class="fa-solid fa-credit-card"></i><i class="fa-solid fa-credit-card"></i><i class="fa-solid fa-credit-card"></i></label>
                    <label><input type="radio" /><i class="fa-solid fa-credit-card"></i></label>
                    <label><input type="radio" /><i class="fa-solid fa-credit-card"></i></label>
                    <label><input type="radio" /><i class="fa-solid fa-credit-card"></i></label>
                </div>
                {totalPrice > 0 ? (
                    <div className="priceCalculationContainer">
                        <div className="pricingFirst">
                            <div className="totalPrice" id="section1">
                                <p className="pricingText">Item(s) total</p>
                                <p className="pricingText2">${totalPrice}</p>
                            </div>
                        </div>
                        <div id="section2">
                            <div className="totalPrice">
                                <p className="pricingText2">Subtotal</p>
                                <p className="pricingText2">${totalPrice}</p>
                            </div>
                            <div className="totalPrice">
                                <p className="pricingText2">Shipping</p>
                                <p className="pricingText2">${totalPrice}</p>
                            </div>
                        </div>
                        <div className="pricingFirst2">
                            <div className="totalPrice" id="section3">
                                <p className="pricingText">Total {`(${totalItems.length} items)`}</p>
                                <p className="pricingText2">${totalPrice}</p>
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
                    <h3>loading...</h3>
                )}
            </div>
        </>
    )
}

export default Transaction;
