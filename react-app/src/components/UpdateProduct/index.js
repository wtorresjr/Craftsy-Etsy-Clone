import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  addNewProductImage,
  editAproduct,
  getProductInfo,
} from "../../store/products";
import "./UpdateProduct.css";

function UpdateProduct() {
  const { product_id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const currentProductInfo = useSelector(
    (state) => state?.products?.productDetail
  );
  // const currentProductImages = useSelector((state) => state?.products?.productDetail?.Product_Images)
  // const [updatedName, setUpdatedName] = useState(currentProductInfo?.name)
  // const [updatedDescription, setUpdatedDescription] = useState(currentProductInfo?.description)
  // const [updatedPrice, setUpdatedPrice] = useState(currentProductInfo?.price)
  // const [updatedQuantity, setUpdatedQuantity] = useState(currentProductInfo?.quantity)
  // const [updatedPreviewImg, setUpdatedPreviewImg] = useState(currentProductInfo?.preview_image_url)

  const [errors, setErrors] = useState({});

  console.log(
    currentProductInfo?.Product_Images,
    "Product Images <-----------------------------"
  );

  useEffect(() => {
    if (product_id) {
      dispatch(getProductInfo(parseInt(product_id)));
    }
  }, [dispatch, product_id]);

  const [productInfo, setProductInfo] = useState({
    name: currentProductInfo?.name,
    description: currentProductInfo?.description,
    price: currentProductInfo?.price,
    quantity: currentProductInfo?.quantity,
    preview_image_url: currentProductInfo?.preview_image_url,
    extra_images_urls: currentProductInfo?.Product_Images?.filter(
      (img) => img?.preview === false
    ),
  });

  console.log(
    productInfo?.extra_images_urls,
    "<------------------ Extra images"
  );

  useEffect(() => {
    const errorCollector = {};

    const validImgFormats = [
      ".jpg",
      ".png",
      "jpeg",
      "http:",
      "https",
      "ftp:/",
      "ftps:",
    ];

    const formatError = "Image must be .jpg, .jpeg or .png format.";
    const imageRequired = "Preview image is required.";
    const nameError1 = "Product name must be between 3 and 30 characters long.";
    const nameError2 = "Name must include alphabetic characters";
    const descError1 = "Description must be between 3 and 255 characters.";
    const descError2 = "Description must be alphabetic characters";
    const priceError = "Price must be a valid number greater than 0.";
    const quantityError = "Quantity must be a valid number greater than 0.";
    const whiteSpaceErrors = "Input cannot begin with a space.";

    if (productInfo?.name) {
      if (productInfo.name.length < 3 || productInfo.name.length > 30)
        errorCollector.name = nameError1;
      else if (productInfo.name.length && productInfo.name.trim() === "")
        errorCollector.name = nameError2;
      else if (productInfo.name.startsWith(" "))
        errorCollector.name = whiteSpaceErrors;
    }

    if (productInfo?.description) {
      if (
        productInfo.description.length < 3 ||
        productInfo.description.length > 255
      )
        errorCollector.description = descError1;
      else if (
        productInfo.description.length &&
        productInfo.description.trim() === ""
      )
        errorCollector.description = descError2;
      else if (productInfo.description.startsWith(" "))
        errorCollector.description = whiteSpaceErrors;
    }

    if (productInfo?.price) {
      if (productInfo.price <= 0) errorCollector.price = priceError;
    }

    if (productInfo?.quantity) {
      if (productInfo.quantity <= 0) errorCollector.quantity = quantityError;
    }

    if (productInfo?.preview_image_url) {
      const preview_img = productInfo.preview_image_url;
      const lastFourCharacters = preview_img.slice(-4);
      console.log("the last 4 of the url:", lastFourCharacters);

      if (!validImgFormats.includes(lastFourCharacters))
        errorCollector.wrongFormat = formatError;
      if (productInfo.preview_image_url[0].startsWith(" "))
        errorCollector.wrongFormat = whiteSpaceErrors;
    }

    if (!productInfo.preview_image_url)
      errorCollector.previewImg = imageRequired;

    setErrors(errorCollector);
  }, [productInfo]);

  console.log("the current error are --", errors);

  // if (!productInfo?.preview_image_url) {
  //     errorCollector.previewImg = imageRequired;
  // }
  // if (!validImgFormats?.includes(productInfo?.preview_image_url.slice(-4).toLowerCase())) {
  //     errorCollector.wrongFormat = formatError;
  // }

  //     setErrors(errorCollector);

  // }, []);

  const handleProductUpdate = async (e) => {
    e.preventDefault();

    dispatch(editAproduct(product_id, productInfo)).then(() =>
      history.push(`/products/${product_id}`)
    );
    if (
      currentProductInfo.preview_image_url !== productInfo.preview_image_url
    ) {
      const newProdPreviewImg = {
        image_url: productInfo.preview_image_url,
        preview: true,
      };
      await dispatch(
        addNewProductImage(currentProductInfo.id, newProdPreviewImg)
      );
    }
  };

  return (
    <>
      <div className="editListingContainer">
        <form onSubmit={handleProductUpdate}>
          <h1>Update Your Product</h1>
          <ul></ul>
          <li>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={productInfo.name}
                onChange={(e) =>
                  setProductInfo({
                    ...productInfo,
                    name: e.target.value,
                  })
                }
                required
              />
            </label>
            {errors && errors.name && <p className="errorDiv">{errors.name}</p>}
          </li>
          <li>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={productInfo.description}
                onChange={(e) =>
                  setProductInfo({
                    ...productInfo,
                    description: e.target.value,
                  })
                }
                required
              />
            </label>
            <p className="errorDiv">{errors.description}</p>
          </li>
          <li>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={productInfo.price}
                onChange={(e) =>
                  setProductInfo({
                    ...productInfo,
                    price: e.target.value,
                  })
                }
                required
              />
            </label>
            {errors && errors.price && (
              <p className="errorDiv">{errors.price}</p>
            )}
          </li>
          <li>
            <label>
              Quantity:
              <input
                type="number"
                name="quantity"
                value={productInfo.quantity}
                onChange={(e) =>
                  setProductInfo({
                    ...productInfo,
                    quantity: e.target.value,
                  })
                }
                required
              />
            </label>
            {errors && errors.quantity && (
              <p className="errorDiv">{errors.quantity}</p>
            )}
          </li>
          <li>
            <label>
              Preview Image:
              <input
                type="text"
                name="preview_image_url"
                value={productInfo.preview_image_url}
                onChange={(e) =>
                  setProductInfo({
                    ...productInfo,
                    preview_image_url: e.target.value,
                  })
                }
                required
              />
            </label>
            {errors && errors.previewImg && (
              <p className="errorDiv">{errors.previewImg}</p>
            )}
            {errors && errors.wrongFormat && (
              <p className="errorDiv">{errors.wrongFormat}</p>
            )}
          </li>
          <li>
            {/* <label>
              Additional Images:
              {productInfo &&
                productInfo?.extra_images_urls?.map((index) => {
                  return (
                    <>
                      <input
                        value={index?.image_url}
                        onChange={(e) => {
                          let newExtraImages = [
                            ...productInfo?.extra_images_urls,
                          ];
                          newExtraImages[index] = e.target.value;
                          setProductInfo({
                            ...productInfo,
                            extra_images_urls: newExtraImages,
                          });
                        }}
                        type="text"
                        name={`extraImage${index + 1}`}
                        key={index}
                      />
                      {errors && errors.formatImg && (
                        <p className="errorDiv">{errors.formatImg}</p>
                      )}
                    </>
                  );
                })}
            </label> */}
          </li>
          <button className="submitBtn" type="submit">
            Update Product
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateProduct;
