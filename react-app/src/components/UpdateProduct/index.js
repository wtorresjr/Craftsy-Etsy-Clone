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
  const [showPreviewImg, setShowPreviewImg] = useState(true);
  const [previewImgDisplay, setPreviewImgDisplay] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  //   const [extImg1, setExtImg1] = useState("");
  //   const [extImg2, setExtImg2] = useState("");
  //   const [extImg3, setExtImg3] = useState("");
  //   const [extImg4, setExtImg4] = useState("");
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

      // Function to add AWS image
      const updatePreviewImage = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          setPreviewImgDisplay(reader.result);
        }
        setPreviewImg(file);
        setShowPreviewImg(false);
      }

  const errorCollector = {};
  useEffect(() => {
    // const validImgFormats = [
    //   ".jpg",
    //   ".png",
    //   "jpeg",
    //   "http:",
    //   "https",
    //   "ftp:/",
    //   "ftps:",
    // ];

    const formatError = "Image must be .jpg, .jpeg or .png format.";
    const imageRequired = "Preview image is required.";
    const nameError1 = "Product name must be between 3 and 30 characters long.";
    const nameError2 = "Name must include alphabetic characters";
    const descError1 = "Description must be between 3 and 255 characters.";
    const descError2 = "Description must be alphabetic characters";
    const priceError = "Price must be a valid number greater than 0.";
    const quantityError = "Quantity must be a valid number greater than 0.";
    const whiteSpaceError = "Input cannot begin with a space.";

    if (name.length < 3 || name.length > 30) {
      errorCollector.name = nameError1;
    }
    if (name.length && name.trim() === "") {
      errorCollector.name = nameError2;
    }
    if (name.length && name.startsWith(" ")) {
      errorCollector.name = whiteSpaceError;
    }
    if (description.length < 3 || description.length > 255) {
      errorCollector.description = descError1;
    }
    if (description.length && description.trim() === "") {
      errorCollector.description = descError2;
    }
    if (description.length && description.startsWith(" ")) {
      errorCollector.description = whiteSpaceError;
    }
    if (price <= 0) {
      errorCollector.price = priceError;
    }
    if (quantity <= 0) {
      errorCollector.quantity = quantityError;
    }
    if (!previewImg) {
      errorCollector.previewImg = imageRequired;
    // }
    // if (previewImg.length && previewImg[0].startsWith(" ")) {
    //   errorCollector.previewImg = whiteSpaceError;
    // }
    // if (
    //   !validImgFormats.includes(previewImg.toString().toLowerCase().slice(-4))
    // ) {
    //   errorCollector.wrongFormat = formatError;
    }
    // if (extImg1 && !validImgFormats.includes(extImg1.slice(-4))) {
    //   errorCollector.formatImg1 = formatError;
    // }
    // if (extImg2 && !validImgFormats.includes(extImg2.slice(-4))) {
    //   errorCollector.formatImg2 = formatError;
    // }
    // if (extImg3 && !validImgFormats.includes(extImg3.slice(-4))) {
    //   errorCollector.formatImg3 = formatError;
    // }
    // if (extImg4 && !validImgFormats.includes(extImg4.slice(-4))) {
    //   errorCollector.formatImg4 = formatError;
    // }

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
    // extImg1,
    // extImg2,
    // extImg3,
    // extImg4,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name.trimEnd());
    formData.append("description", description.trimEnd());
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("image_url", previewImg);

    dispatch(editAproduct(+product_id, formData))
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

    // if (productToEdit?.preview_image_url !== previewImg) {
    //   const newPrevImg = {
    //     image_url: previewImg,
    //     preview: true,
    //   };
    //   dispatch(addNewProductImage(product_id, newPrevImg));
    // }
  };

  return (
    <div className="createProductContainer">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h1>Update A Product</h1>
        <ul></ul>
        <li>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName((e.target.value).trimStart())}
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
              onChange={(e) => setDescription((e.target.value).trimStart())}
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
          <label htmlFor="update-preview-file-upload">
            Preview Image:
            <input
             type="file"
             id="update-preview-file-upload"
             name="preview_img"
             accept=".jpeg, .jpg, .png, .gif, .webp"
             onChange={updatePreviewImage}
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
        {!showPreviewImg && (
          <div className="preview-img-div">
            <img
              src={previewImgDisplay}
              alt="preview image"
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid #d4d3d1",
                padding: "3px",
                position: "relative"
              }}
            />
            <div style={{position:"relative", bottom:"93%", right:"5.5%"}}>
              <p className="preview-img-label">Primary</p>
            </div>
          </div>
        )}
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
