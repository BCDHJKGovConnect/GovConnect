export type Citizen = {
  citizen_id: number;
  name: string;
  address: string;
};

export const citizens: Citizen[] = [
  { citizen_id: 101, name: "Ananya", address: "Bangalore" },
  { citizen_id: 102, name: "Rahul", address: "Bangalore" },
  { citizen_id: 103, name: "Priya", address: "Mysore" },
];