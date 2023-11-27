import PriceComponent from "../PriceComponent";
import FavoriteHeart from "../HeartComponent";
import "./product_img_tile.css";

const ProductTile = ({ allProducts }) => {
  return (
    <div className="productTileContain">
      <PriceComponent product={allProducts[0]} />
      <FavoriteHeart />
      <img className="imageContainer" src={allProducts[0]?.preview_image_url} />
    </div>
  );
};

export default ProductTile;
