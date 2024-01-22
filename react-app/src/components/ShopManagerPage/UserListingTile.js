import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./UserListingTile.css";
import DeleteProductModal from "./DeleteProductModal";
// import DynaProductDisplay from "../Product-Components/DynaProductDisplay";

function UserListingTile({ product }) {
  const { setModalContent } = useModal();

  const setModal = () => {
    return setModalContent(<DeleteProductModal product={product} />);
  };

  return (
    <>

      <div className="listingTileContainer">
        <NavLink
          className="productListingTile"
          to={`/products/${product.id}`}
          key={product.id}
        >
          <div className="listingImages">
            <img
              src={product.preview_image_url}
              alt={product.name}
              className="listingPreviewImage"
            />
          </div>
          <div className="listingName">
            <h4>Title: </h4> {product.name}
          </div>
          <div className="listingQuantity">
            <h4>Quantity In Stock: </h4> {product.quantity}
          </div>
          <div className="listingPrice">
            <h4>Price: </h4> ${product.price.toFixed(2)}
          </div>
        </NavLink>
        <div className="editOrDeleteListing">
          <button>
            <Link
              to={`/products/${product.id}/edit`}
              key={product.id}
              className="updateListingButton"
            >
              Update
            </Link>
          </button>
          <p></p>
          <button onClick={setModal}>DELETE</button>
          <p></p>
        </div>
      </div>
    </>
  );
}

export default UserListingTile;
