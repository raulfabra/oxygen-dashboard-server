import RoomModel from "../../validators/roomModel";
import { faker } from "@faker-js/faker";
import { TypeRoomBed, Status, Room } from "../../interfaces/Room";

export async function seedRooms() {
  try {
    // Crear habitaciones falsas
    const fakeRooms: Room[] = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      typeRoom_bed: faker.helpers.arrayElement([TypeRoomBed.SingleBed, TypeRoomBed.DoubleBed, TypeRoomBed.DoubleSuperior, TypeRoomBed.Suite]),
      description: faker.lorem.sentence(),
      facilities: faker.lorem.words(5),
      pictures: faker.image.urlLoremFlickr(),
      numberRoom: index + 101,
      priceNight: Number(faker.finance.amount({ min: 50, max: 500 })),
      isOffer: faker.datatype.boolean(),
      discount: Number(faker.finance.amount({ min: 0, max: 50 })),
      status: faker.helpers.arrayElement([Status.Available, Status.Booked]),
      cancellation: faker.lorem.sentence(),
    }));

    // Insertar usuarios en la colección
    await RoomModel.insertMany(fakeRooms);
    console.log("10 habitaciones falsas han sido creados en la colección de rooms.");
  } catch (err: any) {
    console.log(err.stack);
  }
}
