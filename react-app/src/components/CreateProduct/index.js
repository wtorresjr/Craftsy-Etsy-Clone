import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "../../store/products";
import "./create_product.css";

const CreateProduct = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [previewImg, setPreviewImg] = useState("");
  const [extraImgs, setExtraImgs] = useState([]);
  const [errors, setErrors] = useState({});
  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    const errorCollector = {};
    const validImgFormats = [".jpg", ".png", "jpeg"];

    if (name.length < 3 || name.length > 30) {
      errorCollector.name =
        "Product name must be between 3 and 30 characters long.";
    }
    if (name.length && name.trim() === "") {
      errorCollector.name = "Name must include alphabetic characters";
    }
    if (description.length < 3 || description.length > 255) {
      errorCollector.description =
        "Description must be between 3 and 255 characters.";
    }
    if (description.length && description.trim() === "") {
      errorCollector.description = "Description must be alphabetic characters";
    }
    if (price <= 0) {
      errorCollector.price = "Price must be a valid number greater than 0.";
    }
    if (quantity <= 0) {
      errorCollector.quantity =
        "Quantity must be a valid number greater than 0.";
    }
    if (!previewImg) {
      errorCollector.previewImg = "Preview image is required.";
    }
    if (!validImgFormats.includes(previewImg.slice(-4))) {
      errorCollector.wrongFormat =
        "Preview image must be .jpg, .jpeg or .png format.";
    }
    setErrors(errorCollector);
    if (Object.keys(errorCollector).length > 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [name, description, price, quantity, previewImg, extraImgs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      preview_image_url: previewImg,
    };
    const data = await dispatch(addNewProduct(newProduct));
    if (data) {
      setErrors(data);
      console.log(errors, "Errors from dispatch");
    }
  };

  return (
    <div className="createProductContainer">
      <form onSubmit={handleSubmit}>
        <h1>Create A Product</h1>
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
        <button type="submit" disabled={isDisabled}>
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
