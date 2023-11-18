import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProducts } from "../../store/products";
// import { NavLink } from 'react-router-dom';
import {
  getAllProducts,
  addNewProductImage,
  editAproduct,
} from "../../store/products";

const HomePage = () => {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const userCreatedProducts = useSelector(
    (state) => state?.products?.userCreated
  );

  const addNewImage = () => {
    console.log("New Image Button Clicked");

    let newImage = {
      image_url: "http://testedFrom-site14.jpg",
      preview: true,
    };
    dispatch(addNewProductImage(14, newImage));
  };

  const editProduct = () => {
    console.log("Edit a product button clicked");
    let dataToEdit = {
      name: "Edited 200000",
      description: "ption 110000",
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

      {userCreatedProducts.length > 0 ? (
        userCreatedProducts.map((product, index) => (
          <div key={index}>
            <p>ID{product.id}</p>
            <p>{product.name}</p>
            <p>{product.description}</p>
          </div>
        ))
      ) : (
        <p>No Products Loaded</p>
      )}
    </>
  );
};

export default HomePage;
