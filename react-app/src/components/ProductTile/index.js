import "./product_tile.css";

const ProductTile = ({ product }) => {
  return (
    <>
      <div className="tileContainer">
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <div className="priceContainer">${product.price}</div>
        <p>Number of Images: {product.Product_Images.length}</p>
        <img src={product.preview_image_url} />
      </div>
    </>
  );
};

export default ProductTile;
