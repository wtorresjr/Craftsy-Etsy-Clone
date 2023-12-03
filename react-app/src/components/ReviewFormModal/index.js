import "./ReviewForm.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createReview, createReviewImage } from "../../store/reviews";
import { useModal } from "../../context/Modal";

function ReviewFormModal({ productId }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [review, setReview] = useState("");
  const [star_rating, setStar_rating] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const [isDisabled, setDisabled] = useState(true);

  const errorCollector = {};

  useEffect(() => {
    if (review.length < 1) {
      errorCollector.review = "Review is empty";
    } else if (!review.trim()) {
      errorCollector.review = "Review has only spaces";
    }

    if (star_rating === "") {
      errorCollector.stars = "Star Rating Required";
    } else if (star_rating < 1 || star_rating > 5 || !parseInt(star_rating)) {
      errorCollector.stars = "Invalid input for stars (must be between 1 - 5)";
    }

    setErrors(errorCollector);
    if (Object.keys(errorCollector).length > 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [review, star_rating]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newReview = {
      review,
      star_rating,
      image_url: image.trim() !== "" ? image.trim() : null,
    };

    try {
      // Dispatching to create a review
      const response = await dispatch(createReview(productId, newReview));
      if (image.trim() !== "") {
        const newImage = {
          image_url: image,
        };
        await dispatch(createReviewImage(response.id, newImage));
      } else {
        setImage("");
      }

      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <>
      <h1>Leave a Review</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Review
          <input
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>
        {errors && errors.review && <p className="errorDiv">{errors.review}</p>}
        <label>
          Stars
          <input
            type="text"
            value={star_rating}
            onChange={(e) => setStar_rating(e.target.value)}
            required
          />
        </label>
        {errors && errors.stars && <p className="errorDiv">{errors.stars}</p>}
        <label>
          Images
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <button type="submit" disabled={isDisabled}>
          Submit a Review
        </button>
      </form>
    </>
  );
}

export default ReviewFormModal;
