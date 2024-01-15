import connectToDb from "./database/db.config";
import userRouter from "./routes/user.routes";
import express, { urlencoded, json } from "express";

const PORT = process.env.PORT||5000;
const app = express();

//!Connection from Database
connectToDb();

//? Middlewares
app.use(urlencoded({ extended: true }))
app.use(json())

app.use("/v1/",userRouter);

app.listen(PORT)


