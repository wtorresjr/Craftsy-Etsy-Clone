import React from "react";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./UserListingTile.css";
import DeleteProductModal from "./DeleteProductModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'

function UserListingTile({ product }) {
  const { setModalContent } = useModal();
  const [gearClicked, setGearClicked] = useState(false);
  const listMgmtButtonsRef = useRef();
  const listMgmtIconRef = useRef();
  const history = useHistory();

  const setModal = () => {
    return setModalContent(<DeleteProductModal product={product} />);
  };

  const handleGearClicked = () => {
    setGearClicked(!gearClicked)
  };

  useEffect(() => {
    const handleOutsideRefClick = (e) => {
      if (
        listMgmtButtonsRef.current && !listMgmtButtonsRef.current.contains(e.target) && 
        listMgmtIconRef.current && !listMgmtIconRef.current.contains(e.target)) 
        {
        setGearClicked(false);
        }
    };
    document.addEventListener('mousedown', handleOutsideRefClick);
  }, []);


  return (
    <>
      <div className="listingTileContainer">
        <div className="listingImages">
          <img
            className="listingPreviewImage"
            src={product.preview_image_url}
            alt={product.name}
            onClick={() => history.push(`/products/${product.id}`)}
          />
        </div>
        <div className="listingTileInfo">
          <div className="listingTileTop">
              <h4 className="listingName" onClick={() => history.push(`/products/${product.id}`)}>{product.name}</h4>
              <div className="listingMgmtIcon">
                <FontAwesomeIcon 
                  icon={faGear} 
                  style={{cursor:'pointer'}} 
                  onClick={handleGearClicked}
                  ref={listMgmtIconRef}
                  />
                  {gearClicked && (
                  <div className="listingMgmtButtons" ref={listMgmtButtonsRef}>
                      <button className="listingButton" onClick={() => history.push(`/products/${product.id}/edit`)}>Update</button>
                      <button className="listingButton" onClick={setModal}>Delete</button>
                    </div>
                  )}
              </div>
          </div>
          <div className="listingTileBottom">
            <h4 className="listingQuantity">{product.quantity} in stock</h4> 
            <h4 className="listingPrice">${product.price.toFixed(2)} <span style={{fontSize:'10px'}}>USD</span></h4> 
          </div>
        </div>
      </div>
    </>
  );
}

export default UserListingTile;