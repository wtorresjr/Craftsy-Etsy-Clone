const LOAD_ORDERS = "session/LOAD_ORDERS";

const loadOrders = (orders) => ({
  type: LOAD_ORDERS,
  payload: orders,
});

const initialState = { allOrders: [], byId: {} };

export const getOrders = () => async (dispatch) => {
  try {
    const response = await fetch(`/api/cart/orders`);
    if (response.ok) {
      const orders = await response.json();
      dispatch(loadOrders(orders.orderedItems));
      return orders;
    }
  } catch (res) {
    let errors = res.json();
    return errors;
  }
};

const orderReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_ORDERS:
      if (action.payload) {
        newState = {
          allOrders: action.payload,
          byId: action.payload.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
          }, {}),
        };
        return newState;
      }
      break;
    default:
      return state;
  }
};

export default orderReducer;
