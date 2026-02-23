const express = require("express");
const router = express.Router();
const { createTenant, getTenants, deleteTenant, updateTenant } = require("../controllers/tenantController");
//const authenticateJWT = require("../middlewares/authMiddleware");

router.post("/",  createTenant);
router.get("/",  getTenants);
router.delete("/:id",   deleteTenant);
router.put("/:id",   updateTenant);


module.exports = router;
