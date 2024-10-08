import CustomerModal from "../../validators/roomModel";
import { faker } from "@faker-js/faker";
import { Customer, Status } from "../../interfaces/Customer";

export async function seedCustomers() {
  try {
    // Crear usuarios falsos
    const fakeCustomers: Customer[] = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      date: faker.date.past(),
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      score: Number(faker.finance.amount({ min: 0, max: 5 })),
      comment: faker.lorem.sentence(),
      issue: faker.lorem.sentence(),
      status: faker.helpers.arrayElement([Status.Archive]),
    }));

    // Insertar usuarios en la colección
    await CustomerModal.insertMany(fakeCustomers);
    console.log("10 Reseñas falsas han sido creados en la colección de Customers.");
  } catch (err: any) {
    console.log(err.stack);
  }
}
