import mongoose from "mongoose";

let mongoUrl = "mongodb://admin:admin@mongo:27017/?authSource=admin";

export const connectWithRetry = () => {
  mongoose
    .connect(mongoUrl)
    .then(() => console.log("succesfully connected to DB"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};
