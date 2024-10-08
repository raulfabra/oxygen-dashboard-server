import BookingModal from "../../validators/bookingModel";
import { faker } from "@faker-js/faker";
import { Booking, Status, RoomType } from "../../interfaces/Booking";

export async function seedBookings() {
  try {
    // Crear reservaciones falsas
    const fakeBookings: Booking[] = Array.from({ length: 10 }, (_, index) => {
      const checkinDate = faker.date.future();
      const checkoutDate = faker.date.future({ refDate: checkinDate });

      return {
        id: index + 1,
        fullName: faker.person.fullName(),
        orderDate: faker.date.past(),
        checkin: checkinDate,
        checkout: checkoutDate,
        request: faker.lorem.sentence(),
        roomType: faker.helpers.arrayElement([RoomType.SingleBed, RoomType.DoubleBed, RoomType.DoubleSuperior, RoomType.Suite]),
        roomNumber: Number(faker.finance.amount({ min: 100, max: 500 })),
        status: faker.helpers.arrayElement([Status.Pending, Status.Refund, Status.Booked, Status.Canceled]),
      };
    });

    // Insertar usuarios en la colección
    await BookingModal.insertMany(fakeBookings);
    console.log("10 Reservas falsas han sido creados en la colección de Bookings.");
  } catch (err: any) {
    console.log(err.stack);
  }
}
