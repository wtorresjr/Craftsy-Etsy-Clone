import './ReviewList.css'
import { fetchReviewById } from '../../store/reviews'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import PrintReview from './PrintReview'
import ReviewFormModal from '../ReviewFormModal'
import OpenModalButton from '../OpenModalButton'

//stars
function getStars(star) {
  if (star < 1.5)
    return <><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i></>
  else if (star < 2.5)
    return <><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i></>
  else if (star < 3.5)
    return <><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i></>
  else if (star < 4.5)
    return <><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i></>
  else return <><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></>
}

const ReviewList = ({productId}) => {
  const dispatch = useDispatch();

  const [hasReview, setHasReview] = useState(false);

  const allReviewsByProductId = useSelector((state) => Object.values(state.reviews.reviewByProductId))
  const sessionUser = useSelector((state) => state.session.user);

  const reviewPoints = {
    stars: 0,
    numbers: 0
  }

  useEffect(() => {
    dispatch(fetchReviewById(productId))
    if(sessionUser){
      for(const [key, value] in allReviewsByProductId){
        if(allReviewsByProductId[key].user_id === sessionUser.id) setHasReview(true)
      }
    }
  }, [dispatch, sessionUser])

  return(
    <>
      {
        allReviewsByProductId.forEach((review) => {
          reviewPoints.stars += review.star_rating
          reviewPoints.numbers += 1
        })
      }

      {/* if user has a review conditions */}
      {
        hasReview === false  && sessionUser ?
        <OpenModalButton className="ReviewFormButton" buttonText="Leave a Review" modalComponent={<ReviewFormModal productId = {productId}/>} />:
        ""
      }

      <div className = "reviewListing">
        <div className = "allReviewsAdded">
          <h3>{reviewPoints.numbers} reviews  {getStars(reviewPoints.numbers / allReviewsByProductId)}</h3>
        </div>
        {
          allReviewsByProductId.map((review) => (
            <PrintReview review = {review} />
          ))
        }

      </div>
    </>
  )
}

export default ReviewList;
