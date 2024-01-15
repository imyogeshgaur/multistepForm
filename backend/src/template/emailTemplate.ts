export const resetPasswordEmail = (userId: string, nameOfUser: string) => {
    return `
<html>
<head>
</head>
<body>
    Dear ${nameOfUser} we received a password Reset Request From you.<br><br>
    The Password Reset Link is : <br><br>
    http://localhost:5173/resetPassword/${userId}<br><br><br><br>
    Thanks and Regards
    <br>
    Team Yogesh Gaur
</body>
`
}