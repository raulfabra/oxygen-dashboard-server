import UserModel from "../../validators/userModel";
import { faker } from "@faker-js/faker";
import { Status, User } from "../../interfaces/User";
import bcrypt from "bcrypt";

export async function seedUsers() {
  try {
    // Crear usuarios falsos
    const fakeUsers: User[] = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      password: "employer1234",
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      jobDesk: faker.person.jobTitle(),
      startDate: faker.date.past({ years: 5 }),
      picture: faker.image.avatar(),
      status: faker.helpers.arrayElement([Status.Active, Status.Inactive]),
    }));

    const fakeUsersWithHashedPasswords = await Promise.all(
      fakeUsers.map(async (user) => {
        // Encriptar la contraseña para cada usuario
        const hashedPassword = await bcrypt.hash(user.password, 10);

        // Retornar el usuario con la contraseña encriptada
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    // Insertar usuarios en la colección
    await UserModel.insertMany(fakeUsersWithHashedPasswords);

    console.log("10 usuarios falsos han sido creados en la colección de usuarios.");
  } catch (err: any) {
    console.log(err.stack);
  }
}
