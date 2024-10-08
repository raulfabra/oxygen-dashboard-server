import UserModel from "../../validators/userModel";
import { faker } from "@faker-js/faker";
import { Status, User } from "../../interfaces/User";

export async function seedUsers() {
  try {
    // Crear usuarios falsos
    const fakeUsers: User[] = Array.from({ length: 10 }, (_, index) => ({
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      jobDesk: faker.person.jobTitle(),
      startDate: faker.date.past({ years: 5 }),
      picture: faker.image.avatar(),
      status: faker.helpers.arrayElement([Status.Active, Status.Inactive]),
    }));

    // Insertar usuarios en la colección
    await UserModel.insertMany(fakeUsers);
    console.log("10 usuarios falsos han sido creados en la colección de usuarios.");
  } catch (err) {
    console.log(err.stack);
  }
}
