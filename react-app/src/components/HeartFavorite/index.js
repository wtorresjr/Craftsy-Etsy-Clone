import React from "react";

const HeartFavComponent = ({
  setFav,
  favStatus,
  heartColor,
  favVisible,
  heartPositionX,
  heartPositionY,
  heartTransform,
}) => {
  return (
    <div
      className="heartFav"
      onClick={setFav}
      style={{
        visibility: favVisible,
        right: `${heartPositionX}px`,
        top: `${heartPositionY}px`,
        transform: `${heartTransform}`,
      }}
    >
      <i
        className={favStatus}
        style={{ color: heartColor, visibility: favVisible }}
      ></i>
    </div>
  );
};

export default HeartFavComponent;
