import { useState } from "react";
import ProductTile from "../ProductTile";
import "../../Product-Components/PriceComponent/price_component.css";
import "../ProductTile/product_img_tile.css";

const SellerSpotLight = ({ product, priceStyle }) => {
  return (
    <>
      <h3>Sellers you might like...</h3>
      <ProductTile
        product={product}
        prodTileImgStyle={"recentFaves"}
        tileContainerStyle={"productTileContain"}
        priceStyle={priceStyle}
      />
    </>
  );
};

export default SellerSpotLight;
