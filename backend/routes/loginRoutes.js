let express = require("express");
let router = express.Router();
let loginController = require("../controller/loginController");

// router.post("/getUserId", loginController.getUserId);
router.post("/auth", loginController.loginAuth);
router.post("/addLoginHistory", loginController.addLoginHistory);
router.get("/status", loginController.loginStatus);
router.get("/logout", loginController.logout);

module.exports = router;
