import connectToDb from "./database/db.config";
import userRouter from "./routes/user.routes";
import express, { urlencoded, json } from "express";
import cors from "cors";

const PORT = process.env.PORT || 5000;
const app = express();

//!Connection from Database
connectToDb();

//? Middlewares
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use("/v1/", userRouter);

app.listen(PORT)


