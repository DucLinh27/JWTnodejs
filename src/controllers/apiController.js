import loginRegisterService from "../services/loginRegisterService";

const testApi = (req, res) => {
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
// let handleLogin = async (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password;

//   if (!email || !password) {
//     return res.status(500).json({
//       errCode: 1,
//       message: "Missing inputs parameter!",
//     });
//   }
//   let userData = await userService.handleUserLogin(email, password);
//   return res.status(200).json({
//     errCode: userData.errCode,
//     message: userData.errMessage,
//     user: userData.user ? userData.user : {},
//   });
// };

module.exports = {
  testApi,
  handleRegister,
  handleLogin,
};
