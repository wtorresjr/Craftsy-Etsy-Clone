import "./ProductDetail.css"

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import getProductInfo from "../../store/products";
import fetchReviewById from '../../store/reviews'

const ProductDetailPage = ({productId}) => {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const currentProduct = useSelector((state) => state?.products?.productDetail);
  const productReviews = useSelector((state) => state.reviews.reviewByProductId)

  useEffect(() => {
    dispatch(getProductInfo(productId))
    dispatch(fetchReviewById(productId))
  }, [dispatch, sessionUser]);


  return (
    <>
      <div className="mainPage">
        {allProducts &&
          allProducts.map((product) => {
            return <ProductTile key={product.id} product={product} />;
          })}
      </div>
    </>
  );
};

export default ProductDetailPage;
