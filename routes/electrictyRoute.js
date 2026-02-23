const express = require("express");
const router = express.Router();
const { createElectricity, getElectricitys, deleteElectricity, updateElectricity } = require("../controllers/electricityController");


router.post("/",  createElectricity);
router.get("/",  getElectricitys);
router.delete("/:id",   deleteElectricity);
router.put("/:id",   updateElectricity);


module.exports = router;
