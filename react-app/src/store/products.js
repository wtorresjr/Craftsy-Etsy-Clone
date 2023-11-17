const GET_PRODUCTS = "products/GET_PRODUCTS"
const GET_PRODUCT_DETAILS = "products/GET_PRODUCT_DETAILS"
const REMOVE_PRODUCT = "products/DELETE_PRODUCT"


const allProducts = (products) => ({
  type: GET_PRODUCTS,
  products
})

const productDetails = (product) => ({
  type: GET_PRODUCT_DETAILS,
  product
})

const removeProduct = (productId) => ({
  type: REMOVE_PRODUCT,
  productId
})


//Get all Products
export const getAllProducts = () => async (dispatch) => {
  const response = await fetch("/api/products")
  if (response.ok) {
    const data = await response.json()
    console.log(data)
    const products = data.Products
    dispatch(allProducts(products))
    return products
  }
}

//Get Product By ID
export const getProductInfo = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`)
  if (response.ok) {
    const data = await response.json()
    dispatch(productDetails(data))
    return data
  }
}

//Delete a Product by ID
export const deleteProduct = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`, {
    method: 'DELETE'
  })
  dispatch(removeProduct(productId))
}

//Get Product Reviews By Product ID

//Create A New Product








//Edit a Product


//Create a Product Review By Product ID


//Get All Products Created By Current User


//Add a Product Image


//Delete A Product Image


const initialState = {};



export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      let allProductsState = {}
      action.products.forEach((product) => {
        if (product) {
          allProductsState[product.id] = product
        }
      })
      return allProductsState;
    case GET_PRODUCT_DETAILS:
      const singleProductState = action.product
      return singleProductState
    default:
      return state;
  }
}
