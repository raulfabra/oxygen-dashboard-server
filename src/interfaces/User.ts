export interface User {
  id: string;
  id_user: number;
  fullName: string;
  email: string;
  phone: string;
  jobDesk: string;
  statusEmployeer: StatusEmployeer;
  start_date: string;
  picture: string;
}

export enum StatusEmployeer {
  Active = "Active",
  Inactive = "Inactive",
}
