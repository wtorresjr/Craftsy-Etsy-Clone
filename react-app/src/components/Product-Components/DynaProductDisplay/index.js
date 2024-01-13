import { useEffect, useState } from "react";
import "./dynamic-product-display.css";
import ProductTile from "../ProductTile";

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
      console.log(itemIdsArr, "<-----ITEM IDS ARR");
    }

    setRandomProducts(itemIdsArr);
    console.log(allProducts, "ALL PRODUCTS");
  }, []);

  return (
    <div className="dynaDisplayMainContain">
      <div className="dynaTextContain">
        <h1>{mainText}</h1>
        <p>{secondaryText}</p>
      </div>

      <div className="dynaImgContain">
        {randomProducts &&
          randomProducts.map((itemId) => {
            return (
              <ProductTile key={itemId} product={allProducts[itemId]} />
              // <img
              //   key={itemId}
              //   src={allProducts[itemId]?.preview_image_url}
              // ></img>
            );
          })}
      </div>
    </div>
  );
};

export default DynaProductDisplay;
