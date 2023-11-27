import PriceComponent from "../PriceComponent";
import FavoriteHeart from "../HeartComponent";
import "./product_img_tile.css";

const ProductTile = ({ product, favoritedProducts }) => {
  return (
    <div className="productTileContain">
      <PriceComponent product={product} />
      <FavoriteHeart favoritedProducts={favoritedProducts} product={product} />
      <img
        alt={product?.description}
        className="imageContainer"
        src={product?.preview_image_url}
      />
    </div>
  );
};

export default ProductTile;
