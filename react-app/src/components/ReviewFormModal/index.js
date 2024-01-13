import "./ReviewForm.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createReview, createReviewImage } from "../../store/reviews";
import { getAllProducts, getProductInfo } from "../../store/products";
import { useModal } from "../../context/Modal";
import {FaStar} from "react-icons/fa";


function ReviewFormModal({ productId }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const prodInfo = useSelector(state => state.products.productDetail)
  const currDateObj = new Date()
  const dateOnly = currDateObj.toISOString().split('T')[0];

  console.log('the prod info', prodInfo)
  const [review, setReview] = useState("");
  // const [star_rating, setStar_rating] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const [isDisabled, setDisabled] = useState(true);

  let [stars, setStars] = useState(null);
  const [hover, setHover] = useState(null);

  const errorCollector = {};

  useEffect(() => {
    const validFormats = [".jpg", "jpeg", ".png", " "];
    if (review.length < 1) {
      errorCollector.review = "Review is empty";
    } else if (!review.trim()) {
      errorCollector.review = "Review has only spaces";
    }

    if (stars === "") {
      errorCollector.stars = "Star Rating Required";
    } else if (stars < 1 || stars > 5 || !parseInt(stars)) {
      errorCollector.stars = "Invalid input for stars (must be between 1 - 5)";
    }
    if (image && !validFormats.includes(image.toLowerCase().slice(-4))) {
      errorCollector.rev_image =
        "Images are optional: Accepted formats .jpg, .jpeg or .png";
    }

    setErrors(errorCollector);
    if (Object.keys(errorCollector).length > 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [review, image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newReview = {
        review: review,
        star_rating: stars,
        image_url: image,
      };

      const response = await dispatch(createReview(productId, newReview));

      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <>
    <div className="reviews-modal-wrapper">
      <h1 className="reviews-modal-h1">Leave a Review</h1>
      <div className="reviews-modal-top">
        <div className="reviews-modal-product-img-div">
          <img src={prodInfo.preview_image_url} alt={prodInfo.name}/>
        </div>
        <div className="reviews-modal-product-info-div">
          <h3>{prodInfo.name}</h3>
          <p style={{color: "#A3A3A3"}}>Purchased from <span style={{color: "#595959"}}>{prodInfo.Seller.first_name}store</span> on {dateOnly}</p>
        </div>
      </div>

        <form onSubmit={handleSubmit}>
        <label> My review rating <span style={{color:'#A61A2D'}}>*</span></label>

            {/* <input
              type="number"
              value={star_rating}
              onChange={(e) => setStar_rating(e.target.value)}
              required
            /> */}

          <div className="reviews-modal-stars-div">
              {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              console.log(stars, ':the current rating')
              return (
                  <label key={i}>
                      <input
                          type='radio'
                          name='rating'
                          value={ratingValue}
                          onClick={() => setStars(ratingValue)}
                          />
                      <FaStar
                          className='star'
                          color={ratingValue <= (hover || stars) ? "#ffc107" : "#e4e5e9"}
                          size={20}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(null)}
                          />
                  </label>
                  )
              })}
          </div>
          {errors && errors.stars && <p className="errorDiv">{errors.stars}</p>}
          <label>
            Your review <span style={{color:'#A61A2D'}}>*</span>
            <input
              type="text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </label>
          {errors && errors.review && <p className="errorDiv">{errors.review}</p>}
          <label>
            Images
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Optional"
            />
          </label>
          {errors && errors.rev_image && (
            <p className="errorDiv">{errors.rev_image}</p>
          )}
          <button type="submit" disabled={isDisabled}>
            Submit a Review
          </button>
        </form>
    </div>
    </>
  );
}

export default ReviewFormModal;
