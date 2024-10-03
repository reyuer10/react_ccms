const express = require("express");
const routes = express.Router();
const userController = require("../controller/userController");

routes.get("/getUserData", userController.getUser);
routes.post("/addUserData", userController.addUser);
routes.get("/findUser/:user_id", userController.findUser);
routes.put("/editUser/:user_id", userController.editUser);
routes.delete("/deleteUser/:user_id", userController.deleteUser);

routes.get("/getSystemLogs", userController.getSytemLogs);

module.exports = routes;
