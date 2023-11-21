import "./product_tile.css";

const ProductTile = ({ product }) => {
  return (
    <>
      <div className="tileContainer">
        <div className="heartFav">
          {/* <i class="fas fa-heart" style={{ color: "#c70000" }}></i> */}

          <i class="far fa-heart" style={{ color: "black" }}></i>
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
