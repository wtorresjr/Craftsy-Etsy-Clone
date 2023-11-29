import React from "react";
import { Link } from "react-router-dom";
import './UserListingTile.css'

function UserListingTile({ product }) {
    return (
        <>
            <div className="listingTileContainer">
                <div className="listingImages">
                    <img
                        src={product.preview_image_url}
                        alt={product.name}
                        className="listingPreviewImage"
                    />
                </div>
                <p className="listingName"><h4>Title: </h4> {product.name}</p>
                <p className="listingQuantity"><h4>Quantity In Stock: </h4> {product.quantity}</p>
                <p className="listingPrice"><h4>Price: </h4> {product.price}</p>
                <div className="editOrDeleteListing">
                    <button>
                        <Link to={`/products/${product.id}/edit`} key={product.id} className="updateListingButton">Update</Link>
                    </button>
                    <p></p>
                    <button>
                        <Link to={`/products/${product.id}/delete`} key={product.id} className="deleteListingButton">Delete</Link>
                    </button>
                    <p></p>
                </div>
            </div>
        </>
    )
}

export default UserListingTile;
