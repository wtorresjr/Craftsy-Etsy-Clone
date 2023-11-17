const LOAD_CART_ITEMS = "session/LOAD_CART_ITEMS";

const loadCartItems = (items) => ({
	type: LOAD_CART_ITEMS,
	payload: items
});


const initialState = {}


export const getCart = (cartId) => async (dispatch) => {
    const response = await fetch(`/api/cart/${+cartId}`);

    if (response.ok) {
        const cartItems = await response.json();
        const items = cartItems.Cart.reduce((acc, obj) => {
            acc[obj.id] = obj;
            return acc;
        }, {});
        const newState = {'items': items}
        dispatch(loadCartItems(newState));
        return newState;
    } else if (response.status === 404) {
        return [];
    }
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CART_ITEMS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export default cartReducer;
