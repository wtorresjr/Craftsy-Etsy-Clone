import "./price_component.css";

const PriceComponent = ({ product }) => {
  return <div className="priceDiv">{product?.price}</div>;
};

export default PriceComponent;
