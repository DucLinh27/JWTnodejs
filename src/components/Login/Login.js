import React from "react";
import "./Login.scss";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";

const Login = (props) => {
  let history = useHistory();
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");

  const defaultObjValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);
  const handleCreateNewAccount = () => {
    history.push("/register");
  };
  const handleLogin = async () => {
    setObjValidInput(defaultObjValidInput);
    try {
      if (!valueLogin) {
        setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
        toast.error("Please enter your email address or phone number");
        return;
      }
      if (!password) {
        setObjValidInput({
          ...defaultObjValidInput,
          isValidPassword: false,
        });
        toast.error("Please enter your password");
        return;
      }

      // Assuming loginUser is an asynchronous function
      await loginUser(valueLogin, password);

      // If the login is successful, you can redirect or perform other actions here
      // For example:
      // history.push("/dashboard");
    } catch (error) {
      // Handle errors here
      console.error("Error during login:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">HoiDanIt</div>
            <div className="detail">
              HoiDanIt help you connect and sahre with people in ytb
            </div>
          </div>
          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
            <div className="brand d-sm-none">HoiDanIt</div>
            <div className="form-group">
              <label>Email or Phone Number</label>
              <input
                value={valueLogin}
                type="text"
                className={
                  objValidInput.isValidValueLogin
                    ? "form-control mb-3"
                    : "is-invalid form-control"
                }
                placeholder="Email address or phone number"
                onChange={(event) => {
                  setValueLogin(event.target.value);
                }}
              ></input>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                value={password}
                type="password"
                className={
                  objValidInput.isValidPassword
                    ? "form-control mb-3"
                    : "is-invalid form-control"
                }
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              ></input>
            </div>
            <button
              className="btn btn-primary mb-3"
              onClick={() => handleLogin()}
            >
              Login
            </button>
            <span className="text-center mb-3">
              <a className="forgot_password">Forgot your password?</a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success mb-3"
                onClick={() => handleCreateNewAccount()}
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
