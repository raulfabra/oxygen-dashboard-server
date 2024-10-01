export interface Room {
  id_room: number;
  typeRoom: TypeRoom;
  numberRoom: string;
  priceNight: string;
  offersRoom: OffersRoom;
  statusRoom: StatusRoom;
  cancellationRoom: string;
}

export interface OffersRoom {
  isOffer: boolean;
  discount: number;
}

export enum StatusRoom {
  Available = "Available",
  Booked = "Booked",
}

export interface TypeRoom {
  bed: Bed;
  description: string;
  amenities: string;
  pictures: string;
}

export enum Bed {
  DoubleBed = "Double Bed",
  DoubleSuperior = "Double Superior",
  SingleBed = "Single Bed",
  Suite = "Suite",
}
