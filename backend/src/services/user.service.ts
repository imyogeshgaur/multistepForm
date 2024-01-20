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
import { where } from "sequelize";
config({ path: resolve("./src/.env") })

class UserService {
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
                    messageToSend = "Invalid Credentials !!!";
                    responseToSend = 401;
                    return { messageToSend, responseToSend }
                } else {
                    const isPasswordMatch = compare(password, isUserExist.dataValues.password)

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
}

export default UserService;