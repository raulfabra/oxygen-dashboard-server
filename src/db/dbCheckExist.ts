import mongoose from "mongoose";

export async function checkDatabaseExist(dbName: string) {
  try {
    //Ver bases de datos
    const admin = mongoose.connection.db?.admin();
    const databases = await admin?.listDatabases();

    console.log("BD que hay en el servidor: ", databases?.databases);

    // Verificar si la BD existe
    const dbExists = databases?.databases.some((db) => db.name === "hotel");
    if (dbExists) {
      return true;
    } else {
      console.log(`La base de datos ${dbName} no existe.`);
      return false;
    }
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    await mongoose.disconnect();
  }
}
