import User from "../models/User";
import { v1 } from "uuid"
import UserData from "../types/user";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken"
import { signInWithEmail, signInWithPhone } from "../types/signin";
import { emailValidator, phoneNumberValidator } from "../validator/Validator";
import { forgetPassword, resetPassword } from "../types/forgetReset";
import { config } from "dotenv";
import { resolve } from "path";
import { forgetPasswordServiceUtil } from "../utils/forgetPassword";
import decodeUser from "../utils/decodeTheAuthToken";
config({ path: resolve("./src/.env") })

class UserService {

    getUser = async (token: any) => {
        try {
            let responseToSend: number = 200;
            let messageToSend: any;
            const { userId }: any = decodeUser(token);
            const isUserExist = await User.findOne({
                where: { userId },
                attributes: [
                    "userId",
                    "nameOfUser",
                    "emailOfUser",
                    "phoneNumber",
                    "addressLine1",
                    "addressLine2",
                    "city",
                    "pinCode"
                ]
            });
            if (isUserExist) {
                messageToSend = isUserExist.dataValues;
                return { responseToSend, messageToSend }
            } else {
                messageToSend = "User Don't Exist",
                    responseToSend = 401;
                return { responseToSend, messageToSend }
            }
        } catch (error) {
            console.log("User Service Error \n" + error)
        }
    }

    saveUser = async (data: UserData) => {
        try {
            let messageToSend = "";
            let responseToSend = 200;

            const userId = v1();

            const {
                nameOfUser,
                emailOfUser,
                phoneNumber,
                password,
                addressLine1,
                addressLine2,
                city,
                pinCode
            } = data

            const newPassword = await hash(password, 12);

            const newUser = await User.create({
                userId,
                nameOfUser,
                emailOfUser,
                phoneNumber,
                password: newPassword,
                addressLine1,
                addressLine2,
                city,
                pinCode
            })

            if (newUser.dataValues) {
                messageToSend = "User Created Successfully !!!";
                return { messageToSend, responseToSend }
            } else {
                messageToSend = "Some Error Occurred !!!"
                responseToSend = 500;
                return { messageToSend, responseToSend }
            }

        } catch (error) {
            console.log("User Service Error \n" + error)
        }
    }

    signInUserWithEmail = async (data: signInWithEmail) => {
        try {
            let messageToSend = "";
            let responseToSend = 200;

            const { emailOfUser, password } = data
            const isValidEmail = emailValidator(emailOfUser);

            if (isValidEmail) {

                const isUserExist = await User.findOne({ where: { emailOfUser } });

                if (!isUserExist) {
                    console.log("Email Incorrect")
                    messageToSend = "Invalid Credentials !!!";
                    responseToSend = 401;
                    return { messageToSend, responseToSend }
                } else {
                    const isPasswordMatch = await compare(password, isUserExist.dataValues.password)

                    if (!isPasswordMatch) {
                        console.log("Password Incorrect")
                        messageToSend = "Invalid Credentials !!!";
                        responseToSend = 401;
                        return { messageToSend, responseToSend }
                    } else {
                        const tokenToSend = jwt.sign(
                            { userId: isUserExist.dataValues.userId },
                            process.env.JWT_SECRET as string
                        )
                        messageToSend = tokenToSend;
                        return { messageToSend, responseToSend }
                    }

                }
            }
        } catch (error) {
            console.log("User Service Error \n" + error)
        }
    }

    signInUserWithPhone = async (data: signInWithPhone) => {
        try {
            let messageToSend = "";
            let responseToSend = 200;
            const { phoneNumber, password } = data
            const isValidPhone = phoneNumberValidator(phoneNumber);

            if (isValidPhone) {

                const isUserExist = await User.findOne({ where: { phoneNumber } });

                if (!isUserExist) {
                    messageToSend = "Invalid Credentials !!!";
                    responseToSend = 401;
                    return { messageToSend, responseToSend }
                } else {

                    const isPasswordMatch = await compare(password, isUserExist.dataValues.password)

                    if (!isPasswordMatch) {
                        messageToSend = "Invalid Credentials !!!";
                        responseToSend = 401;
                        return { messageToSend, responseToSend }
                    } else {
                        const tokenToSend = jwt.sign(
                            { userId: isUserExist.dataValues.userId },
                            process.env.JWT_SECRET as string
                        )
                        messageToSend = tokenToSend;
                        return { messageToSend, responseToSend }
                    }

                }
            }
        } catch (error) {
            console.log("User Service Error \n" + error)
        }
    }

    forgetUserPassword = async (data: forgetPassword) => {
        try {
            const responseFromUtilFunction: any = await forgetPasswordServiceUtil(data);

            const { messageToSend, responseToSend } = responseFromUtilFunction;
            return { messageToSend, responseToSend }
        } catch (error) {
            console.log("User Service Error \n" + error)
        }
    }

    resetUserPassword = async (data: resetPassword) => {
        try {
            let messageToSend = "";
            let responseToSend = 200;

            const { userId, newPassword } = data;
            const isUserExist: any = await User.findOne({ where: { userId } })

            if (isUserExist) {
                const hashedNewPassword = await hash(newPassword, 12);

                const userUpdate = await isUserExist.update({ password: hashedNewPassword }, { where: { userId, returning: true, } })

                if (!userUpdate.dataValues) {
                    messageToSend = "Password did not reset !!!"
                    responseToSend = 401;
                    return { messageToSend, responseToSend }
                } else {
                    messageToSend = "Password reset successfully !!!"
                    return { messageToSend, responseToSend }
                }
            }
        } catch (error) {
            console.log("User Service Error \n" + error)
        }
    }

    updateUser = async (userId: string, dataToUpdate: any) => {
        let messageToSend = "";
        let responseToSend = 200;
        try {
            const isUserExist = await User.findOne({ where: { userId } });
            if (isUserExist) {
                const update = await User.update(
                    { ...dataToUpdate },
                    {
                        where: { userId }
                    })
                if (update[0] == 1) {
                    messageToSend = "User Details Updated Successfully !!!";
                    return { messageToSend, responseToSend }
                } else {
                    messageToSend = "User Not Updated !!!";
                    responseToSend = 401;
                    return { messageToSend, responseToSend }
                }
            } else {
                messageToSend = "User Not Found !!!";
                responseToSend = 401;
                return { messageToSend, responseToSend };
            }
        } catch (error) {
            console.log("User Service Error \n" + error)
        }
    }
}

export default UserService;