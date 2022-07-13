const express = require("express");
const catController = require("../controllers/catController");
const router = express.Router();

router.get("/", catController.getAllCats);

router.get("/:catId", catController.getOneCat);

router.post("/", catController.createNewCat);

router.patch("/:catId", catController.updateOneCat);

router.delete("/:catId", catController.deleteOneCat);

module.exports = router;
