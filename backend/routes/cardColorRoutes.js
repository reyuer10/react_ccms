const express = require("express");
const router = express.Router();

const cardcolorController = require("../controller/cardColorController");

router.get("/getCardColor", cardcolorController.getCardColor);
router.get("/getCardColor/:cardcolor_ID", cardcolorController.findCardColor)
router.post("/createCardColor", cardcolorController.addCardColor);
router.put("/updateCardColor", cardcolorController.updateCardColor);
router.delete("/deleteCardColor/:cardcolor_ID", cardcolorController.deleteCardColor);

module.exports = router;
