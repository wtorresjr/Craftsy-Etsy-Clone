import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";

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
  // const closeMenu = () => setShowMenu(false);

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
              <div className="profileDropdown">
                {/* <div
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
                </div> */}
                <div className="dDPartTwo">
                  <NavLink
                    className="purchasesReviews"
                    to="previous-orders"
                    onClick={() => setShowMenu(false)}
                  >
                    <div className="purchasesReviews">
                      <i className="fas fa-clipboard-list"> </i>
                      <p>Purchases and reviews</p>
                    </div>
                  </NavLink>
                  {/* <div className="messages" onClick={handleNonFunctioningLinks}>
                    <i className="far fa-comment-dots"> </i>
                    <p>Messages</p>
                  </div> */}
                  <NavLink
                    to="/shop-manager"
                    className="sellerListings"
                    onClick={() => setShowMenu(false)}
                  >
                    <i className="fas fa-store"></i>
                    <p>Sell on Craftsy</p>
                  </NavLink>
                </div>
                <div className="dDPartThree">
                  {/* <div
                    className="accountSettings"
                    onClick={handleNonFunctioningLinks}
                  >
                    <i className="fas fa-cog"></i>
                    <p>Account settings</p>
                  </div> */}
                  <div className="logOutDiv">
                    <i className="fas fa-sign-out-alt fa-rotate-180"></i>
                    <button onClick={handleLogout} className="logOutButton">
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
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
          </div>
        </>
      )}
    </>
  );
}

export default ProfileButton;
