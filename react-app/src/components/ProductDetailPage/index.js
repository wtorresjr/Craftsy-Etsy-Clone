import "./ProductDetail.css"

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";

import { getAllProducts, getProductInfo } from "../../store/products";
import { fetchReviews, fetchReviewById } from "../../store/reviews";
import ReviewList from '../ReviewList'
import ProductTile from "../Product-Components/ProductTile";



const ProductDetailPage = () => {
  const dispatch = useDispatch();

  const { productId } = useParams();
  const [selected, setSelected] = useState('');

  const currentProduct = useSelector((state) => state?.products?.productDetail);
  let index = [];
  for(let i = 1; i < currentProduct.quantity + 1; i++){
    index.push(i)
  }

  useEffect(() => {
    dispatch(fetchReviewById(parseInt(productId)))
    dispatch(getProductInfo(parseInt(productId)))
  }, [dispatch])

  const handleSelectChange = (e) => {
    setSelected(e.target.value)
  }

  return (
    <>
      <h1>{currentProduct?.name}</h1>

      {
        currentProduct?.preview_image_url ?
          <img src={currentProduct?.preview_image_url[0]} /> : "no image"
      }

      <div>

        <div className="itemprice">
          ${currentProduct?.price}
        </div>
        <div className="itemdescription">
          {currentProduct?.description}
        </div>
        <div className="itemarriving">
          <i class="fa-solid fa-check"></i>
          Arrives soon! Get it by Tomorrow if you order today
        </div>

      </div>

      <label className="dropdown">Quantity</label>
      <select id="dropdown" value={selected} onChange={handleSelectChange}>
        {
          index.map((idx) => {
          return (<option value={idx}>{idx}</option>)
          })
        }
      </select>
      <button>Add to Cart</button>

      <hr />

      Releated Searches

      <hr />

      <ReviewList productId={productId} />

      <hr />
    </>
  );
};

export default ProductDetailPage;
