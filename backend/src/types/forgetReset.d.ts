export interface forgetPassword{
    emailOfUser:string;
}

export interface resetPassword{
    userId:string;
    newPassword:string;
}