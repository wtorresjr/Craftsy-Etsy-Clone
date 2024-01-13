import { useEffect, useState } from "react";
import "./dynamic-product-display.css";
import ProductTile from "../ProductTile";
import ProductTileV2 from "../ProductTileV2";

const DynaProductDisplay = ({
  allProducts,
  numOfProducts,
  mainText,
  secondaryText,
}) => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const itemIdsArr = [];

    for (let i = 0; i < numOfProducts; i++) {
      const randomId = Math.floor(Math.random() * allProducts.length);
      itemIdsArr.push(randomId);
    }

    setRandomProducts(itemIdsArr);
  }, []);

  return (
    <div className="dynaDisplayMainContain">
      <div className="dynaTextContain">
        <h1>{mainText}</h1>
        <p>{secondaryText}</p>
      </div>

      <div className="dynaImgContain">
        {randomProducts.length === numOfProducts
          ? randomProducts.map((itemId) => {
              return (
                <>
                  <ProductTileV2 product={allProducts[itemId]} key={itemId} />
                  {/* <div className="dynaItem">
                    <img
                      key={itemId}
                      src={allProducts[itemId]?.preview_image_url}
                    ></img>
                  </div> */}
                </>
              );
            })
          : "...loading"}
      </div>
    </div>
  );
};

export default DynaProductDisplay;
