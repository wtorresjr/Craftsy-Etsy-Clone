import './ReviewForm.css';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { EditReview, deleteReview } from '../../store/reviews'
import { useModal } from '../../context/Modal'

function ReviewDeleteModal ({review}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const prodInfo = useSelector(state => state.products.productDetail)

  const handleSubmit = async (e) => {
    dispatch(deleteReview(review.id))
    closeModal()
    window.location.reload()
  }


  return(
    <>
    <div className='delete-review-modal-wrapper'>
      <h1 className="reviews-modal-h1">Delete a Review</h1>
      <p>Are you sure you want to delete your review for <span style={{fontWeight:'600'}}>{prodInfo.name}</span>?</p>
        <form onSubmit={handleSubmit}>
          <div className='buttons-mgmt-div'>
            <button className='yes-button' type="submit">Yes (Delete Review)</button>
            <button className='no-button' onClick={closeModal}>No (Keep Review)</button>
          </div>
        </form>
    </div>
    </>
  )

}

export default ReviewDeleteModal
