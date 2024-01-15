import { Sequelize } from "sequelize";
import {resolve} from "path";
import {config} from "dotenv";
config({path:resolve("./src/.env")})

export const sequelize = new Sequelize(process.env.CONNECTION_URL as string);

const connectToDb = async()=>{
    try {
        await sequelize.authenticate();
        console.log("Connected Successfully !!!")
    } catch (error) {
        console.log("Error in connection !!! ")
    }
}

export default connectToDb;