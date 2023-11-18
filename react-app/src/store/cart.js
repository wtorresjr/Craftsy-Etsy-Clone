const LOAD_CART_ITEMS = "session/LOAD_CART_ITEMS";
const ADD_CART_ITEM = "session/ADD_CART_ITEM";
const DELETE_CART_ITEM = "session/DELETE_CART_ITEM";

const loadCartItems = (items) => ({
	type: LOAD_CART_ITEMS,
	payload: items
});

const addCartItem = (item) => ({
    type: ADD_CART_ITEM,
    payload: item
});

const deleteCartItem = (item) => ({
    type: DELETE_CART_ITEM,
    payload: item
});

const initialState = {}


export const getCart = () => async (dispatch) => {
    const response = await fetch(`/api/cart`);

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

export const addItem = (itemData, cartId) => async (dispatch) => {
    const options = {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(itemData)
    }
    const response = await fetch(`/api/cart/${+cartId}`, options);

    if (response.ok) {
        const newItem = await response.json()
        dispatch(addCartItem(newItem));
        dispatch(getCart(+cartId));
        return newItem;
    } else if (response.status === 404) {
        return [];
    }
}

export const deleteItem = (cartId, cartItemId) => async (dispatch) => {
    const response = await fetch(`/api/cart/${cartId}/cart_items/${cartItemId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const item = await response.json();
        dispatch(deleteCartItem((item)));
        dispatch(getCart(+cartId));
        return item
    } else if (response.status === 404) {
        return [];
    }
}

const cartReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_CART_ITEMS:
            if (action.payload.cart) {
                action.payload.cart.items.forEach((item) => newState[item.id] = item)
                return newState;
            }
            else {
                newState = action.payload
                return newState;
            }
        case ADD_CART_ITEM:
            newState = { ...state, [action.payload.id]: action.payload }
            return newState;
        case DELETE_CART_ITEM:
            newState = { ...state, [action.payload.id]: action.payload }
            return newState;
        default:
            return state;
    }
}

export default cartReducer;
