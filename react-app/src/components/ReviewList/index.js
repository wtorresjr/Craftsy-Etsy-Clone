import './ReviewList.css'
import { fetchReviewById } from '../../store/reviews'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

const ReviewList = ({productId}) => {
  const dispatch = useDispatch();

  const allReviewsByProductId = useSelector((state) => state.reviews.reviewByProductId)

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
          Other reviews from this shop | stars {reviewPoints.numbers}
        </div>
        {
          allReviewsByProductId.map((review) => {
            // printing out review one by one
          })
        }

      </div>
    </>
  )
}

export default ReviewList;
