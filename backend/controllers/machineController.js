const machines = require("../models/machineModel");

exports.addMachine = async (req, res) => {
  const { id, name, status, temperature, vibration } = req.body;
  const lastUpdated = new Date();
  const VALID_STATUSES = ["idle", "fault", "running"];
  if (!id) {
    return res.status(400).json({ message: "Machine ID is required" });
  }
  if (!name) {
    return res.status(400).json({ message: "Machine name is required" });
  }
  if (!status || !VALID_STATUSES.includes(status)) {
    return res.status(400).json({ message: "Status is required or invalid" });
  }
  if (!temperature) {
    return res.status(400).json({ message: "Temperature is required" });
  }
  if (!vibration) {
    return res.status(400).json({ message: "Vibration is required" });
  }
  try {
    const existingMachine = await machines.findOne({ id });
    if (existingMachine) {
      return res.status(409).json({ message: "Machine ID already exists" });
    }
    const machine = await machines.create({
      id,
      name,
      status,
      temperature,
      vibration,
      lastUpdated,
    });
    res.status(201).json({ message: "Machine added successfully", machine });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMachines = async (req, res) => {
  try {
    const machine = await machines.find();
    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }
    res.status(200).json(machine);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMachine = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Machine ID is required" });
  }
  try {
    const machine = await machines.findOne({ id });
    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }
    res.status(200).json(machine);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateMachine = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const lastUpdated = new Date();
  const VALID_STATUSES = ["idle", "fault", "running"];
  if (!id) {
    return res.status(400).json({ message: "Machine ID is required" });
  }
  if (!status || !VALID_STATUSES.includes(status)) {
    return res.status(400).json({ message: "Status is required or invalid" });
  }
  try {
    const machine = await machines.findOneAndUpdate(
      { id },
      { status, lastUpdated },
      { new: true },
    );
    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }
    res.status(200).json(machine);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Basically a soft delete
exports.deleteMachine = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Machine ID is required" });
  }
  try {
    const machine = await machines.findOneAndUpdate(
      { id },
      { is_active: false },
      { new: true },
    );
    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }
    res.status(200).json(machine);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
