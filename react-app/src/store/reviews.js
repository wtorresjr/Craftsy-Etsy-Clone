// constants
const GET_REVIEW = "review/GET_REVIEW"
const GET_REVIEW_PRODUCTID = "review/GET_REVIEW_PRODUCTID"
const SET_REVIEW = "review/SET_REVIEW"
const UPDATE_REVIEW = "review/UPDATE_REVIEW"
const REMOVE_REVIEW = "review/REMOVE_REVIEW"

const getReview = (reviews) => ({
  type: GET_REVIEW,
  payload: reviews
})

const getReviewById = (review) => ({
  type: GET_REVIEW_PRODUCTID,
  payload: review
})

const setReview = (review) => ({
  type: SET_REVIEW,
  payload: review
})

const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  payload: review
})

const removeReview = () => ({
  type: REMOVE_REVIEW
})

const initialState = { review: null };

// Get all Reviews
export const fetchReviews = () => async (dispatch) => {
  const response = await fetch("/api/current-user/reviews", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const reviews = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(getReview(reviews));
  }
}

// Get Review by Id
export const fetchReviewById = (productId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/${productId}/reviews`);
    if (response.ok) {
      const review = await response.json();
      dispatch(getReviewById(review))
      return review
    }
  } catch (error) {
    throw error;
  }
}

// Create a Review
export const createReview = (reviewData) => async (dispatch) => {
  try {
    const response = await fetch()
  }
}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_REVIEW:
      if (action.payload.Reviews) {
        const reviewsById = {};
        action.payload.Reviews.forEach((review) => {
          reviewsById[review.id] = review
        })
        newState = {
          allReviews: action.payload.Reviews,
          allReviewsById: reviewsById,
        }
        return newState
      }
      else {
        newState = action.payload
        return newState
      }

    case GET_REVIEW_PRODUCTID:
      if (action.payload.Review) {
        newState = {
          reviewByProductId: action.payload.Review
        }
        return newState
      }
      else {
        newState = action.payload;
        return newState
      }


		default:
			return state;
	}
}
