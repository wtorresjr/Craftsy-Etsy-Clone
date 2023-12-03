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
  // console.log(review.review, "<------- REview");
  // console.log(review.ReviewImages[0].image, "<------- Rev Image");
  console.log(review.ReviewImages, "<------- Rev? Image");

  if (review.ReviewImages.length) {
    revImage = review.ReviewImages;
  }

  if (review.User) {
    name = review.User.firstName + " " + review.User.lastName;
  }

  return (
    <>
      <div>
        {/* gotta add stars to show as stars */}
        {getStars(review.star_rating)}
      </div>
      <div>{review.review}</div>
      <div>
        {revImage &&
          revImage.map((image) => {
            return (
              <img
                className="reviewImage"
                src={image.image}
                key={image.id}
                alt="Review Image"
              />
            );
          })}
      </div>
      <div>
        {/* need styling */}
        {name}
      </div>

      {/* EDIT REVIEW */}
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
    </>
  );
};

export default PrintReview;
