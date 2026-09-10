const express = require("express");

const {
  register,
  login,
  updateProfile,
} = require("../controllers/authController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// =========================
// AUTH
// =========================

router.post("/register", register);

router.post("/login", login);


// =========================
// PROFILE
// =========================

// Get current logged-in user
router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    message: "You are authenticated",
    user: req.user,
  });
});

// Update current user's profile
router.patch(
  "/profile",
  protect,
  updateProfile
);


// =========================
// TEST ROUTES
// =========================

// Volunteer-only test route
router.get(
  "/volunteer-test",
  protect,
  authorize("volunteer"),
  (req, res) => {
    res.json({
      success: true,
      message: "Volunteer access granted",
      user: req.user,
    });
  }
);

module.exports = router;
