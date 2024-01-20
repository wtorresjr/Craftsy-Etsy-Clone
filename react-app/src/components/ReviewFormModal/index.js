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
  const [showReviewImage, setShowReviewImage] = useState(true);
  const [reviewImageDisplay, setReviewImageDisplay] = useState("");
  let [stars, setStars] = useState(null);
  const [hover, setHover] = useState(null);
  const [errors, setErrors] = useState({});
  const [isDisabled, setDisabled] = useState(true);
  const [showErrors, setShowErrors] = useState(false)

  const submitButtonCN = isDisabled ? 'disabled-button': 'enabled-button'

  // Function to add AWS image
  const addReviewImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setReviewImageDisplay(reader.result);
    }
    setImage(file);
    setShowReviewImage(false);
  }

  const errorCollector = {};

  useEffect(() => {
    // const validFormats = [".jpg", "jpeg", ".png", " "];
    if (review.length < 1) {
      errorCollector.review = "Review is empty";
    } else if (!review.trim()) {
      errorCollector.review = "Review has only spaces";
    }

    if (!stars) {
      errorCollector.stars = "Star Rating Required";
    }

    // if (image && !validFormats.includes(image.toLowerCase().slice(-4))) {
    //   errorCollector.rev_image =
    //     "Images are optional: Accepted formats .jpg, .jpeg or .png";
    // }

    setErrors(errorCollector);
    if (Object.keys(errorCollector).length > 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [review, image, stars]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true);

    const formData = new FormData();
    formData.append('review', review);
    formData.append('star_rating', stars);
    formData.append('image_url', image)

    const data = await dispatch(createReview(productId, formData))
    if (data) {
      closeModal();
      window.location.reload();
    }
  }


  //   try {
  //     const newReview = {
  //       review: review,
  //       star_rating: stars,
  //       image_url: image,
  //     };

  //     const response = await dispatch(createReview(productId, newReview));


  //   } catch (error) {
  //     console.error("Error submitting review:", error);
  //   }
  // };



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

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="reviews-modal-stars-div-create">
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
          <label htmlFor="review-file-upload">Images</label>
            <input
              type="file"
              id="review-file-upload"
              name="image"
              onChange={addReviewImage}
              placeholder="Optional"
            />
          {showErrors && errors?.rev_image && (<p className="errorDiv">{errors.rev_image}</p>)}
          {!showReviewImage && (
          <div className="review-img-div">
            <img
              src={reviewImageDisplay}
              alt="review image"
              style={{
                width: "50px",
                height: "50px",
                border: "1px solid #d4d3d1",
                padding: "3px",
                position: "relative"
              }}
            />
          </div>
        )}
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
