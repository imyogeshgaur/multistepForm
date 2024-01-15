import { createTransport } from "nodemailer"
import { config } from "dotenv";
import { resolve } from "path";
import { resetPasswordEmail } from "../template/emailTemplate";
import { forgetPassword } from "../types/forgetReset";
import User from "../models/User";
config({ path: resolve("./src/.env") })

const mailServiceCredentials = {
    user: process.env.SERVICE_EMAIL,
    pass: process.env.SERVICE_PASSWORD
}

const transportForEmail = createTransport({
    host: "smtp.office365.com",
    port: 587,
    auth: mailServiceCredentials
})

export const forgetPasswordServiceUtil = async (data: forgetPassword) => {
    try {
        let messageToSend = "";
        let responseToSend = 200;

        const { emailOfUser } = data;

        const userToFind: any = await User.findOne({ where: { emailOfUser } })
        const userId = userToFind.userId;
        const nameOfUser = userToFind.nameOfUser;

        const customEmailTemplate = resetPasswordEmail(userId, nameOfUser);

        const mailOptions = {
            from: mailServiceCredentials.user,
            to: emailOfUser,
            subject: "Team Yogesh Gaur - Forget Password",
            html: customEmailTemplate
        }

        const mailSentResponse = await transportForEmail.sendMail(mailOptions)

        if (!mailSentResponse.envelope) {
            messageToSend = "Some Error Occurred !!!"
            responseToSend = 401;
            return { messageToSend, responseToSend }
        } else {
            messageToSend = "Reset Email Sent Successfully !!!";
            return { messageToSend, responseToSend }
        }

    } catch (error) {
        console.log("Utility Function Error : " + error)
    }
}