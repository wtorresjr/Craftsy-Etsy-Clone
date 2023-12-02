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
  // const [updatedName, setUpdatedName] = useState(currentProductInfo?.name)
  // const [updatedDescription, setUpdatedDescription] = useState(currentProductInfo?.description)
  // const [updatedPrice, setUpdatedPrice] = useState(currentProductInfo?.price)
  // const [updatedQuantity, setUpdatedQuantity] = useState(currentProductInfo?.quantity)
  // const [updatedPreviewImg, setUpdatedPreviewImg] = useState(currentProductInfo?.preview_image_url)

  const [errors, setErrors] = useState({});

  // console.log(currentProductInfo)

  useEffect(() => {
    if (product_id) {
      dispatch(getProductInfo(parseInt(product_id)));
    }
  }, [dispatch, product_id]);

  const [updatedProductInfo, setUpdatedProductInfo] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    preview_image_url: "",
  });

  // const updatedProductInfo = {
  //     id: product_id,
  //     updatedName,
  //     updatedDescription,
  //     updatedPrice,
  //     updatedQuantity,
  //     updatedPreviewImg
  // }

  useEffect(() => {
    if (currentProductInfo && currentProductInfo.id) {
      setUpdatedProductInfo({
        name: currentProductInfo.name,
        description: currentProductInfo.description,
        price: currentProductInfo.price,
        quantity: currentProductInfo.quantity,
        preview_image_url: currentProductInfo.preview_image_url,
      });
    }
  }, [currentProductInfo]);

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

    if (updatedProductInfo?.name) {
      if (
        updatedProductInfo.name.length < 3 ||
        updatedProductInfo.name.length > 30
      )
        errorCollector.name = nameError1;
      else if (
        updatedProductInfo.name.length &&
        updatedProductInfo.name.trim() === ""
      )
        errorCollector.name = nameError2;
      else if (updatedProductInfo.name.startsWith(" "))
        errorCollector.name = whiteSpaceErrors;
    }

    if (updatedProductInfo?.description) {
      if (
        updatedProductInfo.description.length < 3 ||
        updatedProductInfo.description.length > 255
      )
        errorCollector.description = descError1;
      else if (
        updatedProductInfo.description.length &&
        updatedProductInfo.description.trim() === ""
      )
        errorCollector.description = descError2;
      else if (updatedProductInfo.description.startsWith(" "))
        errorCollector.description = whiteSpaceErrors;
    }

    if (updatedProductInfo?.price) {
      if (updatedProductInfo.price <= 0) errorCollector.price = priceError;
    }

    if (updatedProductInfo?.quantity) {
      if (updatedProductInfo.quantity <= 0)
        errorCollector.quantity = quantityError;
    }

    if (updatedProductInfo?.preview_image_url) {
      const preview_img = updatedProductInfo.preview_image_url;
      // const lastFourCharacters = preview_img.substring(preview_img.length - 4)
      const lastFourCharacters = preview_img.slice(-4);
      console.log("the last 4 of the url:", lastFourCharacters);

      if (!validImgFormats.includes(lastFourCharacters))
        errorCollector.wrongFormat = formatError;
      if (updatedProductInfo.preview_image_url[0].startsWith(" "))
        errorCollector.wrongFormat = whiteSpaceErrors;
    }

    if (!updatedProductInfo.preview_image_url)
      errorCollector.previewImg = imageRequired;

    setErrors(errorCollector);
  }, [updatedProductInfo]);

  console.log("the current error are --", errors);

  // if (!updatedProductInfo?.preview_image_url) {
  //     errorCollector.previewImg = imageRequired;
  // }
  // if (!validImgFormats?.includes(updatedProductInfo?.preview_image_url.slice(-4).toLowerCase())) {
  //     errorCollector.wrongFormat = formatError;
  // }

  //     setErrors(errorCollector);

  // }, []);

  const handleProductUpdate = async (e) => {
    e.preventDefault();

    dispatch(editAproduct(product_id, updatedProductInfo)).then(() =>
      history.push(`/products/${product_id}`)
    );
    if (
      currentProductInfo.preview_image_url !==
      updatedProductInfo.preview_image_url
    ) {
      const newProdPreviewImg = {
        image_url: updatedProductInfo.preview_image_url,
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
                value={updatedProductInfo.name}
                onChange={(e) =>
                  setUpdatedProductInfo({
                    ...updatedProductInfo,
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
                value={updatedProductInfo.description}
                onChange={(e) =>
                  setUpdatedProductInfo({
                    ...updatedProductInfo,
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
                value={updatedProductInfo.price}
                onChange={(e) =>
                  setUpdatedProductInfo({
                    ...updatedProductInfo,
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
                value={updatedProductInfo.quantity}
                onChange={(e) =>
                  setUpdatedProductInfo({
                    ...updatedProductInfo,
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
                value={updatedProductInfo.preview_image_url}
                onChange={(e) =>
                  setUpdatedProductInfo({
                    ...updatedProductInfo,
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
          {/* <li>
                        <label>
                            Additional Images: (Optional)
                            <input
                                value={extImg1}
                                onChange={(e) => setExtImg1(e.target.value)}
                                type="text"
                                name="extImg1"
                            />
                            {errors && errors.formatImg1 && (
                                <p className="errorDiv">{errors.formatImg1}</p>
                            )}
                            <input
                                value={extImg2}
                                onChange={(e) => setExtImg2(e.target.value)}
                                type="text"
                                name="extImg2"
                            />
                            {errors && errors.formatImg2 && (
                                <p className="errorDiv">{errors.formatImg2}</p>
                            )}
                            <input
                                value={extImg3}
                                onChange={(e) => setExtImg3(e.target.value)}
                                type="text"
                                name="extImg3"
                            />
                            {errors && errors.formatImg3 && (
                                <p className="errorDiv">{errors.formatImg3}</p>
                            )}
                            <input
                                value={extImg4}
                                onChange={(e) => setExtImg4(e.target.value)}
                                type="text"
                                name="extImg4"
                            />
                            {errors && errors.formatImg4 && (
                                <p className="errorDiv">{errors.formatImg4}</p>
                            )}
                        </label>
                    </li> */}
          <button className="submitBtn" type="submit">
            Update Product
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateProduct;
