import "./price_component.css";

const PriceComponent = ({ product, priceStyle }) => {
  return (
    <div className="priceDiv" style={{ visibility: priceStyle }}>
      ${product?.price}
    </div>
  );
};

export default PriceComponent;
