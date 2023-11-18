import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProducts } from "../../store/products";
// import { NavLink } from 'react-router-dom';
import { getAllProducts, addNewProductImage } from "../../store/products";

const HomePage = () => {
  const dispatch = useDispatch();
  // const userCreatedProducts = useSelector(
  //   (state) => state?.products?.userCreatedProducts
  // );

  useEffect(() => {
    dispatch(getUserProducts());
    dispatch(getAllProducts());
  }, [dispatch]);

  const addNewImage = async () => {
    console.log("New Image Button Clicked");

    let newImage = {
      image_url: "http://testedFrom-site2.jpg",
      preview: true,
    };
    dispatch(addNewProductImage(3, newImage));
  };

  return (
    <>
      <h1>Home Page (Products page)</h1>
      <button onClick={addNewImage}>Add New Image</button>
    </>
  );
};

export default HomePage;
