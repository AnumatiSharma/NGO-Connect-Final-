const express = require("express");

const {
  registerForEvent,
  getMyRegistrations,
  getEventRegistrations,
  updateRegistrationStatus,
} = require("../controllers/registrationController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/events/:eventId",
  protect,
  authorize("volunteer"),
  registerForEvent
);

router.get(
  "/my",
  protect,
  authorize("volunteer"),
  getMyRegistrations
);

router.get(
  "/event/:eventId",
  protect,
  authorize("coordinator"),
  getEventRegistrations
);

router.patch(
  "/:registrationId/status",
  protect,
  authorize("coordinator"),
  updateRegistrationStatus
);

module.exports = router;