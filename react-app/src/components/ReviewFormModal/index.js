import "./ReviewForm.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createReview, createReviewImage } from "../../store/reviews";
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
  const [image, setImage] = useState("");
  let [stars, setStars] = useState(null);
  const [hover, setHover] = useState(null);
  const [errors, setErrors] = useState({});
  const [isDisabled, setDisabled] = useState(true);
  const [showErrors, setShowErrors] = useState(false)

  const submitButtonCN = isDisabled ? 'disabled-button': 'enabled-button'

  const errorCollector = {};

  useEffect(() => {
    const validFormats = [".jpg", "jpeg", ".png", " "];
    if (review.length < 1) {
      errorCollector.review = "Review is empty";
    } else if (!review.trim()) {
      errorCollector.review = "Review has only spaces";
    }

    if (!stars) {
      errorCollector.stars = "Star Rating Required";
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
  }, [review, image, stars]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true)

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
          <div className="reviews-modal-stars-div">
            <label> My review rating <span style={{color:'#A61A2D'}}>*</span></label>
            <div className="stars-div">
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
                            color={ratingValue <= (hover || stars) ? "#000000" : "#e4e5e9"}
                            size={30}
                            style={{cursor:'pointer'}}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                            />
                    </label>
                    )
                })}
            </div>
            {showErrors && errors?.stars && <p className="errorDiv">{errors.stars}</p>}
          </div>
          <div className="reviews-modal-review-div">
            <label>Your review <span style={{color:'#A61A2D'}}>*</span></label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            >
            </textarea>
            {showErrors && errors?.review && <p className="errorDiv">{errors.review}</p>}
          </div>
          <div className="reviews-modal-images-div">
          <label>Images</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Optional"
            />
          {showErrors && errors?.rev_image && (<p className="errorDiv">{errors.rev_image}</p>)}
          </div>
          <div className="reviews-modal-submit-button-div">
            <button type="submit" disabled={isDisabled} className={submitButtonCN}>Submit Review</button>
          </div>
        </form>
    </div>
    </>
  );
}

export default ReviewFormModal;
