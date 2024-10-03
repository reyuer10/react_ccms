let express = require("express");
let router = express.Router();
let locationController = require("../controller/locationController");

router.get("/getLocation", locationController.getLocation);
router.post("/addLocation", locationController.addLocation);
router.put("/updateLocation", locationController.updateLocation);
router.delete("/deleteLocation/:loc_ID", locationController.deleteLocation);

module.exports = router;
