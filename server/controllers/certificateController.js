const Certificate = require("../models/Certificate");
const Registration = require("../models/Registration");

// Generate certificate
const generateCertificate = async (req, res) => {
  try {
    const { registrationId } = req.params;

    // Find registration
    const registration = await Registration.findById(
      registrationId
    ).populate("event");

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    // Check that coordinator owns the event
    if (
      registration.event.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to generate a certificate for this event.",
      });
    }

    // Certificate only for approved volunteers
    if (registration.status !== "approved") {
      return res.status(400).json({
        success: false,
        message:
          "Certificate can only be generated for approved volunteers.",
      });
    }

    // Certificate only for volunteers who were present
    if (registration.attendance !== "present") {
      return res.status(400).json({
        success: false,
        message:
          "Certificate can only be generated for volunteers marked present.",
      });
    }

    // Check if certificate already exists
    const existingCertificate = await Certificate.findOne({
      volunteer: registration.volunteer,
      event: registration.event._id,
    });

    if (existingCertificate) {
      return res.status(400).json({
        success: false,
        message: "Certificate has already been generated.",
        certificate: existingCertificate,
      });
    }

    // Generate unique certificate ID
    const certificateId = `NGO-${Date.now()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    // Create certificate
    const certificate = await Certificate.create({
      volunteer: registration.volunteer,
      event: registration.event._id,
      certificateId,
    });

    res.status(201).json({
      success: true,
      message: "Certificate generated successfully.",
      certificate,
    });
  } catch (error) {
    console.error("Generate certificate error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while generating certificate.",
    });
  }
};

// Get certificates of logged-in volunteer
const getMyCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({
      volunteer: req.user._id,
    })
      .populate(
        "event",
        "title description date location"
      )
      .populate(
        "volunteer",
        "name email"
      )
      .sort({ issuedAt: -1 });

    res.status(200).json({
      success: true,
      count: certificates.length,
      certificates,
    });
  } catch (error) {
    console.error("Get my certificates error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching certificates.",
    });
  }
};

// Verify certificate
const verifyCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    // Find certificate by certificate ID
    const certificate = await Certificate.findOne({
      certificateId,
    })
      .populate(
        "volunteer",
        "name email"
      )
      .populate(
        "event",
        "title description date location"
      );

    // Certificate not found
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found or invalid.",
      });
    }

    // Certificate found
    res.status(200).json({
      success: true,
      message: "Certificate is valid.",
      certificate,
    });
  } catch (error) {
    console.error("Verify certificate error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while verifying certificate.",
    });
  }
};

module.exports = {
  generateCertificate,
  getMyCertificates,
  verifyCertificate,
};