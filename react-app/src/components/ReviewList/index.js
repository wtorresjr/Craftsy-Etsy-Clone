import './ReviewList.css'
import { fetchReviewById } from '../../store/reviews'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import PrintReview from './PrintReview'

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

  const allReviewsByProductId = useSelector((state) => Object.values(state.reviews.reviewByProductId))

  const reviewPoints = {
    stars: 0,
    numbers: 0
  }

  useEffect(() => {
    dispatch(fetchReviewById(productId))
  }, [dispatch])

  return(
    <>
      {
        allReviewsByProductId.forEach((review) => {
          reviewPoints.stars += review.star_rating
          reviewPoints.numbers += 1
        })
      }
      <div className = "reviewListing">
        <div className = "allReviewsAdded">
          Other reviews from this shop |
          {getStars(reviewPoints.numbers / allReviewsByProductId)}

          ({reviewPoints.numbers})
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
