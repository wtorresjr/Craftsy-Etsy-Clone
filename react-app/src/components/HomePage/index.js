import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from 'react-router-dom';
import {
  getAllProducts,
  addNewProductImage,
  editAproduct,
  // addNewProduct,
  deleteProduct,
  getUserProducts,
  getProductInfo,
} from "../../store/products";

import { loadCurrUserFavorites } from "../../store/favorite";

const HomePage = () => {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const userCreatedProducts = useSelector(
    (state) => state?.products?.allUserCreated
  );
  const sessionUser = useSelector((state) => state.session.user);
  const allProducts = useSelector((state) => state?.products?.allProducts);
  const productById = useSelector((state) => state.products.allProductsById);
  const [chosenProduct, setChosenProduct] = useState(null);

  useEffect(() => {
    dispatch(getUserProducts());
    // dispatch(getAllProducts());
    // dispatch(loadCurrUserFavorites());
  }, [dispatch, refresh, sessionUser]);

  const addNewImage = () => {
    console.log("New Image Button Clicked");

    let newImage = {
      image_url: "http://testedAgain2.jpg",
      preview: true,
    };
    dispatch(addNewProductImage(3, newImage));
    setRefresh((prev) => !prev);
  };
  const handleCreateProduct = () => {
    console.log("Create New Product Button Clicked");

    let newProduct = {
      name: "New Product Created",
      description: "New Product Description",
      price: 199.99,
      quantity: 100,
      preview_image_url: "http://testedFromSite.jpg",
    };

    // dispatch(addNewProduct(newProduct));
    setRefresh((prev) => !prev);
  };

  const editProduct = () => {
    console.log("Edit a product button clicked");
    let dataToEdit = {
      name: "Edit test to refresh all products edit 3",
      description: "Edit test to refresh all products edit 3",
      price: 999.44,
      quantity: 5,
    };
    dispatch(editAproduct(8, dataToEdit));
    setRefresh((prev) => !prev);
  };

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(8));
    setRefresh((prev) => !prev);
  };

  const handleGetProductDetail = () => {
    setChosenProduct(39);
    setRefresh((prev) => !prev);
  };

  return (
    <>
      <h1>Home Page (Products page)</h1>
      <p>
        <button onClick={addNewImage}>Add New Image</button>
      </p>
      <p>
        <button onClick={editProduct}>Edit A Product</button>
      </p>
      <p>
        <button onClick={handleCreateProduct}>Create A New Product</button>
      </p>
      <p>
        <button onClick={handleDeleteProduct}>Delete A Product</button>
      </p>
      <p>
        <button onClick={handleGetProductDetail}>Get Product Detail</button>
      </p>

      {chosenProduct && (
        <div>
          <p>{productById[chosenProduct].name}</p>
          <p>{productById[chosenProduct].description}</p>
          <p>{productById[chosenProduct].price}</p>
          <p>{productById[chosenProduct].quantity}</p>
        </div>
      )}
      <h2>User Created Products</h2>
      {userCreatedProducts && userCreatedProducts.length > 0 ? (
        userCreatedProducts.map((product) => (
          <div key={product?.id}>
            <p>{product?.id}</p>
            <p>{product?.name}</p>
            <p>{product?.description}</p>
          </div>
        ))
      ) : (
        <p>No Products Loaded</p>
      )}
      <h2>All Products</h2>
      {allProducts && allProducts.length > 0 ? (
        allProducts.map((product) => (
          <div key={product?.id}>
            <p>ID{product.id}</p>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>ProductImages = {product.Product_Images.length}</p>
          </div>
        ))
      ) : (
        <p>No Products Loaded</p>
      )}
    </>
  );
};

export default HomePage;
