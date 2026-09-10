export type Property = {
  owner_ref: string;
  property_location: string;
  ownership: "VALID" | "INVALID";
};

export const properties: Property[] = [
  { owner_ref: "P458", property_location: "Bangalore", ownership: "VALID" },
  { owner_ref: "P621", property_location: "Bangalore", ownership: "INVALID" },
  { owner_ref: "P735", property_location: "Mysore", ownership: "VALID" },
];