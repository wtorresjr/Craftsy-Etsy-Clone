import "./ProductDetail.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { getAllProducts, getProductInfo } from "../../store/products";
import { fetchReviews, fetchReviewById } from "../../store/reviews";
import ReviewList from "../ReviewList";
import ProductTile from "../Product-Components/ProductTile";

import { addItem } from "../../store/cart";

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();
  const [selected, setSelected] = useState(1);
  const [loading, setLoading] = useState(true);
  const [productNotFound, setProductNotFound] = useState(false);

  const currentProduct = useSelector((state) => state?.products?.productDetail);
  let index = [];

  if (currentProduct) {
    for (let i = 1; i < currentProduct.quantity + 1; i++) {
      index.push(i);
    }
  }

  //useSelector to get the current cart
  const currentCart = useSelector((state) => state?.cart?.cartId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(fetchReviewById(parseInt(productId)));
        const prodInfo = await dispatch(getProductInfo(parseInt(productId)));
        if (prodInfo) {
          setLoading(false);
        } else {
          setLoading(false);
          setProductNotFound(true);
        }
      } catch (error) {
        throw error;
      }
    };

    fetchData();
  }, [dispatch, productId]);

  const handleSelectChange = (e) => {
    setSelected(e.target.value);
  };

  const handleAddToCart = async () => {
    const newCartItem = {
      product_id: productId,
      cart_id: currentCart,
      quantity: selected,
    };
    dispatch(addItem(newCartItem, currentCart)).then(history.push("/cart"));
  };

  return (
    <>
      {loading ? (
        <h1 style={{ textAlign: "center" }}>Loading...</h1>
      ) : productNotFound ? (
        <div style={{ textAlign: "center" }}>
          <h2>No product found</h2>
          <Link to="/">
            <button>Go Back To Products</button>
          </Link>
        </div>
      ) : (
        <div className="prodDetailsContain">
          <div>
            <h1>{currentProduct?.name}</h1>
            {currentProduct?.preview_image_url ? (
              <img
                src={currentProduct?.preview_image_url[0]}
                alt="Product Preview"
              />
            ) : (
              "no image"
            )}
            <div className="itemprice">
              ${currentProduct?.price?.toFixed(2)}
            </div>
            <div className="itemdescription">{currentProduct?.description}</div>
            <div className="itemarriving">
              <i className="fa-solid fa-check"></i>
              Arrives soon! Get it by Tomorrow if you order today
            </div>
            <label className="dropdown">Quantity</label>
            <select
              id="dropdown"
              defaultValue={1}
              onChange={handleSelectChange}
            >
              {index.map((idx) => (
                <option key={idx} value={idx}>
                  {idx}
                </option>
              ))}
            </select>
            <button onClick={handleAddToCart}>Add to Cart</button>
            <hr />
            Related Searches
            <hr />
            <ReviewList productId={productId} />
            <hr />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;
