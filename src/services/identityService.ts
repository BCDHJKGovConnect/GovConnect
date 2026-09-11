import express from "express";

const router = express.Router();

const citizens = [
  {
    citizen_id: 101,
    name: "Ananya",
    date_of_birth: "2002-05-14",
    address: "Bengaluru, Karnataka",
    status: "active"
  }
];

router.get("/citizen/:citizenId", (req, res) => {
  const citizenId = Number(req.params.citizenId);

  const citizen = citizens.find(
    (c) => c.citizen_id === citizenId
  );

  if (!citizen) {
    return res.status(404).json({
      success: false,
      message: "Citizen not found"
    });
  }

  res.json({
    success: true,
    data: citizen
  });
});

export default router;