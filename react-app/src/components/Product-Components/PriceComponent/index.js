import "./price_component.css";

const PriceComponent = ({ product, priceStyle }) => {
  return <div className={priceStyle}>${product?.price.toFixed(2)}</div>;
};

export default PriceComponent;
