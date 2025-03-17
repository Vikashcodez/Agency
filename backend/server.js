const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const packageRoutes = require("./routes/packageRoutes"); // ✅ Import package routes

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// ✅ Serve uploaded images as static files
app.use("/uploads", express.static("uploads"));

mongoose
  .connect("mongodb://localhost:27017/Agency", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/package", packageRoutes); // ✅ Add package routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
