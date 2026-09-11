import express from "express";

const router = express.Router();

const taxpayers = [
  {
    taxpayer_id: "T782",
    taxpayer_name: "Ananya",
    tax_status: "compliant",
    outstanding_amount: 0,
    last_payment_date: "2026-08-15"
  }
];

router.get("/taxpayer/:taxpayerId", (req, res) => {
  const taxpayerId = req.params.taxpayerId;

  const taxpayer = taxpayers.find(
    (t) => t.taxpayer_id === taxpayerId
  );

  if (!taxpayer) {
    return res.status(404).json({
      success: false,
      message: "Taxpayer not found"
    });
  }

  res.json({
    success: true,
    data: taxpayer
  });
});

export default router;