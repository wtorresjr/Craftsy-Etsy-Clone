import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { getCart } from "../../store/cart";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allProducts = useSelector((state) => state.products.allProducts);
  const history = useHistory();
  const { setModalContent } = useModal();
  const [searchInput, setSearchInput] = useState("");
  const [productId, setProductId] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getCart());
    }
  }, [dispatch, sessionUser]);

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
    // dispatch(getAllProducts())
    e.preventDefault();
    setSearchInput(e.target.value);
    setIsDropdownVisible(true);
  };

  // creates new array of product objects with only id and name k-v pairs
  const productList = [];
  for (let product in allProducts) {
    productList.push({
      id: allProducts[product].id,
      name: allProducts[product].name,
      img: allProducts[product].preview_image_url,
      price: allProducts[product].price,
    });
  }

  // replaces search bar input with the product name that the user clicked from dropdown menu
  const logSearchTerm = (searchTerm) => {
    setSearchInput(searchTerm.name);
    setProductId(searchTerm.id);
    history.push(`/products/${searchTerm.id}`);
    setSearchInput("");
    setProductId(null);
  };

  // useEffect to keep track of search input changes and set the product's id
  useEffect(() => {
    productList.filter(
      (product) =>
        product.name.toLowerCase() === searchInput.toLowerCase() &&
        setProductId(product.id)
    );
    setIsDropdownVisible(true);
  }, []);

  // takes user to the searched product's detail page
  const goToProductDetails = (productId) => {
    if (productId !== null) {
      history.push(`/products/${productId}`);
      setSearchInput("");
    } else {
      setSearchInput("");
    }
  };

  const handleClickOutside = (e) => {
    // Check if the click is outside the search bar or dropdown
    const searchBar = document.querySelector(".searchBarSmall");
    const dropdown = document.querySelector(".search-dropdown-row");

    if (
      searchBar &&
      !searchBar.contains(e.target) &&
      dropdown &&
      !dropdown.contains(e.target)
    ) {
      setIsDropdownVisible(false);
    }
  };

  // Attach the handleClickOutside function to the document click event
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="navBar">
        <div className="leftSideNav">
          <div className="homeButtonDiv">
            <NavLink exact to="/" className="homeButton">
              Craftsy
            </NavLink>
          </div>
          {/* <div className="categoriesDiv" onClick={handleNonFunctioningLinks}> */}
            {/* <div className="categories" onClick={handleNonFunctioningLinks}> */}
            {/* <i className="fas fa-bars"></i> */}
            {/* <span className="catWord"> Categories</span> */}
            {/* </div> */}
          {/* </div> */}
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
                  onClick={() => {
                    goToProductDetails(productId);
                  }}
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
                  onClick={() => {
                    goToProductDetails(productId);
                  }}
                >
                  <i className="fas fa-search" />
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          className="search-dropdown"
          style={{
            display: isDropdownVisible ? "" : "none",
          }}
        >
          {productList
            .filter((product) => {
              const searchTerm = searchInput.toLowerCase();
              const productName = product.name.toLowerCase();
              return searchTerm && productName.startsWith(searchTerm);
            })
            .map((product) => (
              <div
                className="search-dropdown-row"
                key={`${product.id}-${product.name}`}
                onClick={() => {
                  goToProductDetails(product?.id);
                  logSearchTerm(product);
                  setSearchInput("");
                }}
              >
                <img
                  className="search-result-img"
                  alt={product.name + "preview"}
                  src={product.img}
                />
                <div className="search-name-price-contain">
                  <div>{product.name}</div>
                  <div>${product.price}</div>
                </div>
              </div>
            ))}
        </div>
        <div className="rightSideNav">
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
      </div>
    </>
  );
}

export default Navigation;
