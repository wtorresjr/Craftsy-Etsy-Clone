import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "../../store/products";
import "./create_product.css";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [previewImg, setPreviewImg] = useState("");
  const [extraImgs, setExtraImgs] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = await dispatch(addNewProduct()); //<----- Needs items to create product.
    // if (data) {
    //   setErrors(data);
    // }
  };
  return (
    <div className="createProductContainer">
      <form onSubmit={handleSubmit}>
        <h1>Create A Product</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
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
        </li>
        <li>
          <label>
            Price:
            <input
              type="float"
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
