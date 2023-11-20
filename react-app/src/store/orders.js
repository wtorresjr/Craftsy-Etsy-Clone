const LOAD_ORDERS = "session/LOAD_ORDERS";


const loadOrders = (orders) => ({
    type: LOAD_ORDERS,
    payload: orders
});


const initialState = {allOrders: [], byId: {}};


export const getOrders = () => async (dispatch) => {
    try {
        const response = await fetch(`/api/cart/orders`);
        if (response.ok) {
            const cartItems = await response.json();
            dispatch(loadOrders(cartItems));

            return cartItems;
        }
    } catch (res) {
        let errors = res.json();
        return errors;
    }
}

const orderReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ORDERS:
            if (action.payload.Orders) {
                const byId = {}
                action.payload.Orders.forEach((order) => {

                    const itemsObject = order.items.reduce((acc, item) => {
                        acc[item.id] = item;
                        return acc;
                    }, {});

                    byId[order.cart_id] = { ...order, items: itemsObject };
                })

                newState = {
                    allOrders: action.payload.Orders,
                    byId: byId
                };
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
