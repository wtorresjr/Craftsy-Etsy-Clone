const GET_PRODUCTS = "products/GET_PRODUCTS";
const GET_PRODUCT_DETAILS = "products/GET_PRODUCT_DETAILS";
const REMOVE_PRODUCT = "products/DELETE_PRODUCT";

const GET_PRODUCTS_BY_USER = "products/GET_PRODUCTS_BY_USER";
const EDIT_PRODUCT = "products/EDIT_PRODUCT";

const allProducts = (products) => ({
  type: GET_PRODUCTS,
  products,
});

const productDetails = (product) => ({
  type: GET_PRODUCT_DETAILS,
  product,
});

const removeProduct = (productId) => ({
  type: REMOVE_PRODUCT,
  productId,
});

const getProductsByUser = (userProducts) => ({
  type: GET_PRODUCTS_BY_USER,
  payload: userProducts,
});

const editProduct = (editedProduct) => ({
  type: EDIT_PRODUCT,
  payload: editedProduct,
});

//Get all Products
export const getAllProducts = () => async (dispatch) => {
  const response = await fetch("/api/products");
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    const products = data.Products;
    dispatch(allProducts(products));
    return products;
  }
};

//Get Product By ID
export const getProductInfo = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(productDetails(data));
    return data;
  }
};

//Delete a Product by ID
export const deleteProduct = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`, {
    method: "DELETE",
  });
  dispatch(removeProduct(productId));
};

//Get Product Reviews By Product ID

//Create A New Product

//Edit a Product

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
    case GET_PRODUCTS:
      let allProductsState = {};
      action.products.forEach((product) => {
        if (product) {
          allProductsState[product.id] = product;
        }
      });
      return allProductsState;
    case GET_PRODUCT_DETAILS:
      const singleProductState = action.product;
      return singleProductState;
    case EDIT_PRODUCT:
      return { ...state, productEdited: action.editedProduct };
    case GET_PRODUCTS_BY_USER:
      return { ...state, userCreatedProducts: action.userProducts };
    default:
      return state;
  }
}
