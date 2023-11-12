import React, { isValidElement } from "react";
import "./Register.scss";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { registerNewUser } from "../../services/userService";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidUsername: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/test-api")
      .then((response) => {
        console.log("check data", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
    if (!email) {
      toast.error("Please enter Email");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    if (!phone) {
      toast.error("Please enter Email");
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false });

      return false;
    }
    if (!username) {
      toast.error("Please enter Email");
      setObjCheckInput({ ...defaultValidInput, isValidUsername: false });

      return false;
    }
    if (!password) {
      toast.error("Please enter Email");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });

      return false;
    }
    if (password != confirmPassword) {
      toast.error("Your password is not hte same");
      setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });

      return false;
    }
    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error("Please enter a valid Email address");
      return false;
    }
    return true;
  };
  const handleRegister = async () => {
    let check = isValidInputs();
    if (check === true) {
      let response = await registerNewUser(email, password, username, phone);
      let serverData = response.data;
      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        history.push("./login");
      } else {
        toast.error(serverData.EM);
      }
    }
  };
  return (
    <div className="register-container">
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
              <label>Email</label>
              <input
                type="text"
                className={
                  objCheckInput.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                className={
                  objCheckInput.isValidPhone
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Phone Number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className={
                  objCheckInput.isValidUsername
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className={
                  objCheckInput.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label>Re-enter Password</label>
              <input
                type="password"
                className={
                  objCheckInput.isValidConfirmPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Re-enter Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              ></input>
            </div>

            <button
              className="btn btn-primary mb-3"
              type="button"
              onClick={() => handleRegister()}
            >
              Register
            </button>
            <span className="text-center ">
              <a className="forgot_password">Forgot your password?</a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success "
                onClick={() => handleLogin()}
              >
                Already've an account Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
