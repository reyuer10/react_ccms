const express = require("express");
const router = express.Router();
const logsController = require("../controller/logsController");

router.post("/systemAddLogs", logsController.systemAddLogs);

// LOGIN
router.post("/logsLoginAuth", logsController.logsLoginAuth);

// POST METHOD - ADD
router.post("/logsCreateLocation", logsController.logsAddLocation);
router.post("/logsNewCanister", logsController.logsAddCanister);
router.post("/logsNewGroup", logsController.logsAddGroup);
router.post("/logsNewCardColor", logsController.logsCardColor);
router.post("/logsNewUser", logsController.logsAddUser);

module.exports = router;
