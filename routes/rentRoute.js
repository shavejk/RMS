const express = require("express");
const router = express.Router();
const { createRent, getRents, deleteRent, updateRent } = require("../controllers/rentController");
//const authenticateJWT = require("../middlewares/authMiddleware");

router.post("/",  createRent);
router.get("/",  getRents);
router.delete("/:id",   deleteRent);
router.put("/:id",   updateRent);


module.exports = router;
