import mongoose from "mongoose";

let user = process.env.MONGO_USER as string;
let password = process.env.MONGO_PASSWORD as string;
let mongoUrl = `mongodb://${user}:${password}@mongo:27017/?authSource=admin`;
console.log(mongoUrl);

export const connectWithRetry = () => {
  mongoose
    .connect(mongoUrl)
    .then(() => console.log("Succesfully connected to DB"))
    .catch((e) => {
      console.log("Error connecting to DB");
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};
