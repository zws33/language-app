import { Express } from "express";
import { CorsOptions } from "cors";
import { testDbConnection as testDbConnection } from "./db/database";
import { App } from "./app";

const devCorsOptions: CorsOptions = {
  origin: "*",
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true,
};

const prodCorsOptions: CorsOptions = {
  origin: "https://zwsmith.com",
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true,
};

const NODE_ENV = process.env.NODE_ENV;
const corsOptions =
  NODE_ENV == "development" ? devCorsOptions : prodCorsOptions;
const app: Express = App(corsOptions);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  testDbConnection();
});
