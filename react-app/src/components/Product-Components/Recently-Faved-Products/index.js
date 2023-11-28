import { useState } from "react";
import ProductTile from "../ProductTile";
import "./recently-faved.css";

const RecentlyFaved = ({ favorited }) => {
  return (
    <div className="recentFavsContainer">
      {favorited &&
        favorited.length > 4 &&
        favorited.map((fav) => {
          return (
            <ProductTile
              key={fav.id}
              product={fav}
              className="recentFavsProductTile"
            />
          );
        })}
    </div>
  );
};

export default RecentlyFaved;
