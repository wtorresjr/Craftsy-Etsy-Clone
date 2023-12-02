import { useState } from "react";
import ProductTile from "../Product-Components/ProductTile";

const SellerSpotLight = ({ product }) => {
  return (
    <>
      <h3>Sellers you might like...</h3>
      <ProductTile
        product={product}
        prodTileImgStyle={"recentFaves"}
        tileContainerStyle={"productTileContain"}
      />
    </>
  );
};

export default SellerSpotLight;
