import { controllersInit } from "./modules";
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

controllersInit({ app });

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is listening on: ${port}!`);
});
