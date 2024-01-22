const LOAD_CART_ITEMS = "session/LOAD_CART_ITEMS";
const ADD_CART_ITEM = "session/ADD_CART_ITEM";
const DELETE_CART_ITEM = "session/DELETE_CART_ITEM";
const EDIT_CART_ITEM = "session/EDIT_CART_ITEM";
const PURCHASE_CART = "session/PURCHASE_CART";

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

const editCartItem = (item) => ({
    type: EDIT_CART_ITEM,
    payload: item
})

const buyItems = (cart) => ({
    type: PURCHASE_CART,
    payload: cart
})

const initialState = { allItems: [], byId: {}}


export const getCart = () => async (dispatch) => {
    try {
        const response = await fetch(`/api/cart`);
        if (response.ok) {
            const cartItems = await response.json();
            dispatch(loadCartItems(cartItems.Cart));
            dispatch({ type: 'SET_CART_ID', payload: cartItems.cart_id || undefined});
            return cartItems;
        }
    } catch (error) {
        throw error;
    }
}



export const addItem = (itemData, cartId) => async (dispatch) => {
    console.log(itemData)
    try {
        const options = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(itemData)
        }
        const response = await fetch(`/api/cart`, options);

        if (response.ok) {
            const newItem = await response.json()
            dispatch(addCartItem(newItem));
            dispatch(getCart(+cartId));
            return newItem;
        }

    } catch (error) {
        throw error;
    }
}

export const deleteItem = (cartItemId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/cart/cart_items/${cartItemId}`, {
            method: "DELETE"
        });

        if (response.ok) {
            const item = await response.json();
            dispatch(deleteCartItem((item)));
            dispatch(getCart());
            return item
        }
    } catch (error) {
        throw error;
    }
}

export const editItem = (itemData, cartItemId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/cart/cart_items/${cartItemId}`, {
            method: "PUT",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(itemData)
        })

        if (response.ok) {
            const item = await response.json();
            dispatch(editCartItem(item));
            dispatch(getCart());
            return item
        }
    } catch (error) {
        throw error;
    }
}

export const purchaseCart = (cartData) => async (dispatch) => {
    try {
        const response = await fetch(`/api/cart`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(cartData)
        })

        if (response.ok) {
            const purchase = await response.json();
            dispatch(buyItems(purchase));
            dispatch(getCart());
            return purchase
        }
    } catch (error) {
        throw error;
    }
}


const cartReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_CART_ITEMS:
            if (action.payload) {
                return {
                    ...state,
                    allItems: action.payload,
                    byId: action.payload.reduce((acc, item) => {
                        acc[item.id] = item;
                        return acc;
                    }, {})
                };
            } else {
                return state;
            }
        
        case ADD_CART_ITEM:
        case EDIT_CART_ITEM:
            newState = { ...state };
            return newState;
        case DELETE_CART_ITEM:
            newState = { ...state };
            return newState;
        case PURCHASE_CART:
            newState = { ...state };
            return newState;
        case 'SET_CART_ID':
            return { ...state, cartId: action.payload };
        default:
            return state;
    }
}

export default cartReducer;
