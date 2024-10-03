let express = require("express");
let router = express.Router();
let canisterController = require("../controller/canisterController");

router.get("/getCanister", canisterController.getCanister);
router.get("/getCanister/:canister_ID", canisterController.findCanister);
router.post("/addCanister", canisterController.postCanister);
router.put("/updateCanister", canisterController.putCanister);
router.delete(
  "/deleteCanister/:canister_ID",
  canisterController.deleteCanister
);

module.exports = router;
