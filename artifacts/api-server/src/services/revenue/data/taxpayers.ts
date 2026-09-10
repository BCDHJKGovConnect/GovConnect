export type Taxpayer = {
  taxpayer_id: string;
  tax_status: "CLEAR" | "DUES_PENDING";
};

export const taxpayers: Taxpayer[] = [
  { taxpayer_id: "T782", tax_status: "CLEAR" },
  { taxpayer_id: "T910", tax_status: "DUES_PENDING" },
  { taxpayer_id: "T441", tax_status: "CLEAR" },
];