import { Request, Response } from "express";

const taxpayers = [
  {
    taxpayerId: "T782",
    taxpayerStatus: "ACTIVE",
    taxClearanceStatus: "CLEAR",
    outstandingAmount: 0,
    verificationStatus: "VERIFIED"
  },
  {
    taxpayerId: "T783",
    taxpayerStatus: "ACTIVE",
    taxClearanceStatus: "CLEAR",
    outstandingAmount: 2500,
    verificationStatus: "VERIFIED"
  }
];

export const getTaxpayerDetails = (
  req: Request,
  res: Response
) => {

  // Log every request received from the Interoperability Hub
  console.log(
    `Revenue request received for ID: ${req.params.taxpayerId}`
  );

  const { taxpayerId } = req.params;

  const taxpayer = taxpayers.find(
    (taxpayer) => taxpayer.taxpayerId === taxpayerId
  );

  if (!taxpayer) {
    console.log(
      `Taxpayer not found for ID: ${taxpayerId}`
    );

    return res.status(404).json({
      success: false,
      message: "Taxpayer not found"
    });
  }

  console.log(
    `Revenue data returned for ID: ${taxpayerId}`
  );

  return res.status(200).json({
    success: true,
    data: taxpayer
  });
};