// constants
const GET_REVIEW = "review/GET_REVIEW";
const GET_REVIEW_PRODUCTID = "review/GET_REVIEW_PRODUCTID";
const SET_REVIEW = "review/SET_REVIEW";
const UPDATE_REVIEW = "review/UPDATE_REVIEW";
const REMOVE_REVIEW = "review/REMOVE_REVIEW";
const SET_REVIEW_IMAGE = "review/SET_REVIEW_IMAGE";
const REMOVE_REVIEW_IMAGE = "review/REMOVE_REVIEW_IMAGE";

const getReview = (reviews) => ({
  type: GET_REVIEW,
  payload: reviews,
});

const getReviewById = (review) => ({
  type: GET_REVIEW_PRODUCTID,
  payload: review,
});

const setReview = (review) => ({
  type: SET_REVIEW,
  payload: review,
});

const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  payload: review,
});

const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  payload: reviewId,
});

const setReviewImage = (reviewImage) => ({
  type: SET_REVIEW_IMAGE,
  payload: reviewImage,
});

const removeReviewImage = (reviewImageId) => ({
  type: REMOVE_REVIEW_IMAGE,
  payload: reviewImageId,
});

// Get all Reviews
export const fetchReviews = () => async (dispatch) => {
  const response = await fetch("/api/current-user/reviews", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const reviews = await response.json();
    dispatch(getReview(reviews));
  }
};

// Get Review by Id
export const fetchReviewById = (productId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/${productId}/reviews`);
    if (response.ok) {
      const review = await response.json();
      dispatch(getReviewById(review));
      return review;
    }
  } catch (error) {
    throw error;
  }
};

// Create a Review
export const createReview = (productId, reviewData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/${productId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
    if (response.ok) {
      const newReview = await response.json();
      dispatch(setReview(newReview));
      return newReview;
    }
  } catch (error) {
    throw error;
  }
};

// Update a Review
export const EditReview = (reviewId, newReviewData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReviewData),
    });
    if (response.ok) {
      const updatedReview = await response.json();
      dispatch(updateReview(updatedReview));
      return updatedReview;
    }
  } catch (error) {
    throw error;
  }
};

// Delete a Review

export const deleteReview = (reviewId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch(removeReview(reviewId));
    }
  } catch (error) {
    throw error;
  }
};

// create a review image
export const createReviewImage = (reviewId, imageData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/reviews/${reviewId}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imageData),
    });
    if (response.ok) {
      const newImage = await response.json();
      dispatch(setReviewImage(newImage));
      return newImage;
    }
  } catch (error) {
    throw error;
  }
};

// delete a review image
export const deleteReviewImage = (reviewId, imageId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/reviews/${reviewId}/images/${imageId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch(removeReviewImage());
    }
  } catch (error) {
    throw error;
  }
};

const initialState = {
  allReviews: [],
  reviewByProductId: [],
  allReviewImages: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_REVIEW:
      if (action.payload.Reviews) {
        const reviewsById = {};
        action.payload.Reviews.forEach((review) => {
          reviewsById[review.id] = review;
        });
        return {
          ...state,
          allReviews: reviewsById,
        };
      } else {
        return { ...state };
      }

    case GET_REVIEW_PRODUCTID:
      if (action.payload.Reviews) {
        let reviewByProductId = {};
        action.payload.Reviews.forEach((review) => {
          reviewByProductId[review.id] = review;
        });
        return {
          ...state,
          reviewByProductId: reviewByProductId,
        };
      } else {
        return { ...state };
      }

    case SET_REVIEW:
      let newReviewAdded = state.allReviews;
      newReviewAdded[action.Review.id] = action.Review;
      return { ...state, allReviews: newReviewAdded };

    case UPDATE_REVIEW:
      let updatedReviewAdded = state.allReviews;
      updatedReviewAdded[action.Review.id] = action.Review;
      return { ...state, allReviews: updatedReviewAdded };

    case REMOVE_REVIEW:
      let newAllReviews = state.allReviews.filter(
        (review) => review.id !== action.payload
      );
      return {
        ...state,
        allReviews: newAllReviews,
      };

    case SET_REVIEW_IMAGE:
      let newImageState = state.allReviewImages;
      newImageState[action.payload.id] = action.payload;
      return {
        ...state,
        allReviewImages: newImageState,
      };

    case REMOVE_REVIEW_IMAGE:
      let newDeletedImageState = state.allReviewImages.filter(
        (reviewImage) => reviewImage.id !== action.payload
      );
      return {
        ...state,
        allReviewImages: newDeletedImageState,
      };

    default:
      return state;
  }
}
