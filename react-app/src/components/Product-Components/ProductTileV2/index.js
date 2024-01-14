// import "./product-tile-v2.css";
// import "../DynaProductDisplay/dynamic-product-display.css";
// import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
// import { useState, useEffect } from "react";

// const ProductTileV2 = ({ product, isFavorite }) => {
//   const [productId, setProductId] = useState();
//   useEffect(() => {
//     if (isFavorite === "true") {
//       // console.log(product, isFavorite, "Current Item");
//       setProductId(product?.product_id);
//     } else {
//       setProductId(product?.id);
//     }
//   }, [product, isFavorite, productId]);

//   return (
//     <div className="dynaItem">
//       <NavLink to={`/products/${productId}`}>
//         {console.log(product, isFavorite, "PRODUCT INSIDE NAVLINK")}
//         <img src={product?.preview_image_url}></img>
//       </NavLink>
//     </div>
//   );
// };

// export default ProductTileV2;

import "./product-tile-v2.css";
import "../DynaProductDisplay/dynamic-product-display.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";

const ProductTileV2 = ({ product, isFavorite }) => {
  const [productId, setProductId] = useState();

  useEffect(() => {
    if (isFavorite === "true" && product) {
      setProductId(product.product_id);
    } else if (product) {
      setProductId(product.id);
    }
  }, [product, isFavorite]);

  return (
    <div className="dynaItem">
      {productId && (
        <NavLink to={`/products/${productId}`}>
          {console.log(product, isFavorite, "PRODUCT INSIDE NAVLINK")}
          <img src={product.preview_image_url} alt={`Product ${productId}`} />
        </NavLink>
      )}
    </div>
  );
};

export default ProductTileV2;
