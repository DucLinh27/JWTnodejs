import db from "../models/index";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
const salt = bcrypt.genSaltSync(10);

// let hashUserPassword = (password) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let hashPassWord = await bcrypt.hashSync(password, salt);
//       resolve(hashPassWord);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
let checkEmailExist = async (userEmail) => {
  let isExist = await db.User.findOne({
    where: { email: userEmail },
  });
  if (isExist) {
    return true;
  }
  return false;
};
const checkPhoneExist = async (userPhone) => {
  let isExist = await db.User.findOne({
    where: { phone: userPhone },
  });
  if (isExist) {
    return true;
  }
  return false;
};
const registerNewUser = async (rawUserData) => {
  try {
    //check email/phonenumber are exist
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is already existed",
        EC: 1,
      };
    }
    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist === true) {
      return {
        EM: "The phone is already existed",
        EC: 1,
      };
    }
    //hash user password
    let hashPassWord = hashUserPassword(rawUserData.password);

    //create new user
    await db.User.create({
      email: rawUserData.email,
      username: rawUserData.username,
      phone: rawUserData.phone,
      password: hashPassWord,
    });
    return {
      EM: "A user is created successfully",
      EC: "0",
    };
  } catch (e) {
    return {
      EM: "Somthing wrong in service",
      EC: -2,
    };
  }
};
// const checkPassword = (inputPassword, hashPassWord) => {
//   return bcrypt.compareSync(inputPassword, hashPassWord);
// };
// const handleUserLogin = async (rawData) => {
//   try {
//     let user = await db.User.findOne({
//       where: {
//         [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
//       },
//     });

//     if (user) {
//       console.log("Founded user:", user.get({ plain: true }));
//       console.log("Founded user:", user);

//       let isCorrectPassword = checkPassword(rawData.password, user.password);

//       if (isCorrectPassword) {
//         return {
//           EM: "Login successful",
//           EC: 0,
//           DT: "", // You may want to return user data here
//         };
//       } else {
//         console.log("Incorrect password for user:", user);
//         return {
//           EM: "Your email/phone number or password is incorrect",
//           EC: 1,
//           DT: "",
//         };
//       }
//     } else {
//       console.log("User not found");
//       return {
//         EM: "Your email/phone number or password is incorrect",
//         EC: 1,
//         DT: "",
//       };
//     }
//   } catch (error) {
//     console.error("Error in handleUserLogin:", error);
//     return {
//       EM: "Something went wrong in the service...",
//       EC: -2,
//       DT: "",
//     };
//   }
// };
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      //lưu ý, truyền vào đúng password cần hash
      // let hashPassWord = await bcrypt.hashSync("B4c0/\/", salt); => copy paste mà ko edit nè
      let hashPassWord = await bcrypt.hashSync(password, salt);

      resolve(hashPassWord);
    } catch (e) {
      reject(e);
    }
  });
};
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user already exist
        let user = await db.User.findOne({
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "firstName",
            "lastName",
          ],
          where: { email: email },
          raw: true,
        });
        if (user) {
          //compare password: dùng cách 1 hay cách 2 đều chạy đúng cả =))
          // Cách 1: dùng asynchronous (bất đồng bộ)
          let check = await bcrypt.compare(password, user.password);

          // Cách 2: dùng synchronous  (đồng bộ)
          // let check = bcrypt.compareSync(password, user.password);

          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK";
            userData.DT = {
              access_token: "",
            };

            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User not found`;
        }
      } else {
        //return error
        userData.errCode = 1;
        userData.errMessage = `Your's Email isn't exist in our system, plz try other email`;
      }
      resolve(userData);
      await getRoles(userData);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  registerNewUser,
  handleUserLogin,
};

module.exports = {
  registerNewUser,
  handleUserLogin,
};
