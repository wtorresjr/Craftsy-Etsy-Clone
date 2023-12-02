import React, { useEffect } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { getCart } from "../../store/cart";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const { setModalContent, closeModal } = useModal();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch, sessionUser]);

  const cartItemsArray = useSelector((state) => state.cart?.allItems);
  const totalCartItems = cartItemsArray.length;
  // console.log(totalCartItems)

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

  return (
    <>
      <div className="navBar">
        <div className="homeButtonDiv">
          <NavLink exact to="/" className="homeButton">
            Craftsy
          </NavLink>
        </div>
        <div className="categoriesDiv">
          <Link className="categories" onClick={handleNonFunctioningLinks}>
            <i className="fas fa-bars">
              {" "}
              <span className="catWord"> Categories</span>{" "}
            </i>
          </Link>
        </div>
        {!sessionUser && (
          <div className="searchBarBig">
            <div className="searchBar">
              <input
                className="searchBarInput"
                placeholder="Search for anything"
              />
              <div className="searchIcon">
                <Link
                  className="magnifyingGlass"
                  onClick={handleNonFunctioningLinks}
                >
                  <i className="fas fa-search" />
                </Link>
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
              />
              <div className="searchIcon">
                <Link
                  className="magnifyingGlass"
                  onClick={handleNonFunctioningLinks}
                >
                  <i className="fas fa-search" />
                </Link>
              </div>
            </div>
          </div>
        )}
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
