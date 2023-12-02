const GET_ALL_PRODUCTS = "products/GET_ALL_PRODUCTS";
const GET_PRODUCT_DETAILS = "products/GET_PRODUCT_DETAILS";
const REMOVE_PRODUCT = "products/DELETE_PRODUCT";
const CREATE_PRODUCT = "products/CREATE_PRODUCT";

const ADD_PRODUCT_IMAGE = "products/ADD_PRODUCT_IMAGE";
const GET_PRODUCTS_BY_USER = "products/GET_PRODUCTS_BY_USER";
const EDIT_PRODUCT = "products/EDIT_PRODUCT";
const RESET_PRODUCTS = "products/RESET_PRODUCTS";

const resetProducts = (products) => {
  return {
    type: RESET_PRODUCTS,
    payload: products,
  };
};

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

const productDetails = (productDetail) => {
  return {
    type: GET_PRODUCT_DETAILS,
    payload: productDetail,
  };
};

const removeProduct = (removedProduct) => {
  return {
    type: REMOVE_PRODUCT,
    payload: removedProduct,
  };
};

const addProduct = (productData) => ({
  type: CREATE_PRODUCT,
  productData,
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

// Get Product By ID
export const getProductInfo = (productId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/${productId}`);
    if (response.ok) {
      const productFound = await response.json();
      dispatch(productDetails(productFound));
      return productFound;
    }
  } catch (error) {
    throw error;
  }
};

//Delete a Product by ID
export const deleteProduct = (product_id) => async (dispatch) => {
  try {
    console.log("THunk reached");
    const response = await fetch(`/api/products/${product_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      console.log("response ok");
      const deletedItem = await response.json();
      dispatch(removeProduct(deletedItem));
      dispatch(getUserProducts());
      return deletedItem;
    }
  } catch (error) {
    throw error;
  }
};

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

export const resetAllProducts = () => async (dispatch) => {
  try {
    await dispatch(resetProducts());
  } catch (err) {
    throw err;
  }
};

const initialState = {
  allProducts: [],
  newImageAdded: [],
  productEdit: {},
  allUserCreated: [],
  removedProduct: [],
  productDetail: [],
};

export default function reducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    ///////////////////////////////////
    ///////////////////////////////////
    case RESET_PRODUCTS:
      console.log("Reset Products");
      newState = {
        allProducts: [],
        newImageAdded: [],
        productEdit: {},
        allUserCreated: [],
        removedProduct: [],
        productDetail: [],
      };
      return newState;
    ///////////////////////////////////
    ///////////////////////////////////
    case GET_ALL_PRODUCTS:
      if (action.payload.Products) {
        const productsById = {};
        action.payload.Products.forEach((productFound) => {
          productsById[productFound.id] = productFound;
        });
        newState = {
          ...state,
          allProducts: action.payload.Products,
          allProductsById: productsById,
        };
        return newState;
      } else {
        newState = action.payload;
        return newState;
      }
    ///////////////////////////////////
    ///////////////////////////////////
    case ADD_PRODUCT_IMAGE:
      if (action.payload.New_Image_Added) {
        newState = {
          newImageAdded: action.payload.New_Image_Added,
        };
        return newState;
      } else {
        newState = action.payload;
        return newState;
      }
    ///////////////////////////////////
    ///////////////////////////////////
    case EDIT_PRODUCT:
      return { ...state, ...state.productEdit, ...action.payload };
    ///////////////////////////////////
    ///////////////////////////////////
    case GET_PRODUCTS_BY_USER:
      if (action.payload.User_Products) {
        const userProductsById = {};
        action.payload.User_Products.forEach((userProduct) => {
          userProductsById[userProduct.id] = userProduct;
        });
        newState = {
          allUserCreated: action.payload.User_Products,
          userCreatedById: userProductsById,
        };
        return newState;
      } else {
        newState = action.payload;
        return newState;
      }
    ///////////////////////////////////
    ///////////////////////////////////
    case GET_PRODUCT_DETAILS:
      if (action.payload.Product_Details) {
        return {
          ...state,
          productDetail: action.payload.Product_Details,
        };
      } else {
        return {
          ...state,
          productDetail: action.payload,
        };
      }
    ///////////////////////////////////
    ///////////////////////////////////
    case CREATE_PRODUCT:
      return { ...state, [action.productData.id]: action.productData };
    ///////////////////////////////////
    ///////////////////////////////////
    case REMOVE_PRODUCT:
      return {
        ...state,
        // removedProduct: [state.removedProduct, action.payload],
      };

    default:
      return state;
  }
}
