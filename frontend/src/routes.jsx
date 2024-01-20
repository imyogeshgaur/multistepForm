import { lazy } from "react";

const FirstPage = lazy(() => import("./pages/signUpForm/FirstPage"))
const NextPage = lazy(() => import("./pages/signUpForm/NextPage"))
const LoginPage = lazy(() => import("./pages/loginForm/LoginPage"))
const ForgetPasswordPage = lazy(() => import("./pages/forgotForm/ForgetPage"))
const ResetPasswordPage = lazy(() => import("./pages/resetForm/ResetPage"))

const Routes = [
    { path: "/", element: <LoginPage /> },
    { path: "/Register", element: <FirstPage /> },
    { path: "/NextPage", element: <NextPage /> },
    { path: "/forgetPassword", element: <ForgetPasswordPage /> },
    { path: "/resetPassword/:userId",element:<ResetPasswordPage />},
]

export default Routes