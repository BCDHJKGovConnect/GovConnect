import { Request, Response } from "express";

const citizens = [
  {
    identityId: "101",
    fullName: "Ananya Sharma",
    dob: "2002-05-14",
    addressLine: "Bengaluru, Karnataka",
    verification: "VERIFIED"
  },
  {
    identityId: "102",
    fullName: "Rahul Kumar",
    dob: "2001-08-21",
    addressLine: "Mysuru, Karnataka",
    verification: "VERIFIED"
  }
];

export const getCitizenIdentity = (
  req: Request,
  res: Response
) => {

  // Log every request received from the Interoperability Hub
  console.log(
    `Identity request received for ID: ${req.params.identityId}`
  );

  const { identityId } = req.params;

  const citizen = citizens.find(
    (citizen) => citizen.identityId === identityId
  );

  if (!citizen) {
    console.log(
      `Identity not found for ID: ${identityId}`
    );

    return res.status(404).json({
      success: false,
      message: "Citizen not found"
    });
  }

  console.log(
    `Identity data returned for ID: ${identityId}`
  );

  return res.status(200).json({
    success: true,
    data: citizen
  });
};