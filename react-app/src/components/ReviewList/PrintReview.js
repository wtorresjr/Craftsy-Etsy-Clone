import 'ReviewList.css'

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
      {review.star_rating}
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
