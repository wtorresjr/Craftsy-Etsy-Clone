import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProducts } from "../../store/products";
// import { NavLink } from 'react-router-dom';
import {
  getAllProducts,
  addNewProductImage,
  editAproduct,
  addNewProduct,
  deleteProduct,
} from "../../store/products";

const HomePage = () => {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const userCreatedProducts = useSelector(
    (state) => state?.products?.allUserCreated
  );
  const allProducts = useSelector((state) => state?.products?.allProducts);

  const addNewImage = () => {
    console.log("New Image Button Clicked");

    let newImage = {
      image_url: "http://testedAgain2.jpg",
      preview: true,
    };
    dispatch(addNewProductImage(8, newImage));
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

    dispatch(addNewProduct(newProduct));
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
  useEffect(() => {
    // dispatch(getUserProducts());
    dispatch(getAllProducts());
  }, [dispatch, refresh]);

  return (
    <>
      <h1>Home Page (Products page)</h1>
      <button onClick={addNewImage}>Add New Image</button>
      <button onClick={editProduct}>Edit A Product</button>
      <button onClick={handleCreateProduct}>Create A New Product</button>
      <button onClick={handleDeleteProduct}>Delete A Product</button>

      {/* {userCreatedProducts && userCreatedProducts.length > 0 ? (
        userCreatedProducts.map((product) => (
          <div key={product?.id}>
            <p>{product?.id}</p>
            <p>{product?.name}</p>
            <p>{product?.description}</p>
          </div>
        ))
      ) : (
        <p>No Products Loaded</p>
      )} */}

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
