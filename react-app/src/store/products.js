const GET_ALL_PRODUCTS = "products/GET_ALL_PRODUCTS";
// const GET_PRODUCT_DETAILS = "products/GET_PRODUCT_DETAILS";
// const REMOVE_PRODUCT = "products/DELETE_PRODUCT";
const CREATE_PRODUCT = "products/CREATE_PRODUCT";
const GET_PRODUCT_REVIEWS = "products/GET_PRODUCT_REVIEWS";

const ADD_PRODUCT_IMAGE = "products/ADD_PRODUCT_IMAGE";
const GET_PRODUCTS_BY_USER = "products/GET_PRODUCTS_BY_USER";
const EDIT_PRODUCT = "products/EDIT_PRODUCT";

const loadProducts = (allFoundProducts) => {
  return {
    type: GET_ALL_PRODUCTS,
    payload: allFoundProducts,
  };
};

const addProductImage = (productImage) => {
  return {
    type: ADD_PRODUCT_IMAGE,
    payload: productImage,
  };
};

// const productDetails = (product) => {
//   return {
//     type: GET_PRODUCT_DETAILS,
//     payload: product,
//   };
// };

// const removeProduct = (productId) => {
// return {
//   type: REMOVE_PRODUCT,
//   payload: productId,
// };
// };

const addProduct = (productData) => ({
  type: CREATE_PRODUCT,
  productData,
});

const allProductReviews = (reviews) => ({
  type: GET_PRODUCT_REVIEWS,
  reviews,
});

const getProductsByUser = (userProducts) => {
  return {
    type: GET_PRODUCTS_BY_USER,
    payload: userProducts,
  };
};

const editProduct = (editedProduct) => {
  return {
    type: EDIT_PRODUCT,
    payload: editedProduct,
  };
};

// Get all Products
export const getAllProducts = () => async (dispatch) => {
  try {
    const response = await fetch("/api/products/", {
      method: "GET",
    });
    if (response.ok) {
      const allProducts = await response.json();
      dispatch(loadProducts(allProducts));
      return allProducts;
    }
  } catch (error) {
    throw error;
  }
};

//Get Product By ID
// export const getProductInfo = (productId) => async (dispatch) => {
//   const response = await fetch(`/api/products/${productId}`);
//   if (response.ok) {
//     const data = await response.json();
//     dispatch(productDetails(data));
//     return data;
//   }
// };

//Delete a Product by ID
// export const deleteProduct = (productId) => async (dispatch) => {
//   const response = await fetch(`/api/products/${productId}`, {
//     method: "DELETE",
//   });
//   dispatch(removeProduct(productId));
// };

//Get Product Reviews By Product ID

//Create A New Product
export const addNewProduct = (productData) => async (dispatch) => {
  try {
    const response = await fetch("/api/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      const newProduct = await response.json();
      dispatch(addProduct(newProduct));
      return newProduct;
    }
  } catch (error) {
    throw error;
  }
};

//Edit a Product

export const editAproduct = (product_id, editData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/${product_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    });
    if (response.ok) {
      const edited = await response.json();
      dispatch(editProduct(edited));
      return edited;
    }
  } catch (error) {
    throw error;
  }
};

//Get Product Reviews By Product ID
export const getAllProductReviews = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(allProductReviews(reviews));
    return reviews;
  }
};

//Get All Products Created By Current User

export const getUserProducts = () => async (dispatch) => {
  try {
    const response = await fetch("/api/products/current-user", {
      method: "GET",
    });
    if (response.ok) {
      const foundUserProducts = await response.json();
      dispatch(getProductsByUser(foundUserProducts));
      return foundUserProducts;
    }
  } catch (error) {
    throw error;
  }
};

//Add a Product Image

export const addNewProductImage =
  (product_id, imageInfo) => async (dispatch) => {
    try {
      const response = await fetch(`/api/products/${+product_id}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(imageInfo),
      });
      if (response.ok) {
        const newImageToAdd = await response.json();
        dispatch(addProductImage(newImageToAdd));
        return newImageToAdd;
      }
    } catch (error) {
      throw error;
    }
  };

//Delete A Product Image

const initialState = {
  // products:{}
  allProducts: {},
  newImageAdded: [],
  productEdit: {},
  userCreated: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, ...state.allProducts, ...action.payload };
    case ADD_PRODUCT_IMAGE:
      return {
        ...state,
        newImageAdded: [...state.newImageAdded, action.payload],
      };
    case EDIT_PRODUCT:
      return { ...state, ...state.productEdit, ...action.payload };
    case GET_PRODUCTS_BY_USER:
      return {
        ...state,
        userCreated: [state.userCreated, ...action.payload],
      };
    case CREATE_PRODUCT:
      return { ...state, [action.productData.id]: action.productData };
    case GET_PRODUCT_REVIEWS:
      let productReviewState = {};
      action.reviews.forEach(
        (review) => (productReviewState[review.id] = review)
      );
      return productReviewState;
    default:
      return state;
  }
}
