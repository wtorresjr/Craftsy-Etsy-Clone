import "../ProductTile/product_tile.css";
import "./small_product_tile.css";

const ProductSmallTile = ({ allProducts }) => {
  return (
    <div className="prodSmallContainer">
      {allProducts &&
        allProducts.map((product) => {
          return (
            <div className="smallProdObj">
              <img src={product.preview_image_url} className="prodSmallImg" />
              <text>{product.name}</text>
            </div>
          );
        })}
    </div>
  );
};

export default ProductSmallTile;
