const express = require("express")


const router = express.Router();
const machineController = require("../controllers/machineController")

// POST (Added Additionally/Optional)
router.post("/api/machines",machineController.addMachine);

// GET
router.get("/api/machines",machineController.getMachines);
router.get("/api/machines/:id",machineController.getMachine);

// PATCH
router.patch("/api/machines/:id/status",machineController.updateMachine);

// DELETE (Added Additionally/Optional)
router.delete("/api/machines/:id",machineController.deleteMachine);

module.exports = router;