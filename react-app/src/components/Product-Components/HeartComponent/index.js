import { useState } from "react";
import "../ProductTile/product_img_tile.css";

const FavoriteHeart = () => {
  const [isClicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!isClicked);
  };

  return (
    <div
      className={`heartContainer ${isClicked ? "clicked" : ""}`}
      onClick={handleClick}
    >
      <i
        className={`fa-heart ${
          isClicked ? "fas fa-heart fa-lg" : "far fa-heart"
        }`}
      ></i>
    </div>
  );
};

export default FavoriteHeart;

