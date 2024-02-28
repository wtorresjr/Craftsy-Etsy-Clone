import { getProductInfo } from "../../../store/products";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./OrdersCard.css";
import { addItem } from "../../../store/cart";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function OrdersCard({orders}) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [productInfoObj, setProductInfoObj] = useState({});

    useEffect(() => {
        if (orders.length > 0) {
            const fetchProductInfo = async () => {
                try {
                    const productInfoPromises = orders.map(item =>
                        dispatch(getProductInfo(item?.product_id))
                    );
                    const productInfoResults = await Promise.all(productInfoPromises);
                    const infoObj = {};
                    productInfoResults.forEach((info, index) => {
                        infoObj[orders[index].id] = info?.Product_Details;
                    });
                    setProductInfoObj(infoObj);
                    setLoading(false)
                } catch (error) {
                    console.error('Error fetching product info:', error);
                }
            };
            fetchProductInfo();
        }
    }, [dispatch, orders.length]);

    const addToCart = (productId) => {
        dispatch(addItem({ product_id: productId, quantity: 1 }));
        history.push(`/cart`);
    };





    return (
        <div className="Purchased-Card-Container">
            {orders.map((order) => (
                <div key = {order.id} className="Purchased-Card">
                    <div className="Purchased-Card-Info">
                        <div>
                            {loading ? (
                                <div className="Purchased-Card-Owner">
                                    <p>Purchased from</p>
                                    <h4>...Loading owner</h4>
                                </div>
                            ) : (
                                <p>
                                    Purchased from {productInfoObj[order.id]?.Seller?.first_name}{" "}
                                    {productInfoObj[order.id]?.Seller?.last_name}
                                </p>
                            )}
                        </div>
                        <div>
                            <p>${order.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="Order-Details">
                        <div className="Purchased-Item-Img">
                            <img alt={"product preview thumbnail"}src={order.preview_image_url}/>
                        </div>
                        <div className="Add-To-Cart-Card">
                            <div className="Item-Name">
                                <h2>{order.name}</h2>
                            </div>
                            <div className="Add-Order">
                                <button onClick={() => addToCart(productInfoObj[order.id].id)}>Buy Again</button>
                            </div>
                        </div>
                    </div>
                    <div className="Product-Order-Description">
                        {loading ? (
                            <h4>...Loading product description</h4>
                        ): (
                            <p>{productInfoObj[order.id]?.description}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OrdersCard;
