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
  const [previewImg, setPreviewImg] = useState("http://");
  const [extraImgs, setExtraImgs] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
    if (name.length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Product name must be at least 3 characters long.",
      }));
    }
    if (description.length < 3 || description.length > 255) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "Description must be between 3 and 255 characters",
      }));
    }
  }, [dispatch, name, description, price, quantity, previewImg, extraImgs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      preview_image_url: previewImg,
    };
    // console.log(newProduct, "Test create new");
    const data = await dispatch(addNewProduct(newProduct)); //<----- Needs items to create product.
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
          {errors && errors.name && (
            <p className="errorDiv">{errors.name}</p>
          )}
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
            />
          </label>
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
        </li>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
