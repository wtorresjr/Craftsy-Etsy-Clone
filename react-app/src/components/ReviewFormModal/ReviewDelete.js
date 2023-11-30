import './ReviewForm.css';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { EditReview } from '../../store/reviews'
import { useModal } from '../../context/Modal'

function ReviewEditModal ({review}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [reviewData, setReviewData] = useState(review.review);
  const [star_rating, setStar_rating] = useState(review.star_rating);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {

    e.preventDefault();
    let newReview = {
      review: reviewData,
      stars : parseInt(star_rating)
    }

    //dispatching to create a review
    const data = await dispatch(EditReview(review.id, newReview));
    console.log('data', data)
    closeModal()
    window.location.reload()
  }

  return(
    <>
      <h1>Edit a Review</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

        <label>
          Review
          <input
            type="text"
            value={reviewData}
            onChange={(e) => setReviewData(e.target.value)}
            required
          />
        </label>
        <label>
          Stars
          <input
            type="text"
            value={star_rating}
            onChange={(e) => setStar_rating(e.target.value)}
            required
          />
        </label>
        <button type="submit">Edit a Review</button>
      </form>
    </>
  )

}

export default ReviewEditModal
