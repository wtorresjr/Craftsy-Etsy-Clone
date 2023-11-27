import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./product_showcase.css";

const ProductShowcase = ({ allProducts, favoritedProducts }) => {
  const dispatch = useDispatch();

  const [showCaseProd, setShowCaseProd] = useState(null);

  useEffect(() => {
    let randomProd = Math.floor(Math.random() * allProducts.length);
    setShowCaseProd(randomProd);
  }, [dispatch, allProducts]);

  return (
    <div class="productShowcase">
      <div className="title">
        <h3>
          {allProducts[showCaseProd]?.name}{" "}
          <i class="fa-solid fa-arrow-right"></i>
        </h3>
      </div>
      <div class="showcaseImagesContainer">
        <img
          class="showCasePreviewImg"
          src={allProducts[showCaseProd]?.preview_image_url}
        />

        <div class="showCaseExtraImgs">
          {allProducts[showCaseProd] &&
            allProducts[showCaseProd]?.Product_Images.filter(
              (image) => !image?.preview
            ).map((image) => {
              return <img class="extraImg" src={image?.image_url} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
