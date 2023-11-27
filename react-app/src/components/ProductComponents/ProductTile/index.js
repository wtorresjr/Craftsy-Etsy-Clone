import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import HeartFavorite from "../../HeartFavorite";

const ProductTile = ({ product, favoritedProducts }) => {
  const dispatch = useDispatch();
  const [heartFaved, setHeartFaved] = useState(false);
  const [favStatus, setFavStatus] = useState("far fa-heart");
  const [heartColor, setHeartColor] = useState("black");
  const [favVisible, setFavVisible] = useState("hidden");
  const [heartPositionY, setHeartPositionY] = useState(35);
  const [heartPositionX, setHeartPositionX] = useState(15);
  const [heartTransform, setHeartTransform] = useState("translateY(0)");

  const setFav = () => {
    if (heartFaved === false) {
      setHeartFaved(true);
      setFavStatus("fas fa-heart");
      setHeartColor("#a61a2e");
      setFavVisible("visible");
      setHeartPositionY(13);
      setHeartPositionX(15);
    } else {
      setHeartFaved(false);
      setFavStatus("far fa-heart");
      setHeartColor("black");
      setFavVisible("hidden");
      setHeartPositionY(35);
      setHeartPositionX(15);
    }
  };

  const checkIfFaved = () => {
    if (heartFaved === true) {
      setFavVisible("visible");
      setHeartPositionY(39);
    } else {
      setHeartPositionY(35);
      setFavVisible("hidden");
      setHeartTransform("translateY(0)");
    }
  };

  const setVisible = () => {
    setHeartTransform("translateY(-20px)");
    setFavVisible("visible");
  };

  useEffect(() => {
    if (favoritedProducts) {
      favoritedProducts.forEach((fav) => {
        if (product.id === fav.id) {
          setFav();
        }
      });
    }
  }, [dispatch]);

  return (
    <div
      className="tileContainer"
      onMouseOver={setVisible}
      onMouseOut={checkIfFaved}
    >
      <HeartFavorite
        setFav={setFav}
        favStatus={favStatus}
        heartColor={heartColor}
        favVisible={favVisible}
        heartPositionX={heartPositionX}
        heartPositionY={heartPositionY}
        heartTransform={heartTransform}
      />
      <div className="priceContainer">${product.price}</div>
      <img
        alt={product.description}
        style={{ borderRadius: "10px" }}
        src={product.preview_image_url}
        className="productImg"
      />
    </div>
  );
};

export default ProductTile;
