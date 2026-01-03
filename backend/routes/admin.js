const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/admin");

router.get("/dashboard", auth, admin, (req, res) => {
  res.json({ message: "Welcome Admin! You have full access." });
});

// See all users (Admin only)
const User = require("../models/user");
router.get("/users", auth, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const Slot = require("../models/slotModel");

// Create Slot Route
router.post("/create-slot", auth, admin, async (req, res) => {
  const { slotNumber, isBooked, section, city, area, address, placeType, latitude, longitude } = req.body;
  try {
    let isAvailable = true;
    if (req.body.isAvailable !== undefined) {
      isAvailable = req.body.isAvailable;
    } else if (isBooked !== undefined) {
      isAvailable = !isBooked;
    }

    // Check if slot already exists
    const existingSlot = await Slot.findOne({ slotNumber });
    if (existingSlot) {
      return res.status(400).json({ message: "Slot number already exists" });
    }

    const newSlot = new Slot({
      slotNumber,
      isAvailable,
      section: section || 'General',
      section: section || 'General',
      city,
      area,
      address,
      placeType,
      latitude,
      longitude
    });

    await newSlot.save();
    res.status(201).json({ message: "Slot created successfully", slot: newSlot });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Slot (Admin only)
router.put("/slot/:id", auth, admin, async (req, res) => {
  try {
    const { slotNumber, section, isAvailable } = req.body;
    const slot = await Slot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slotNumber) slot.slotNumber = slotNumber;
    if (section) slot.section = section;
    if (isAvailable !== undefined) slot.isAvailable = isAvailable;

    await slot.save();
    res.json({ message: "Slot updated successfully", slot });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Slot (Admin only)
router.delete("/slot/:id", auth, admin, async (req, res) => {
  try {
    const slot = await Slot.findByIdAndDelete(req.params.id);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }
    res.json({ message: "Slot deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;