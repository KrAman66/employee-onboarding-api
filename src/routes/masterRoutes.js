const express = require("express");
const router = express.Router();
const {
  getDepartments,
  getDesignations,
  getEmploymentTypes,
  getRoles,
  getShifts,
  getLocations,
  getCountries,
  getStates,
  getBanks,
} = require("../controllers/masterController");

router.get("/departments", getDepartments);
router.get("/designations", getDesignations);
router.get("/employment-types", getEmploymentTypes);
router.get("/roles", getRoles);
router.get("/shifts", getShifts);
router.get("/locations", getLocations);
router.get("/countries", getCountries);
router.get("/states", getStates);
router.get("/banks", getBanks);

module.exports = router;
