import "./ReviewList.css";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import ReviewEditModal from "../ReviewFormModal/ReviewEdit";
import ReviewDeleteModal from "../ReviewFormModal/ReviewDelete";
import { cleartRevImgState } from "../../store/reviews";

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

const PrintReview = ({ review }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  let image = "";
  let name = "";

  let revImage = "";

  useEffect(() => {
    dispatch(cleartRevImgState());
  }, [dispatch]);

  if (review.ReviewImages.length) {
    revImage = review.ReviewImages;
  }

  return (
    <>
      <div className="starRatingContain">
        {/* gotta add stars to show as stars */}
        <p>{getStars(review.star_rating)}</p>
        <h4>Reviewed by: {review?.User?.firstName}</h4>
      </div>
      <p>{review.review}</p>
      <div>
        {revImage &&
          revImage.map((image) => {
            {
              return image.image !== " " ? (
                <img
                  className="reviewImage"
                  src={image.image}
                  key={image.id}
                  alt="Review Image"
                />
              ) : (
                <div></div>
              );
            }
          })}
      </div>
      <div>
        {/* need styling */}
        {name}
      </div>

      {/* EDIT REVIEW */}
      <div className="crudBtnsDiv">
        {sessionUser && sessionUser.id === review.user_id ? (
          <div className="ReviewEditButton">
            <OpenModalButton
              className="ReviewEditButtonModal"
              buttonText="Edit"
              modalComponent={<ReviewEditModal review={review} />}
            />
          </div>
        ) : (
          ""
        )}
        {/* DELETE REVIEW */}
        {sessionUser && sessionUser.id === review.user_id ? (
          <div className="ReviewDeleteButton">
            <OpenModalButton
              className="ReviewDeleteButtonModal"
              buttonText="Delete"
              modalComponent={<ReviewDeleteModal review={review} />}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default PrintReview;
