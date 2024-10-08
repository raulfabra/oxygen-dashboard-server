export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  jobDesk: string;
  startDate: Date;
  picture: string;
  status: Status;
}

export enum Status {
  Active = "Active",
  Inactive = "Inactive",
}
