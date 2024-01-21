import jwt from "jsonwebtoken";
import { resolve } from "path"
import { Request, Response, NextFunction } from "express";
import { config } from "dotenv"
import { getResponseServiceUtil } from "../utils/requestResponse";
config({ path: resolve("./src/.env") })

const authorization = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization as string;
        const validToken = jwt.verify(token, process.env.JWT_SECRET as string);
        if (validToken) {
            next();
        }
    } catch (error) {
        const response = getResponseServiceUtil(res, "Not Authorized !!!", 401);
        return response
    }
}

export default authorization;