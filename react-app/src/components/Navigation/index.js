import React, { useEffect, useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/products";
import ProfileButton from "./ProfileButton";
import { getCart } from "../../store/cart";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allProducts = useSelector(state => state.products.allProducts);
  const history = useHistory();
  const { setModalContent, closeModal } = useModal();
  const [searchInput, setSearchInput] = useState("")
  const [productId, setProductId] = useState(null)

  useEffect(() => {
    if (sessionUser) {
      dispatch(getCart());
    }
  }, [dispatch, sessionUser, searchInput]);

  const cartItemsArray = useSelector((state) => state.cart?.allItems);
  const totalCartItems = cartItemsArray.length;

  const handleNonFunctioningLinks = () => {
    alert("Feature Coming Soon...");
  };

  const checkLoggedIn = () => {
    if (!sessionUser) {
      return setModalContent(<LoginFormModal />);
    } else {
      // closeModal();
      history.push("/cart");
    }
  };


// SEARCH BAR LOGIC:

// handles input change for search bar
  const handleInputChange = (e) => {
    dispatch(getAllProducts())
    e.preventDefault();
    setSearchInput(e.target.value)
};

// creates new array of product objects with only id and name k-v pairs
  const productList = [];
  for (let product in allProducts){
      productList.push({'id':allProducts[product].id, 'name':allProducts[product].name},
  )}

// replaces search bar input with the product name that the user clicked from dropdown menu
  const logSearchTerm = (searchTerm) => {
    setSearchInput(searchTerm.name);
    setProductId(searchTerm.id);
    history.push(`/products/${searchTerm.id}`);
    setSearchInput("");
    setProductId(null);
  }

// useEffect to keep track of search input changes and set the product's id
  useEffect(() => {
    productList.filter(product => product.name.toLowerCase() === searchInput.toLowerCase() && setProductId(product.id))
  }, [searchInput])


// takes user to the searched product's detail page
  const goToProductDetails = (productId) => {
    if (productId !== null) {
      history.push(`/products/${productId}`);
      setSearchInput("")
    } else {
      setSearchInput("")
    }
  }


  return (
    <>
      <div className="navBar">
        <div className="homeButtonDiv">
          <NavLink exact to="/" className="homeButton">
            Craftsy
          </NavLink>
        </div>
        <div className="categoriesDiv">
          <div className="categories" onClick={handleNonFunctioningLinks}>
            <i className="fas fa-bars">
              {" "}
              <span className="catWord"> Categories</span>{" "}
            </i>
          </div>
        </div>
        {!sessionUser && (
          <div className="searchBarBig">
            <div className="searchBar">
              <input
                className="searchBarInput"
                placeholder="Search for anything"
                type="text"
                onChange={handleInputChange}
                value={searchInput}
              />
              <div className="searchIcon">
                <div
                  className="magnifyingGlass"
                  onClick={() => {goToProductDetails(productId)}}
                >
                  <i className="fas fa-search" />
                </div>
              </div>
            </div>
          </div>
        )}
        {sessionUser && (
          <div className="searchBarSmall">
            <div className="searchBar">
              <input
                className="searchBarInput"
                placeholder="Search for anything"
                onChange={handleInputChange}
                value={searchInput}
              />
              <div className="searchIcon">
                <div
                  className="magnifyingGlass"
                  onClick={() => {goToProductDetails(productId)}}
                >
                  <i className="fas fa-search" />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="search-dropdown" style={{ display: productList.some(product => product.name === searchInput) ? "none" : "" }}>
          {productList.filter(product => {
            const searchTerm = searchInput.toLowerCase()
            const productName = product.name.toLowerCase()
            return searchTerm && productName.startsWith(searchTerm)
          })
          .map((product) => (
            <div
            className="search-dropdown-row"
            key={`${product.id}-${product.name}`}
            onClick={() => {
              logSearchTerm(product);
              setSearchInput("")
            }}
            >
            <p style={{margin:'2px 2px'}}>{product.name}</p>
          </div>
          ))}
        </div>

        {sessionUser && (
          <div className="favoritesDiv">
            <NavLink to="/favorites" className="favorites">
              <i className="far fa-heart"></i>
            </NavLink>
          </div>
        )}
        {sessionUser && (
          <div className="bellDiv">
            <button className="bell" onClick={handleNonFunctioningLinks}>
              <i className="far fa-bell">
                {" "}
                <i className="fas fa-caret-down"> </i>
              </i>
            </button>
          </div>
        )}
        {isLoaded && (
          // <div className=''>
          <ProfileButton user={sessionUser} />
          // </div>
        )}
        <div className="shoppingCartDiv" onClick={checkLoggedIn}>
          <div className="shoppingCart">
            <i className="fas fa-shopping-cart"></i>
            {totalCartItems > 0 && sessionUser && (
              <span className="cartItemCount">{totalCartItems}</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
