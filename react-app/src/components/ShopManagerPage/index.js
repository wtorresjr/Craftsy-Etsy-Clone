import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserProducts } from "../../store/products";
import "./ShopManager.css";
// import UserListingTile from "./UserListingTile";
import DynaProductDisplay from "../Product-Components/DynaProductDisplay";
import DeleteProductModal from "./DeleteProductModal";
import { useModal } from "../../context/Modal";

function ShopManagerPage() {
  // const sessionUser = useSelector(state => state.session.user);
  const { setModalContent } = useModal();
  const [theProduct, setTheProduct] = useState();

//   const handleDelete = (product) => {
//     setTheProduct(product);
//     console.log(theProduct);
//     setModal();
//   };
  const setModal = () => {
    return setModalContent(<DeleteProductModal product={theProduct} />);
  };
  const dispatch = useDispatch();
  const allUserProducts = useSelector(
    (state) => state?.products?.allUserCreated
  );

  useEffect(() => {
    dispatch(getUserProducts());
  }, [dispatch]);

  return (
    <div className="mainDiv">
      <div className="manageListingssHeader"></div>
      {allUserProducts ? (
        allUserProducts?.map((product) => (
          <div key={product.id}>
            {console.log(product)}
            <button>
              <Link to="/create-a-product" className="createListingButton">
                {" "}
                <i className="fas fa-plus"></i> Add a listing
              </Link>
            </button>
            <DynaProductDisplay
              allProducts={[product]}
              numOfProducts={1}
              // numOfProducts={allUserProducts.length}
              mainText={product.name}
              secondaryText={product.description}
              priceStyle={"smallContainer"}
              componentStyle={"shop-manager-page"}
              showPrice={true}
              showProductName={false}
              isFavorite={"false"}
            />
            <div className="editOrDeleteListing">
              <button>
                <Link
                  to={`/products/${product.id}/edit`}
                  className="updateListingButton"
                >
                  Update
                </Link>
              </button>
              <p></p>
              <button
                onClick={() => {
                  setTheProduct(product);
                  setModal();
                }}
              >
                DELETE
              </button>

              <p></p>
            </div>
          </div>
        ))
      ) : (
        <h1>No Products Listed Yet</h1>
      )}
    </div>
  );
}

export default ShopManagerPage;
