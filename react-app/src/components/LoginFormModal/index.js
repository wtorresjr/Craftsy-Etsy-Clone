import React, { useRef, useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  const errorObj = {};
  errors.forEach(error => {
    const [key, value] = error.split(':')
    errorObj[key.trim()] = value.trim()
  });


  const emailInputCN = errorObj && errorObj.email ? "error-input" : ""
  const passwordInputCN = errorObj && errorObj.password ? "error-input" : ""


  const handleDemoUser = () => {
    dispatch(login(email="demo@aa.io", password="password"));
    closeModal();
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
      setEmail("")
      setPassword("")
    } else {
        closeModal()
    }
  };


  return (
    <>
    <div className="login-container">
      <div className="login-header-div">
        <h1>Sign In</h1>
        <div className="register-button">
          <OpenModalButton
            buttonText="Register"
            modalComponent={<SignupFormModal />}
          />
        </div>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="email-div">
        <label>Email address</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={emailInputCN}
            required
          />
        </div>
        <div className="errors-div">
            {errorObj && errorObj.email}
        </div>
        <div className="password-div">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={passwordInputCN}
            required
          />
        </div>
        <div className="errors-div">
          {errorObj && errorObj.password}
        </div>
        <div className="login-buttons-div">
          <button className="login-submit-button" type="submit">Log In</button>
          <button className="demo-user-button" type="submit" onClick={handleDemoUser}>Demo User</button>
        </div>
      </form>
    </div>
    </>
  );
}

export default LoginFormModal;
