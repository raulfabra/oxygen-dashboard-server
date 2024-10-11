import dotenv from "dotenv";
import mongoose from "mongoose";
import { dbConnection } from "./db/dbConnection";
import { checkDatabaseExist } from "./db/dbCheckExist";
import { getCollections } from "./utils/collections/getCollections";
import { seedUsers } from "./db/dbSeed/seedUsers";
import { seedRooms } from "./db/dbSeed/seedRooms";
import { seedCustomers } from "./db/dbSeed/seedCustomers";
import { seedBookings } from "./db/dbSeed/seedBookings";

dotenv.config();

const dbName = "hotel";

export async function seedDB() {
  try {
    // Abrir conexión
    await dbConnection();

    // Verificar que exista la BD
    const dbExists = await checkDatabaseExist(dbName);

    if (dbExists) {
      const allCollections = await getCollections();

      if (allCollections && allCollections.length > 0) {
        // Eliminar todas las colecciones
        for (const collection of allCollections) {
          await collection.deleteMany({});
          console.log(`Colección ${collection.collectionName} ha sido limpiada.`);
        }
      }
    }

    // Sembramos todas las colecciones del proyecto
    await seedUsers();
    await seedRooms();
    await seedCustomers();
    await seedBookings();
  } catch (err: any) {
    console.log(err.stack);
  } finally {
    // Desconectar
    await mongoose.disconnect();
    console.log("Base de datos desconectada");
  }
}

seedDB();
