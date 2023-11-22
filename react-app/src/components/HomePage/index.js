import "./homepage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from 'react-router-dom';
import ProductTile from "../ProductTile";
import {
  getAllProducts,
  // addNewProductImage,
  // editAproduct,
  // addNewProduct,
  // deleteProduct,
  // getUserProducts,
  // getProductInfo,
} from "../../store/products";

// import { loadCurrUserFavorites } from "../../store/favorite";

const HomePage = () => {
  // const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const allProducts = useSelector((state) => state?.products?.allProducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch, sessionUser]);

  return (
    <>
      <div className="mainProductDisplay">
        {allProducts &&
          allProducts.map((product) => {
            return <ProductTile key={product.id} product={product} />;
          })}
      </div>
    </>
  );
};

export default HomePage;
