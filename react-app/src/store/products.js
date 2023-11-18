const GET_ALL_PRODUCTS = "products/GET_PRODUCTS";
// const GET_PRODUCT_DETAILS = "products/GET_PRODUCT_DETAILS";
// const REMOVE_PRODUCT = "products/DELETE_PRODUCT";

const ADD_PRODUCT_IMAGE = "products/ADD_PRODUCT_IMAGE";
const GET_PRODUCTS_BY_USER = "products/GET_PRODUCTS_BY_USER";
// const EDIT_PRODUCT = "products/EDIT_PRODUCT";

const loadProducts = (allFoundProducts) => {
  return {
    type: GET_ALL_PRODUCTS,
    allFoundProducts,
  };
};

const addProductImage = (productImage) => {
  return {
    type: ADD_PRODUCT_IMAGE,
    productImage,
  };
};

// const productDetails = (product) => {
//   return {
//     type: GET_PRODUCT_DETAILS,
//     product,
//   };
// };

// const removeProduct = (productId) => {
// return {
//   type: REMOVE_PRODUCT,
//   productId,
// };
// };

const getProductsByUser = (userProducts) => {
  return {
    type: GET_PRODUCTS_BY_USER,
    userProducts,
  };
};

// const editProduct = (editedProduct) => {
//   return {
//     type: EDIT_PRODUCT,
//     editedProduct,
//   };
// };

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

//Edit a Product

// export const editAproduct =
//   (product_id, name, description, price, preview_image_url) =>
//   async (dispatch) => {
//     try {
//       const response = await fetch(`/api/products/${product_id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           description,
//           price,
//           preview_image_url,
//         }),
//       });

//       const edited = await response.json();
//       dispatch(editProduct(edited));
//       return edited;
//     } catch (error) {
//       throw error;
//     }
//   };

//Create a Product Review By Product ID

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
  productEdited: null,
  userCreatedProducts: null,
  //   allProducts: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, ...action.allFoundProducts };
    case ADD_PRODUCT_IMAGE:
      return { ...state, newImageAdded: action.productImage };
    // case GET_PRODUCT_DETAILS:
    //   const singleProductState = action.product;
    //   return singleProductState;
    // case EDIT_PRODUCT:
    //   return { ...state, productEdited: [...action.editedProduct] };
    case GET_PRODUCTS_BY_USER:
      return { ...state, userCreatedProducts: [...action.userProducts] };
    default:
      return state;
  }
}
