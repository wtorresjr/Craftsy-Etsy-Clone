import './ReviewForm.css';
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { EditReview } from '../../store/reviews'
import { useModal } from '../../context/Modal'
import { useSelector } from 'react-redux';
import {FaStar} from "react-icons/fa";


function ReviewEditModal ({review}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const previousReviewImg = review?.ReviewImages[0] ? review.ReviewImages[0]["image"] : ""
  const prodInfo = useSelector(state => state.products.productDetail)
  const currDateObj = new Date()
  const dateOnly = currDateObj.toISOString().split('T')[0];
  const [image, setImage] = useState(previousReviewImg);
  const [showReviewImage, setShowReviewImage] = useState(true);
  const [reviewImageDisplay, setReviewImageDisplay] = useState("");
  const [reviewData, setReviewData] = useState(review.review);
  let [stars, setStars] = useState(review.star_rating);
  const [hover, setHover] = useState(null);
  const [errors, setErrors] = useState({});
  const [isDisabled, setDisabled] = useState(true);
  const [showErrors, setShowErrors] = useState(false);
  const [backendErrors, setBackendErrors] = useState([]);
  const [onHoverHelp, setOnHoverHelp] = useState(false);
  const errorCollector = {};



  const submitButtonCN = isDisabled ? 'disabled-button': 'enabled-button'

  // Function to add AWS image
  const updateReviewImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setReviewImageDisplay(reader.result);
      }
      setImage(file);
      setShowReviewImage(false);
    }
    else {
      setImage(null);
      setShowReviewImage(true);
      setReviewImageDisplay(null);
    }
  };



  useEffect(() => {
    if(reviewData.length < 1) {
      errorCollector.review = "review is empty"
    } else if (!reviewData.trim()) {
      errorCollector.review = "review has only spaces"
    };

    if(!stars){
      errorCollector.stars = "Star Rating Required"
    };

    setErrors(errorCollector);

    if (Object.keys(errorCollector).length > 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [reviewData, image, stars, backendErrors]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(Object.values(errors).length > 0);
    try {
      const formData = new FormData();
      formData.append("review", reviewData);
      formData.append("star_rating", stars);
      formData.append("image_url", image);

      const data = await dispatch(EditReview(review.id, formData))
      if (data.errors) {
        setBackendErrors(data.errors);
      } else {
        setBackendErrors(null);
        if (Object.keys(errors).length === 0) {
          closeModal();
          window.location.reload();
        }
      }
    } catch (error) {
      throw error
    }
  };


  return (
    <>
    <div className="reviews-modal-wrapper">
      <h1 className="reviews-modal-h1">Update Your Review</h1>
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
          <div className="reviews-modal-stars-div-edit">
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
              value={reviewData}
              onChange={(e) => setReviewData(e.target.value)}
              required
            >
            </textarea>
            {showErrors && errors?.review && <p className="errorDiv">{errors.review}</p>}
          </div>
          <div className="reviews-modal-images-div">
          <label htmlFor="update-review-file-upload">Images  </label>
          <span>
            <i className="fa-solid fa-circle-info"
              onMouseOver={() => setOnHoverHelp(true)}
              onMouseOut={() => setOnHoverHelp(false)}
            ></i>
            {onHoverHelp? <div className="image-help"><p>Image files accepted: <br />JPG, JPEG, PNG, WEBP</p></div> : null}
          </span>
            <input
              type="file"
              id="update-review-file-upload"
              onChange={updateReviewImage}
              accept=".png, .jpg, .jpeg, .webp"
              name="image"
              placeholder="Optional"
              className='image-uploader'
            />
          {showErrors && errors?.rev_image && (<p className="errorDiv">{errors.rev_image}</p>)}
          {!showReviewImage ? (
          <div className="review-img-div">
            <img
              src={reviewImageDisplay}
              alt="review image"
              className='review-image-1'
            />
          </div>)
          : (
          <div className="review-img-div">
            <img
              src={image}
              alt="review image"
              className='review-image-1'
            />
          </div>)}
          </div>
          {Array.isArray(backendErrors) && backendErrors.map((err, i) => (<p key={`${err}-${i}`} className="errorDiv">{err}</p>))}
          <div className="reviews-modal-submit-button-div">
            <button type="submit" disabled={isDisabled} className={submitButtonCN}>Update Review</button>
          </div>
        </form>
    </div>
    </>
  );
}

export default ReviewEditModal
