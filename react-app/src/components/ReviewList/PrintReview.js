import './ReviewList.css'

//stars
function getStars(star) {
  if (star < 1.5)
    return <><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i></>
  else if (star < 2.5)
    return <><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i></>
  else if (star < 3.5)
    return <><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i></>
  else if (star < 4.5)
    return <><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i></>
  else return <><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></>
}

const PrintReview = ({review}) => {

  let image = ""
  let name = ""

  if (review.ReviewImages) {
    image = review.ReviewImages[0].image
  }

  if (review.User) {
    name = review.User.firstName + " " + review.User.lastName
  }

  return(
    <>
    <div>
      {/* gotta add stars to show as stars */}
      {getStars(review.star_rating)}
    </div>
    <div>
      {review.review}
    </div>
    <div>
      {/* gotta add conditions where image doesnt exist */}
      <img className = "reviewImage" src = {image} />
    </div>
    <div>
      {/* need styling */}
      {name}
    </div>
    </>
  )
}

export default PrintReview
