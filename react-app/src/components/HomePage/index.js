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

import { loadCurrUserFavorites } from "../../store/favorite";
import ProductSmallTile from "../ProductSmallTile";

const HomePage = () => {
  // const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const allProducts = useSelector((state) => state?.products?.allProducts);
  // const productsById = useSelector((state) => state?.products?.allProductsById);
  const favoritedProducts = useSelector(
    (state) => state?.favorite?.allFavorites
  );

  useEffect(() => {
    if (sessionUser) {
      dispatch(loadCurrUserFavorites());
    }

    dispatch(getAllProducts());
  }, [dispatch, sessionUser]);

  // console.log(favoritedProducts);

  return (
    <>
      <ProductSmallTile allProducts={allProducts} />
      <div className="mainProductDisplay">
        {allProducts &&
          allProducts.map((product) => {
            return (
              <ProductTile
                key={product.id}
                product={product}
                favoritedProducts={favoritedProducts}
              />
            );
          })}
      </div>
    </>
  );
};

export default HomePage;
