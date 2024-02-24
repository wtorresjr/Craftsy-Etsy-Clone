import "./ReviewList.css";
import { fetchReviewById } from "../../store/reviews";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import PrintReview from "./PrintReview";
import ReviewFormModal from "../ReviewFormModal";
import OpenModalButton from "../OpenModalButton";

//stars
function getStars(star) {
  if (star < 1.5)
    return (
      <>
        <i className="fa-solid fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </>
    );
  else if (star < 2.5)
    return (
      <>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </>
    );
  else if (star < 3.5)
    return (
      <>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </>
    );
  else if (star < 4.5)
    return (
      <>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </>
    );
  else
    return (
      <>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
      </>
    );
}

const ReviewList = ({ productId }) => {
  const dispatch = useDispatch();

  // const [hasReview, setHasReview] = useState(false);

  const allReviewsByProductId = useSelector((state) =>
    Object.values(state?.reviews?.reviewByProductId)
  );
  const sessionUser = useSelector((state) => state.session.user);
  const currentProduct = useSelector((state) => state.products.productDetail);

  const reviewExists = allReviewsByProductId.some(
    (review) => review?.user_id === sessionUser?.id
  );

  const reviewPoints = {
    stars: 0,
    numbers: 0,
  };

  // if(sessionUser){
  //   for(let i = 0; i < allReviewsByProductId.length; i++){
  //     console.log(allReviewsByProductId[i].user_id)
  //     console.log(sessionUser.id)
  //     if(allReviewsByProductId[i].user_id == sessionUser.id) setHasReview(true)
  //   }
  // }

  useEffect(() => {
    dispatch(fetchReviewById(productId));
  }, [dispatch, sessionUser]);

  return (
    <>
      {allReviewsByProductId.map((review) => {
        reviewPoints.stars += review.star_rating;
        reviewPoints.numbers += 1;
      })}

    
      {/* {console.log('review:', reviewPoints)} */}

      {/* if user has a review conditions */}
      {sessionUser &&
      sessionUser.id !== currentProduct.user_id &&
      reviewExists === false ? (
        <OpenModalButton
          className="reviewFormButton"
          buttonText="Leave a Review"
          modalComponent={<ReviewFormModal productId={productId} />}
        />
      ) : (
        ""
      )}

      <div className="reviewListing">
        <div className="allReviewsAdded">
          {reviewPoints.numbers > 0 ? (
            <h3>
              {reviewPoints.numbers} reviews{" "}
              {getStars(reviewPoints.stars / reviewPoints.numbers)}
            </h3>
          ) : null}
        </div>
        {allReviewsByProductId.map((review) => (
          <PrintReview key={review.id} review={review} />
        ))}
      </div>
    </>
  );
};

export default ReviewList;
