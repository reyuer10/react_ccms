const express = require("express");
const router = express.Router();
const groupController = require("../controller/groupController");

router.get("/getGroup", groupController.getGroup);
router.post("/addGroup", groupController.addGroup);
router.put("/updateGroup", groupController.updateGroup);
router.delete("/deleteGroup/:grp_ID", groupController.deleteGroup);

module.exports = router;
