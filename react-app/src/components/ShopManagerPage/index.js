import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserProducts } from "../../store/products";
import "./ShopManager.css";
import UserListingTile from "./UserListingTile";
import DynaProductDisplay from "../Product-Components/DynaProductDisplay";

function ShopManagerPage() {
  // const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const allUserProducts = useSelector(
    (state) => state?.products?.allUserCreated
  );

  useEffect(() => {
    dispatch(getUserProducts());
  }, [dispatch]);

  return (
    <>
      <div className="manageListingssHeader">
        <h1>Listings Manager</h1>
        <button>
          <Link to="/create-a-product" className="createListingButton">
            {" "}
            <i className="fas fa-plus"></i> Add a listing
          </Link>
        </button>
      </div>
      <div className="userListings">
        <div className="productTileContainer">
          <DynaProductDisplay
            allProducts={allUserProducts}
            numOfProducts={8}
            mainText={""}
            secondaryText={"Because you viewed"}
            priceStyle={"smallContainer"}
            // componentStyle={""}
            isFavorite={"false"}
          />

          {/* {allUserProducts && allUserProducts.map(product => {
                        return <UserListingTile
                            product={product}
                            className="productTile"
                            key={product.id}
                        />
                    })
                    } */}
        </div>
      </div>
    </>
  );
}

export default ShopManagerPage;
