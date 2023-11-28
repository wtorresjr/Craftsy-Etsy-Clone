import { useState } from "react";
import ProductTile from "../ProductTile";
import "./recently-faved.css";

const RecentlyFaved = ({ favorited }) => {
  return (
    <div className="recentFavsContainer">
      <h3>Recently Favorited...</h3>
      {favorited &&
        favorited.length > 4 &&
        favorited.slice(0, 5).map((fav) => {
          return (
            <ProductTile key={fav.id} product={fav} currentPage={"recentlyFaved"} />
          );
        })}
    </div>
  );
};

export default RecentlyFaved;
