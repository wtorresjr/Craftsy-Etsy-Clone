import './ReviewForm.css';
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { EditReview } from '../../store/reviews'
import { useModal } from '../../context/Modal'
import { useSelector } from 'react-redux';
import {FaStar} from "react-icons/fa";


function ReviewEditModal ({review}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const prodInfo = useSelector(state => state.products.productDetail)
  const currDateObj = new Date()
  const dateOnly = currDateObj.toISOString().split('T')[0];

  const [reviewData, setReviewData] = useState(review.review);
  let [stars, setStars] = useState(review.star_rating);
  const [hover, setHover] = useState(null);
  const [errors, setErrors] = useState({});
  const [isDisabled, setDisabled] = useState(true);
  const [showErrors, setShowErrors] = useState(false)
  const submitButtonCN = isDisabled ? 'disabled-button': 'enabled-button'

  const errorCollector = {}

  useEffect(() => {
    if(reviewData.length < 1) {
      errorCollector.review = "review is empty"
    }
    else if (!reviewData.trim()) {
      errorCollector.review = "review has only spaces"
    }

    if(!stars){
      errorCollector.stars = "Star Rating Required"
    }
    // else if(parseInt(stars) !== 1 && parseInt(star_rating) !== 2 &&
    // parseInt(star_rating) !== 3 &&
    // parseInt(star_rating) !== 4 &&
    // parseInt(star_rating) !== 5 ) {
    //   errorCollector.stars = "invalid input for stars (must be between 1 - 5)"
    // }

    setErrors(errorCollector)
    if (Object.keys(errorCollector).length > 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [reviewData, stars])

  // const handleSubmit = async (e) => {

  //   e.preventDefault();
  //   let newReview = {
  //     review: reviewData,
  //     stars : parseInt(star_rating)
  //   }

  //   //dispatching to create a review
  //   const data = await dispatch(EditReview(review.id, newReview));
  //   closeModal()
  //   window.location.reload()
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newReview = {
      review: reviewData,
      stars : stars
    }
    //dispatching to create a review
    await dispatch(EditReview(review.id, newReview))
      // .then(async (response) => {
      //   if(image) await dispatch(createReviewImage(response.id, image))
      // })
      .catch(async (res) => {
        const data = await res.json();
        if(data.errors){
          return setErrors(errorCollector)
        }
      })
      closeModal()
      window.location.reload()
  }

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
              value={reviewData}
              onChange={(e) => setReviewData(e.target.value)}
              required
            >
            </textarea>
            {showErrors && errors?.review && <p className="errorDiv">{errors.review}</p>}
          </div>
          <div className="reviews-modal-submit-button-div">
            <button type="submit" disabled={isDisabled} className={submitButtonCN}>Update Review</button>
          </div>
        </form>
    </div>
    </>
  );
}

export default ReviewEditModal
