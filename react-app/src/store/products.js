//Get all Products

//Get Product By ID

//Delete a Product by ID

//Get Product Reviews By Product ID

//Create A New Product

//Edit a Product
const EDIT_PRODUCT = "products/EDIT_PRODUCT";
const editProduct = (editedProduct) => ({
  type: EDIT_PRODUCT,
  payload: editedProduct,
});

export const editAproduct =
  (product_id, name, description, price, preview_image_url) =>
  async (dispatch) => {
    try {
      const response = await fetch(`/api/products/${product_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
          preview_image_url,
        }),
      });

      const edited = await response.json();
      dispatch(editProduct(edited));
      return edited;
    } catch (error) {
      throw error;
    }
  };

//Create a Product Review By Product ID

//Get All Products Created By Current User
const GET_PRODUCTS_BY_USER = "products/GET_PRODUCTS_BY_USER";
const getProductsByUser = (userProducts) => ({
  type: GET_PRODUCTS_BY_USER,
  payload: userProducts,
});

export const getUserProducts = () => async (dispatch) => {
  try {
    const response = await fetch("/api/products/current-user", {
      method: "GET",
    });
    const foundUserProducts = await response.json();
    dispatch(getProductsByUser(foundUserProducts));
    return foundUserProducts;
  } catch (error) {
    throw error;
  }
};

//Add a Product Image

//Delete A Product Image

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_PRODUCT:
      return { ...state, productEdited: action.editedProduct };
    case GET_PRODUCTS_BY_USER:
      return { ...state, userCreatedProducts: action.userProducts };
    default:
      return state;
  }
}
