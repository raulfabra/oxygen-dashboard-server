export interface Customer {
  orderID: string;
  date: DateClass;
  customer: CustomerClass;
  score: number;
  comment: Comment;
  action: Action;
}

export enum Action {
  Archive = "Archive",
}

export interface Comment {
  issue: string;
  comment: string;
}

export interface CustomerClass {
  fullName: string;
  email: string;
  phone: string;
}

export interface DateClass {
  date: string;
  time: string;
}
