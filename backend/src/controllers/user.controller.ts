import { Request, Response } from "express";
import UserService from "../services/user.service";
import UserData from "../types/user"
import { getDataFromRequestUtil, getResponseServiceUtil } from "../utils/requestResponse";
import { signInWithEmail, signInWithPhone } from "../types/signin";
import { forgetPassword, resetPassword } from "../types/forgetReset";

class UserController {
    private req: Request;
    private res: Response;
    private service: UserService;
    private defaultError: string = "Internal Server Error !!!";
    private defaultErrorCode: number = 500;
    constructor(request: Request, response: Response) {
        this.req = request;
        this.res = response;
        this.service = new UserService();
    }

    getUser = async () => {
        try {
            const headers: any = getDataFromRequestUtil(this.req, 2)
            const userResponse: any = await this.service.getUser(headers.authorization);

            const { messageToSend, responseToSend } = userResponse;

            const response = getResponseServiceUtil(this.res, messageToSend, responseToSend);
            return response
        } catch (error) {
            console.log("User Controller Error \n" + error)
            const response = getResponseServiceUtil(this.res, this.defaultError, this.defaultErrorCode);
            return response
        }
    }

    getAllUsers = async () => {
        try {
            const headers: any = getDataFromRequestUtil(this.req, 2)
            const userResponse: any = await this.service.getAllUsers(headers.authorization);
            const { messageToSend, responseToSend } = userResponse;

            const response = getResponseServiceUtil(this.res, messageToSend, responseToSend);
            return response;
        } catch (error) {
            console.log("User Controller Error \n" + error)
            const response = getResponseServiceUtil(this.res, this.defaultError, this.defaultErrorCode);
            return response
        }
    }

    saveUser = async () => {
        try {
            const data: UserData = getDataFromRequestUtil(this.req, 1);
            const userResponse: any = await this.service.saveUser(data);

            const { messageToSend, responseToSend } = userResponse;

            const response = getResponseServiceUtil(this.res, messageToSend, responseToSend);
            return response
        } catch (error) {
            console.log("User Controller Error \n" + error)
            const response = getResponseServiceUtil(this.res, this.defaultError, this.defaultErrorCode);
            return response
        }
    }

    signInUserWithEmail = async () => {
        try {
            const data: signInWithEmail = getDataFromRequestUtil(this.req, 1);
            const userResponse: any = await this.service.signInUserWithEmail(data);
            const { messageToSend, responseToSend } = userResponse;

            const response = getResponseServiceUtil(this.res, messageToSend, responseToSend);
            return response;
        } catch (error) {
            console.log("User Controller Error \n" + error)
            const response = getResponseServiceUtil(this.res, this.defaultError, this.defaultErrorCode);
            return response
        }
    }

    signInUserWithPhone = async () => {
        try {
            const data: signInWithPhone = getDataFromRequestUtil(this.req, 1);
            const userResponse: any = await this.service.signInUserWithPhone(data);
            const { messageToSend, responseToSend } = userResponse;

            const response = getResponseServiceUtil(this.res, messageToSend, responseToSend);
            return response;
        } catch (error) {
            console.log("User Controller Error \n" + error)
            const response = getResponseServiceUtil(this.res, this.defaultError, this.defaultErrorCode);
            return response
        }
    }

    forgetUserPassword = async () => {
        try {
            const data: forgetPassword = getDataFromRequestUtil(this.req, 1);
            const userResponse: any = await this.service.forgetUserPassword(data);
            const { messageToSend, responseToSend } = userResponse;

            const response = getResponseServiceUtil(this.res, messageToSend, responseToSend);
            return response;
        } catch (error) {
            console.log("User Controller Error \n" + error)
            const response = getResponseServiceUtil(this.res, this.defaultError, this.defaultErrorCode);
            return response
        }
    }

    resetUserPassword = async () => {
        try {
            const data: resetPassword = getDataFromRequestUtil(this.req, 1);
            const userResponse: any = await this.service.resetUserPassword(data);

            const { messageToSend, responseToSend } = userResponse;

            const response = getResponseServiceUtil(this.res, messageToSend, responseToSend);
            return response;
        } catch (error) {
            console.log("User Controller Error \n" + error)
            const response = getResponseServiceUtil(this.res, this.defaultError, this.defaultErrorCode);
            return response
        }
    }

    updateUser = async () => {
        try {
            const params: any = getDataFromRequestUtil(this.req, 3);
            const dataToUpdate: any = getDataFromRequestUtil(this.req, 1);
            const userResponse: any = await this.service.updateUser(params.userId, dataToUpdate);

            const { messageToSend, responseToSend } = userResponse;

            const response = getResponseServiceUtil(this.res, messageToSend, responseToSend);
            return response;
        } catch (error) {
            console.log("User Controller Error \n" + error)
            const response = getResponseServiceUtil(this.res, this.defaultError, this.defaultErrorCode);
            return response
        }
    }
}

export default UserController;