import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      {user ? (
        <div className="profileButtonDiv">
          <button onClick={openMenu} className="profileButton">
            <i className="fas fa-user-circle"> <i className="fas fa-caret-down"> </i></i>
          </button>
          <ul className={ulClassName} ref={ulRef}>
            <>
              <li>
                <Link className="profileDropdownUser">
                  <i className="fas fa-user-circle"></i>
                  <span className="firstLastName">
                    <h4>{user.firstName} {user.lastName}</h4>
                    <p>View your profile</p>
                  </span>
                </Link>
              </li>
              <li className="dDPartTwo">
                <Link className="purchasesReviews">
                  <i className="fas fa-clipboard-list"> </i>
                  <p>Purchases and reviews</p>
                </Link>
                <Link className="messages">
                  <i className="far fa-comment-dots"> </i>
                  <p>Messages</p>
                </Link>
              </li>
              <li>
                <Link className="accountSettings">
                  <i class="fas fa-cog"></i>
                  <p>Account settings</p>
                </Link>
                <div className="logOutDiv">
                  <i className="fas fa-sign-out-alt fa-rotate-180"></i>
                  <button onClick={handleLogout} className="logOutButton">Sign out</button>
                </div>
              </li>
            </>
          </ul>
        </div>
      ) : (
        <>
          <div className="signInDiv">
            <button onClick={openMenu} className="signInButton">
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
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProfileButton;
