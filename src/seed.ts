import dotenv from "dotenv";
import mongoose from "mongoose";
import UserModel from "./validators/userModel";
import { faker } from "@faker-js/faker";
import { Status, User } from "./interfaces/User";

dotenv.config();

export async function seedDB() {
  try {
    const uri = process.env.dbURI || "";
    await mongoose.connect(uri);
    console.log("Connected correctly to server");

    //Ver bases de datos
    const admin = mongoose.connection.db?.admin();
    const databases = await admin?.listDatabases();
    console.log("Bases de datos: ", databases?.databases);

    // Verificar si la BD existe
    const dbExists = databases?.databases.some((db) => db.name === "hotel");
    if (dbExists) {
      // Obtener las colecciones
      const collections = await mongoose.connection.db?.collections();
      const collectionNames = collections?.map((collection) => collection.collectionName);
      console.log("Colecciones: ", collectionNames);

      if (collectionNames!.length > 0) {
        // Eliminar todas las colecciones
        for (const collection of collections!) {
          await collection.deleteMany({});
          console.log(`Colección ${collection.collectionName} ha sido limpiada.`);
        }
      }
    }

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
  } catch (err: any) {
    console.log(err.stack);
  } finally {
    // Desconectar
    await mongoose.disconnect();
    console.log("Base de datos desconectada");
  }
}
