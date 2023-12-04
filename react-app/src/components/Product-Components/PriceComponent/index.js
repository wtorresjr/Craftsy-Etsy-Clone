import "./price_component.css";

const PriceComponent = ({ product, priceSize }) => {
  return <div className={priceSize}>${product?.price.toFixed(2)}</div>;
};

export default PriceComponent;
