import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllProducts } from "../../store/products";


const HomePage = () => {
  return (
    <>
      <h1>Home Page (Products page)</h1>
    </>
  );
};

export default HomePage;
