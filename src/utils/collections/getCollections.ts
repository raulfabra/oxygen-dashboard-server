import mongoose from "mongoose";

export async function getCollections() {
  try {
    // Obtener las colecciones
    const collections = await mongoose.connection.db?.collections();
    const collectionNames = collections?.map((collection) => collection.collectionName);
    console.log("Colecciones: ", collectionNames);
    return collections;
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    await mongoose.disconnect();
  }
}
