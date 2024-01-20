import { useEffect } from "react";
import { getOrders } from "../../store/orders";
import { useDispatch, useSelector } from "react-redux";
import OrdersCard from "./OrdersCard";
import "./OrdersPage.css";

const OrdersPage = () => {
    const orders = useSelector(state => state.orders.allOrders);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    return (
        <div>
            <div className="Purchased-Header">
                <h2>Purchases</h2>
            </div>
            <div className="Order-Page-Container">
                <OrdersCard orders={orders} />
            </div>
        </div>
    )
}

export default OrdersPage;
