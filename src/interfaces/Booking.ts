export interface Booking {
  id: string;
  id_booking: number;
  fullName: string;
  booking: BookingClass;
  request: string;
  room: Room;
  statusBooking: StatusBooking;
}

export interface BookingClass {
  orderDate: Date;
  checkIn: Check;
  checkOut: Check;
}

export interface Check {
  date: string;
  time: string;
}

export interface Room {
  type: Type;
  number: string;
}

export enum Type {
  DoubleBed = "Double Bed",
  DoubleSuperior = "Double Superior",
  SingleBed = "Single Bed",
  Suite = "Suite",
}

export enum StatusBooking {
  Booked = "Booked",
  Canceled = "Canceled",
  Pending = "Pending",
  Refund = "Refund",
}
