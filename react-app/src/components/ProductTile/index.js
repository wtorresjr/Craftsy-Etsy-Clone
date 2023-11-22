import "./product_tile.css";
import react, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ProductTile = ({ product }) => {
  const dispatch = useDispatch();
  const [heartFaved, setHeartFaved] = useState(false);
  const [favStatus, setFavStatus] = useState("far fa-heart");
  const [heartColor, setHeartColor] = useState("black");
  const [favVisible, setFavVisible] = useState("hidden");
  const [heartPosition, setHeartPosition] = useState([15, 35]);

  useEffect(() => {
    setFavVisible((prev) => !prev);
  }, [heartFaved]);

  const setFav = () => {
    if (heartFaved === false) {
      setHeartFaved(true);
      setFavStatus("fas fa-heart");
      setHeartColor("#a61a2e");
      setFavVisible("visible");
    } else {
      setHeartFaved(false);
      setFavStatus("far fa-heart");
      setHeartColor("black");
      setFavVisible("hidden");
    }
  };
  const setVisible = () => {
    setFavVisible("visible");
  };

  const checkIfFaved = () => {
    if (heartFaved === true) {
      setFavVisible("visible");
      setHeartPosition([13, 33]);
    } else {
      setFavVisible("hidden");
    }
  };

  return (
    <>
      <div
        className="tileContainer"
        onMouseOver={setVisible}
        onMouseOut={checkIfFaved}
      >
        <div
          className="heartFav"
          onClick={setFav}
          style={{
            visibility: favVisible,
            right: heartPosition[0],
            top: heartPosition[1],
          }}
        >
          <i
            class={favStatus}
            style={{ color: heartColor, visibility: favVisible }}
          ></i>
        </div>
        <div className="priceContainer">${product.price}</div>
        <img
          style={{ borderRadius: "10px" }}
          src={product.preview_image_url}
          className="productImg"
        />
      </div>
    </>
  );
};

export default ProductTile;
