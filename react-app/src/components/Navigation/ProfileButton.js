import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();

  // const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleNonFunctioningLinks = () => {
    alert("Feature Coming Soon...");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout()).then(() => window.location.replace("/"));
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      {user ? (
        <div className="profileButtonDiv">
          <button onClick={openMenu} className="profileButton">
            <i className="fas fa-user-circle">
              {" "}
              <i className="fas fa-caret-down"> </i>
            </i>
          </button>
          <ul className={ulClassName} ref={ulRef}>
            <>
              <li>
                <div
                  className="profileDropdownUser"
                  onClick={handleNonFunctioningLinks}
                >
                  <i className="fas fa-user-circle"></i>
                  <span className="firstLastName">
                    <h4>
                      {user.firstName} {user.lastName}
                    </h4>
                    <p>View your profile</p>
                  </span>
                </div>
              </li>
              <li className="dDPartTwo">
                <NavLink
                  to="previous-orders"
                  onClick={() => setShowMenu(false)}
                >
                  <div className="purchasesReviews">
                    <i className="fas fa-clipboard-list"> </i>
                      <p>Purchases and reviews</p>
                  </div>
                </NavLink>
                <div className="messages" onClick={handleNonFunctioningLinks}>
                  <i className="far fa-comment-dots"> </i>
                  <p>Messages</p>
                </div>
                <NavLink
                  to="/shop-manager"
                  className="sellerListings"
                  onClick={() => setShowMenu(false)}
                >
                  <i className="fas fa-store"></i>
                  <p>Sell on Craftsy</p>
                </NavLink>
              </li>
              <li>
                <div
                  className="accountSettings"
                  onClick={handleNonFunctioningLinks}
                >
                  <i className="fas fa-cog"></i>
                  <p>Account settings</p>
                </div>
                <div className="logOutDiv">
                  <i className="fas fa-sign-out-alt fa-rotate-180"></i>
                  <button onClick={handleLogout} className="logOutButton">
                    Sign out
                  </button>
                </div>
              </li>
            </>
          </ul>
        </div>
      ) : (
        <>
          <div className="signInDiv">
            <OpenModalButton
              className="signInButton"
              buttonText="Sign in"
              modalComponent={<LoginFormModal />}
            />
            {/* <button onClick={openMenu} className="signInButton">
              Sign in
            </button>
            <div className={ulClassName} ref={ulRef}>
              <OpenModalButton
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />

              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div> */}
          </div>
        </>
      )}
    </>
  );
}

export default ProfileButton;
