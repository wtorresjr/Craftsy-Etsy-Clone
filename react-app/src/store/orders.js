const LOAD_ORDERS = "session/LOAD_ORDERS";


const loadOrders = (orders) => ({
    type: LOAD_ORDERS,
    payload: orders
});


const initialState = {}


export const getOrders = () => async (dispatch) => {
    try {
        if (response.ok) {
            const cartItems = await response.json();
            const ordersObject = cartItems.Orders.reduce((acc, order) => {
                // Transform each order.items array into an object with a specific key
                const itemsObject = order.items.reduce((itemsAcc, item) => {
                    itemsAcc[item.id] = item;
                    return itemsAcc;
                }, {});

                // Assign the items object to the order using the cart_id as the key
                acc[order.cart_id] = { ...order, items: itemsObject };

                return acc;
            }, {});
            dispatch(loadOrders(ordersObject));

            return cartItems;
        }
    } catch (res) {
        let errors = res.json();
        return errors;
    }
    const response = await fetch(`/api/cart/orders`);
}

const orderReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ORDERS:
            if (action.payload.Orders) {
                action.payload.orders.map((order) => {
                    newState[order.cart_id] = order
                })
                return newState;
            }
            else {
                newState = action.payload
                return newState;
            }
        default:
            return state;
    }
}

export default orderReducer;
