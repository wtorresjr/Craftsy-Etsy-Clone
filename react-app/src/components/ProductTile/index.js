const ProductTile = ({ product }) => {
  return (
    <>
      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>Number of Images: {product.Product_Images.length}</p>
    </>
  );
};

export default ProductTile;
