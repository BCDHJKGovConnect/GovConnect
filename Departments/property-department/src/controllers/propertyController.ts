import { Request, Response } from "express";

const properties = [
  {
    propertyId: "P458",
    propertyType: "Commercial",
    propertyAddress: "Bengaluru, Karnataka",
    ownershipStatus: "OWNER_VERIFIED",
    verificationStatus: "VERIFIED"
  },
  {
    propertyId: "P459",
    propertyType: "Residential",
    propertyAddress: "Mysuru, Karnataka",
    ownershipStatus: "OWNER_VERIFIED",
    verificationStatus: "VERIFIED"
  }
];

export const getPropertyDetails = (
  req: Request,
  res: Response
) => {

  // Log every request received from the Interoperability Hub
  console.log(
    `Property request received for ID: ${req.params.propertyId}`
  );

  const { propertyId } = req.params;

  const property = properties.find(
    (property) => property.propertyId === propertyId
  );

  if (!property) {
    console.log(
      `Property not found for ID: ${propertyId}`
    );

    return res.status(404).json({
      success: false,
      message: "Property not found"
    });
  }

  console.log(
    `Property data returned for ID: ${propertyId}`
  );

  return res.status(200).json({
    success: true,
    data: property
  });
};