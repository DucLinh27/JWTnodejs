import loginRegisterService from "../services/loginRegisterService";

const testApi = (res, req) => {
  return res.status(200).json({
    message: "ok",
    data: "testApi",
  });
};
const handleRegister = async (res, req) => {
  try {
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        EM: data.EM, //ERROR Message
        EC: data.EC, //ERROR Code
        DT: "", //data
      });
    }
    if (req.body.password && req.body.password.length < 4) {
      return res.status(200).json({
        EM: "Your password must have more than 3 letter", //ERROR Message
        EC: "1", //ERROR Code
        DT: "", //data
      });
    }
    //service: create user
    let data = await loginRegisterService.registerNewuser(req.body);
    return res.status(200).json({
      EM: data.EM, //ERROR Message
      EC: data.EC, //ERROR Code
      DT: "", //data
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server ", //ERROR Message
      EC: "-1", //ERROR Code
      DT: "", //data
    });
  }
};
const handleLogin = async (req, res) => {
  try {
    let data = await loginRegisterService.handleUserLogin(req.body);
    return res.status(200).json({
      EM: data.EM, //ERROR Message
      EC: data.EC, //ERROR
      DT: data.DT, //data
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server", //ERROR Message
      EC: "-1", //ERROR
      DT: "", //data
    });
  }
};
module.exports = {
  testApi,
  handleRegister,
  handleLogin,
};
