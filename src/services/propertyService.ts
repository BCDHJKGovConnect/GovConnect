import express from "express";

const router = express.Router();

const properties = [
  {
    owner_ref: "P458",
    property_id: "PROP-458",
    owner_name: "Ananya",
    property_type: "Commercial",
    address: "Bengaluru, Karnataka",
    ownership_status: "verified",
    property_status: "active"
  }
];

router.get("/owner/:ownerRef", (req, res) => {
  const ownerRef = req.params.ownerRef;

  const property = properties.find(
    (p) => p.owner_ref === ownerRef
  );

  if (!property) {
    return res.status(404).json({
      success: false,
      message: "Property not found"
    });
  }

  res.json({
    success: true,
    data: property
  });
});

export default router;