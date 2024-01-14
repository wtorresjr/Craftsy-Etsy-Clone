import { useEffect, useState } from "react";
import "./dynamic-product-display.css";
import ProductTileV2 from "../ProductTileV2";

const DynaProductDisplay = ({
  favoritedProducts,
  allProducts,
  numOfProducts,
  mainText,
  secondaryText,
  isFavorite,
}) => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const itemIdsArr = [];

    if (isFavorite === "true") {
      for (
        let i = 0;
        i < Math.min(numOfProducts, favoritedProducts.length);
        i++
      ) {
        itemIdsArr.push(favoritedProducts[i]?.product_id);
      }
    } else {
      const uniqueIndices = [];
      while (
        uniqueIndices.length < numOfProducts &&
        uniqueIndices.length < allProducts.length
      ) {
        const randomId = Math.floor(Math.random() * allProducts.length);
        if (!uniqueIndices.includes(randomId)) {
          uniqueIndices.push(randomId);
        }
      }

      for (const randomId of uniqueIndices) {
        itemIdsArr.push(allProducts[randomId]?.id);
      }
    }

    setRandomProducts(itemIdsArr);
  }, [isFavorite, numOfProducts, favoritedProducts, allProducts]);

  return (
    <div className="dynaDisplayMainContain">
      <div className="dynaTextContain">
        <h1>{mainText}</h1>
        <p>{secondaryText}</p>
      </div>

      <div className="dynaImgContain">
        {randomProducts.length === numOfProducts
          ? randomProducts.map((itemId, idx) => (
              <ProductTileV2
                key={idx}
                product={
                  isFavorite === "true"
                    ? favoritedProducts.find(
                        (product) => product?.product_id === itemId
                      )
                    : allProducts.find((product) => product?.id === itemId)
                }
                isFavorite={isFavorite}
              />
            ))
          : "...loading"}
      </div>
    </div>
  );
};

export default DynaProductDisplay;
