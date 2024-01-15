import { Request, Response } from "express";
import UserService from "../services/user.service";
import UserData from "../types/user"
import { getDataFromResponseUtil, getResponseServiceUtil } from "../utils/requestResponse";
import { signInWithEmail, signInWithPhone } from "../types/signin";
import { forgetPassword, resetPassword } from "../types/forgetReset";

class UserController {
    private req: Request;
    private res: Response;
    private service: UserService;
    private defaultError: string = "Internal Server Error !!!";
    private defaultStatusCode: number = 500;
    constructor(request: Request, response: Response) {
        this.req = request;
        this.res = response;
        this.service = new UserService();
    }

    saveUser = async () => {
        try {
            const data: UserData = getDataFromResponseUtil(this.req, 1);
            const userResponse: any = await this.service.saveUser(data);

            const { messageToSend, responseToSend } = userResponse;

            const response = getResponseServiceUtil(this.res, messageToSend, responseToSend);
            return response
        } catch (error) {
            console.log("User Controller Error \n" + error)
            const response = getResponseServiceUtil(this.res, this.defaultError, this.defaultStatusCode);
            return response
        }
    }

    signInUserWithEmail = async () => {
        try {
            const data: signInWithEmail = getDataFromResponseUtil(this.req, 1);
            const userResponse: any = await this.service.signInUserWithEmail(data);
            const { messageToSend, responseToSend } = userResponse;

            const response = getResponseServiceUtil(this.res, messageToSend, responseToSend);
            return response;
        } catch (error) {
            console.log("User Controller Error \n" + error)
            const response = getResponseServiceUtil(this.res, this.defaultError, this.defaultStatusCode);
            return response
        }
    }

    signInUserWithPhone = async () => {
        try {
            const data: signInWithPhone = getDataFromResponseUtil(this.req, 1);
            const userResponse: any = await this.service.signInUserWithPhone(data);
            const { messageToSend, responseToSend } = userResponse;

            const response = getResponseServiceUtil(this.res, messageToSend, responseToSend);
            return response;
        } catch (error) {
            console.log("User Controller Error \n" + error)
            const response = getResponseServiceUtil(this.res, this.defaultError, this.defaultStatusCode);
            return response
        }
    }

    forgetUserPassword = async () => {
        try {
            const data: forgetPassword = getDataFromResponseUtil(this.req, 1);
            const userResponse: any = await this.service.forgetUserPassword(data);
            const { messageToSend, responseToSend } = userResponse;

            const response = getResponseServiceUtil(this.res, messageToSend, responseToSend);
            return response;
        } catch (error) {
            console.log("User Controller Error \n" + error)
            const response = getResponseServiceUtil(this.res, this.defaultError, this.defaultStatusCode);
            return response
        }
    }

    resetUserPassword = async () => {
        try {
            const data: resetPassword = getDataFromResponseUtil(this.req, 1);
            const userResponse: any = await this.service.resetUserPassword(data);

            const { messageToSend, responseToSend } = userResponse;

            const response = getResponseServiceUtil(this.res, messageToSend, responseToSend);
            return response;
        } catch (error) {
            console.log("User Controller Error \n" + error)
            const response = getResponseServiceUtil(this.res, this.defaultError, this.defaultStatusCode);
            return response
        }
    }
}

export default UserController;