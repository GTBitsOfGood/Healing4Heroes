import mongoose from "mongoose";

async function dbConnect(): Promise<void> {
  if (mongoose.connections[0].readyState) return;

  await mongoose
    .connect(process.env.DATABASE_URL as string, {
      socketTimeoutMS: 360000,
      dbName: process.env.DATABASE_NAME,
    })
    .catch((error) => {
      console.error("Unable to connect to database.");

      throw error;
    });
}

export default dbConnect;
