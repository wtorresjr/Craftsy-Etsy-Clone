import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProducts } from "../../store/products";
// import { NavLink } from 'react-router-dom';
import {
  getAllProducts,
  addNewProductImage,
  editAproduct,
  addNewProduct,
} from "../../store/products";

const HomePage = () => {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const userCreatedProducts = useSelector(
    (state) => state?.products?.userCreated
  );
  const allProducts = useSelector((state) => state?.products?.Products);

  const addNewImage = () => {
    console.log("New Image Button Clicked");

    let newImage = {
      image_url: "http://testedFrom-site14.jpg",
      preview: true,
    };
    dispatch(addNewProductImage(4, newImage));
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
      name: "Ed On edit",
      description: "105000h time",
      price: 999.44,
      quantity: 5,
    };
    dispatch(editAproduct(3, dataToEdit));
    setRefresh((prev) => !prev);
  };
  useEffect(() => {
    dispatch(getUserProducts());
    dispatch(getAllProducts());
  }, [dispatch, refresh]);

  return (
    <>
      <h1>Home Page (Products page)</h1>
      <button onClick={addNewImage}>Add New Image</button>
      <button onClick={editProduct}>Edit A Product</button>
      <button onClick={handleCreateProduct}>Create A New Product</button>

      {userCreatedProducts && userCreatedProducts.length > 0 ? (
        userCreatedProducts.map((product, index) => (
          <div key={index}>
            <p>{product.id}</p>
            <p>{product.name}</p>
            <p>{product.description}</p>
          </div>
        ))
      ) : (
        <p>No Products Loaded</p>
      )}

      {/* {allProducts && allProducts.length > 0 ? (
        allProducts.map((product, index) => (
          <div key={index}>
            <p>ID{product.id}</p>
            <p>{product.name}</p>
            <p>{product.description}</p>
          </div>
        ))
      ) : (
        <p>No Products Loaded</p>
      )} */}
    </>
  );
};

export default HomePage;
