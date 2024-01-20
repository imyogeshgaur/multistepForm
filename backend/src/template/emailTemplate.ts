export const resetPasswordEmail = (userId: string, nameOfUser: string) => {
    return `
<html>
<head>
</head>
<body>
    Dear ${nameOfUser} we received a password Reset Request From you.<br><br>
    Click on Link Below to Reset Password  : <br><br>
    <a href="http://localhost:5173/resetPassword/${userId}">Link To Reset Password </a><br><br>
    Thanks and Regards
    <br>
    Team Yogesh Gaur
</body>
`
}