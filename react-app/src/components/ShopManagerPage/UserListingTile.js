import React from "react";
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
            </div>
        </>
    )
}

export default UserListingTile;
