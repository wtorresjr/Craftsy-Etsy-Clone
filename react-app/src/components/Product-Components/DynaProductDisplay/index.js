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
      const recentFavIds = allProducts
        ?.filter((product) => {
          return favoritedProducts?.some(
            (favorite) => favorite.product_id === product.id
          );
        })
        .map((product) => product.id);

      console.log(recentFavIds); // Array of favorited product ids

      setRandomProducts(recentFavIds.splice(0, 5));
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
      setRandomProducts(itemIdsArr);
    }
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
                product={allProducts.find((product) => product.id == itemId)}
                // isFavorite === "true"
                //   ? favoritedProducts.find(
                //       (product) => product?.product_id === itemId
                //     )
                //   : allProducts.find((product) => product?.id === itemId)
                // }
                isFavorite={isFavorite}
              />
            ))
          : "...loading"}
      </div>
    </div>
  );
};

export default DynaProductDisplay;
