import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProducts } from "../../store/products";

const HomePage = () => {
  const dispatch = useDispatch();
  const userCreatedProducts = useSelector(
    (state) => state?.products?.userCreatedProducts
  );

  useEffect(() => {
    dispatch(getUserProducts);
  });

  return (
    <>
      <h1>Home Page (Products page)</h1>
    </>
  );
};

export default HomePage;
