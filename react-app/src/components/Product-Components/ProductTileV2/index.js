import "./product-tile-v2.css";
import "../DynaProductDisplay/dynamic-product-display.css";

const ProductTileV2 = ({ product }) => {
  return (
    <div className="dynaItem">
      <img src={product?.preview_image_url}></img>
    </div>
  );
};

export default ProductTileV2;
