import './ReviewForm.css';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { EditReview, deleteReview } from '../../store/reviews'
import { useModal } from '../../context/Modal'

function ReviewDeleteModal ({review}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    dispatch(deleteReview(review.id))
    closeModal()
    window.location.reload()
  }

  return(
    <>
      <h1>Delete a Review</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">Yes (Delete Review)</button>
        <button onClick={closeModal}>No (Keep Review)</button>
      </form>
    </>
  )

}

export default ReviewDeleteModal
