const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Server running successfully 🚀");
});

// Routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const companyRoutes = require("./routes/company");
const slotRoutes = require("./routes/slotRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/slots", slotRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    // Seed slots
    const seedSlots = require("../seed/slotSeeder");
    seedSlots();
  })
  .catch((err) => console.log("MongoDB connection error:", err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
