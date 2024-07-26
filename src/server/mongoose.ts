import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URI) return console.log("mongo db url not found");
  if (isConnected) return console.log("already connected");

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("connection established");
  } catch (error) {
    console.log(error);
  }
};
