import "./ProductDetail.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { getAllProducts, getProductInfo } from "../../store/products";
import { fetchReviews, fetchReviewById } from "../../store/reviews";
import ReviewList from "../ReviewList";
import ProductTile from "../Product-Components/ProductTile";

import { addItem, editItem } from "../../store/cart";

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();
  const [selected, setSelected] = useState(1);
  const [loading, setLoading] = useState(true);
  const [productNotFound, setProductNotFound] = useState(false);

  const cart = useSelector(state => state?.cart?.allItems);
  const cartItem = cart.find((item) => item.product_id === +productId);
  const currentProduct = useSelector((state) => state?.products?.productDetail);
  let index = [];

  if (currentProduct) {
    for (let i = 1; i < currentProduct.quantity + 1; i++) {
      index.push(i);
    }
  }


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
    if (cartItem) {
      dispatch(editItem({ quantity: +selected }, cartItem.id));
    } else {
      const newCartItem = {
        product_id: +productId,
        quantity: +selected,
      };
      dispatch(addItem(newCartItem));
    }
    history.push("/cart")
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
              onClick={(e) => handleSelectChange(e)}
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
