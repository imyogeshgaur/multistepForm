import { Router, Request, Response } from "express";
import UserController from "../controllers/user.controller";
import authorization from "../middleware/authentication";

const userRouter = Router();

userRouter.get("/getUserData", authorization, async (req: Request, res: Response) => {
    try {
        const userController = new UserController(req, res);
        await userController.getUser();
    } catch (error) {
        console.log("Global Error : " + error)
    }
})

userRouter.post("/saveUser", async (req: Request, res: Response) => {
    try {
        const userController = new UserController(req, res);
        await userController.saveUser();
    } catch (error) {
        console.log("Global Error : " + error)
    }
})

userRouter.post("/signInUser", async (req, res) => {
    try {
        const userController = new UserController(req, res);
        if (req.body.emailOfUser) {
            await userController.signInUserWithEmail();
        } else {
            await userController.signInUserWithPhone();
        }
    } catch (error) {
        console.log("Global Error : " + error)
    }
})

userRouter.post("/forgetPassword", async (req: Request, res: Response) => {
    try {
        const userController = new UserController(req, res);
        await userController.forgetUserPassword();
    } catch (error) {
        console.log("Global Error : " + error)
    }
})

userRouter.post("/resetPassword", async (req: Request, res: Response) => {
    try {
        const userController = new UserController(req, res);
        await userController.resetUserPassword();
    } catch (error) {
        console.log("Global Error : " + error)
    }
})

userRouter.put("/updateUser/:userId", async (req:Request, res:Response) => {
    try {
        const userController = new UserController(req, res);
        await userController.updateUser();
    } catch (error) {
        console.log("Global Error : " + error)
    }
})

export default userRouter