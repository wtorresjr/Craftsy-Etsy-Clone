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
  const dispatch = useDispatch();
  const history = useHistory();
  const { product_id } = useParams();
  const productToEdit = useSelector((state) => state?.products?.productDetail);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [previewImg, setPreviewImg] = useState("");
  const [extImg1, setExtImg1] = useState("");
  const [extImg2, setExtImg2] = useState("");
  const [extImg3, setExtImg3] = useState("");
  const [extImg4, setExtImg4] = useState("");
  const [extraImgs, setExtraImgs] = useState([]);
  const [errors, setErrors] = useState({});
  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    dispatch(getProductInfo(product_id));
  }, [product_id]);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit?.name || "");
      setDescription(productToEdit?.description || "");
      setPrice(productToEdit?.price || "");
      setQuantity(productToEdit?.quantity || "");
      setPreviewImg(productToEdit?.preview_image_url || "");
    }
  }, [productToEdit]);

  const errorCollector = {};
  useEffect(() => {
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

    if (name.length < 3 || name.length > 30) {
      errorCollector.name = nameError1;
    }
    if (name.length && name.trim() === "") {
      errorCollector.name = nameError2;
    }
    if (description.length < 3 || description.length > 255) {
      errorCollector.description = descError1;
    }
    if (description.length && description.trim() === "") {
      errorCollector.description = descError2;
    }
    if (price <= 0) {
      errorCollector.price = priceError;
    }
    if (quantity <= 0) {
      errorCollector.quantity = quantityError;
    }
    if (!previewImg) {
      errorCollector.previewImg = imageRequired;
    }
    if (!validImgFormats.includes(previewImg.slice(-4))) {
      errorCollector.wrongFormat = formatError;
    }
    if (extImg1 && !validImgFormats.includes(extImg1.slice(-4))) {
      errorCollector.formatImg1 = formatError;
    }
    if (extImg2 && !validImgFormats.includes(extImg2.slice(-4))) {
      errorCollector.formatImg2 = formatError;
    }
    if (extImg3 && !validImgFormats.includes(extImg3.slice(-4))) {
      errorCollector.formatImg3 = formatError;
    }
    if (extImg4 && !validImgFormats.includes(extImg4.slice(-4))) {
      errorCollector.formatImg4 = formatError;
    }

    setErrors(errorCollector);
    if (Object.keys(errorCollector).length > 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [
    name,
    description,
    price,
    quantity,
    previewImg,
    extImg1,
    extImg2,
    extImg3,
    extImg4,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      preview_image_url: previewImg,
    };
    dispatch(editAproduct(newProduct))
      .then(async (createdProduct) => {
        history.push(`/products/${createdProduct.id}`);
      })
      .catch(async (res) => {
        if (res instanceof Response) {
          const data = await res.json();
          if (data.errors) {
            return setErrors(errorCollector);
          }
        }
      });
  };

  return (
    <div className="createProductContainer">
      <form onSubmit={handleSubmit}>
        <h1>Update A Product</h1>
        <ul></ul>
        <li>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="example: 19.99"
            />
          </label>
          {errors && errors.price && <p className="errorDiv">{errors.price}</p>}
        </li>
        <li>
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
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
              value={previewImg}
              onChange={(e) => setPreviewImg(e.target.value)}
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
            />
            {errors && errors.formatImg1 && (
              <p className="errorDiv">{errors.formatImg1}</p>
            )}
            <input
              value={extImg2}
              onChange={(e) => setExtImg2(e.target.value)}
              type="text"
            />
            {errors && errors.formatImg2 && (
              <p className="errorDiv">{errors.formatImg2}</p>
            )}
            <input
              value={extImg3}
              onChange={(e) => setExtImg3(e.target.value)}
              type="text"
            />
            {errors && errors.formatImg3 && (
              <p className="errorDiv">{errors.formatImg3}</p>
            )}
            <input
              value={extImg4}
              onChange={(e) => setExtImg4(e.target.value)}
              type="text"
            />
            {errors && errors.formatImg4 && (
              <p className="errorDiv">{errors.formatImg4}</p>
            )}
          </label>
        </li> */}
        <button className="submitBtn" type="submit" disabled={isDisabled}>
          Update Product
        </button>
      </form>
    </div>
  );
}

export default UpdateProduct;
