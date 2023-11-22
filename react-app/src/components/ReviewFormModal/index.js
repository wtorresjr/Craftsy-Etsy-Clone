import './ReviewForm.css';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createReview } from '../../store/reviews'
import { useModal } from '../../context/Modal'

function ReviewFormModal ({productId}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [review, setReview] = useState('');
  const [star_rating, setStar_rating] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newReview = {
      review,
      star_rating
    }
    //dispatching to create a review
    const data = await dispatch(createReview(productId, newReview));
    if(data) {
      setErrors(data);
    }
    else {
      closeModal()
    }
  }

  return(
    <>
      <h1>Leave a Review</h1>
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
            value={review}
            onChange={(e) => setReview(e.target.value)}
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
        <button type="submit">Submit a Review</button>
      </form>
    </>
  )

}

export default ReviewFormModal
