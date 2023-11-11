import React from "react";
import "./Users.scss";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";
import { useEffect } from "react";

const Users = (props) => {
  let history = useHistory();
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      history.push("/login");
    }
  }, []);

  return <div className="login-container">users component</div>;
};

export default Users;
