import db from "../models/index";
import bcrypt from "bcryptjs";
import { getRoles } from "./JWTService";
import bluebird from "bluebird";
import mysql from "mysql2/promise";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password);

  try {
    await db.User.create({
      username: username,
      email: email,
      password: hashPass,
    });
  } catch (error) {
    console.log(error);
  }
};
let getUserList = async () => {
  let users = [];
  users = await db.User.findAll();
  return users;

  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   port: "3307",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.query("SELECT * FROM users");
  //   return rows;
  // } catch (err) {
  //   console.log(err);
  // }
};
const deleteUser = async (userId) => {
  await db.User.destroy({
    where: { id: userId },
  });
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   port: "3307",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "DELETE FROM users WHERE id=?",
  //     [id]
  //   );
  //   return rows;
  // } catch (err) {
  //   console.log(err);
  // }
};
let getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: { id: id },
  });
  return user.get({ plain: true });
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   port: "3307",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.query(
  //     "Select * FROM users WHERE id= ?",
  //     [id]
  //   );
  //   return rows;
  // } catch (err) {
  //   console.log(err);
  // }
};
let updateUserInfor = async (email, username, id) => {
  await db.User.update(
    {
      email: email,
      username: username,
    },
    { where: { id: id } }
  );
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   port: "3307",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.query(
  //     "UPDATE users SET email = ? , username = ? WHERE id = ?",
  //     [email, username, id]
  //   );
  //   return rows;
  // } catch (err) {
  //   console.log(err);
  // }
};
module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor,
};
