import express from "express";
import homeController from "../controllers/homeController";
import apiController from "../controllers/apiController";
const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homeController.handleHelloWorld);
  router.get("/user", homeController.handleUserPage);
  router.post("/user/create-user", homeController.handleCreateNewUser);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  router.get("/update-user/:id", homeController.getUpdateUser);
  router.post("/user/update-user", homeController.handleUpdateUser);

  router.post("/api/register", apiController.handleRegister);
  router.post("/api/login", apiController.handleLogin);

  return app.use("/", router);
}
export default initWebRoutes;
