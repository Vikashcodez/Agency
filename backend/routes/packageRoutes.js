const express = require("express");
const multer = require("multer");
const Package = require("../models/Package");

const router = express.Router();

// Multer Storage for Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Add Package
router.post("/add", upload.single("thumbnail"), async (req, res) => {
  try {
    const { heading, description, price, daysNights } = req.body;
    const thumbnail = req.file ? req.file.filename : "";

    const newPackage = new Package({ heading, description, thumbnail, price, daysNights });
    await newPackage.save();
    res.json({ message: "Package added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error adding package" });
  }
});

// ✅ Fetch all packages
router.get("/", async (req, res) => {
    try {
      const packages = await Package.find();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ error: "Error fetching packages" });
    }
  });
  

module.exports = router;
